"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { Resource } from "@/types/database";
import { useMyLocation } from "@/context/MyLocationContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function createCountIcon(count: number) {
  return new L.DivIcon({
    html: `<div style="background:#C8A951;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${count}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "",
  });
}

const myLocationIcon = new L.DivIcon({
  html: '<div style="background:#22C55E;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 0 8px rgba(0,0,0,0.4);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  className: "",
});

function FitBounds({ resources }: { resources: Resource[] }) {
  const map = useMap();
  const { hasLocation } = useMyLocation();
  useEffect(() => {
    if (hasLocation) return;
    if (resources.length === 0) return;
    const bounds = L.latLngBounds(
      resources.map((r) => [r.latitude!, r.longitude!] as [number, number])
    );
    map.fitBounds(bounds.pad(0.3));
  }, [resources, map, hasLocation]);
  return null;
}

function MapInteractionToggle({ enabled }: { enabled: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (enabled) {
      map.dragging.enable();
      map.touchZoom.enable();
    } else {
      map.dragging.disable();
      map.touchZoom.disable();
    }
  }, [enabled, map]);
  return null;
}

function FitToMyLocation() {
  const map = useMap();
  const { myLocation, hasLocation, radiusMiles } = useMyLocation();
  useEffect(() => {
    if (!hasLocation || !myLocation.latitude || !myLocation.longitude) return;
    const radiusMeters = radiusMiles * 1609.34;
    const center = L.latLng(myLocation.latitude, myLocation.longitude);
    map.fitBounds(center.toBounds(radiusMeters * 2));
  }, [map, myLocation.latitude, myLocation.longitude, hasLocation, radiusMiles]);
  return null;
}

function ShiftScrollZoom() {
  const map = useMap();
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) { if (e.key === "Shift") map.scrollWheelZoom.enable(); }
    function onKeyUp(e: KeyboardEvent) { if (e.key === "Shift") map.scrollWheelZoom.disable(); }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("keyup", onKeyUp); };
  }, [map]);
  return null;
}

function MapContextMenu() {
  const { setMyLocation } = useMyLocation();
  const [menuPos, setMenuPos] = useState<{ x: number; y: number; lat: number; lng: number } | null>(null);

  useMapEvents({
    contextmenu(e) {
      const containerPoint = e.containerPoint;
      setMenuPos({ x: containerPoint.x, y: containerPoint.y, lat: e.latlng.lat, lng: e.latlng.lng });
    },
    click() {
      setMenuPos(null);
    },
  });

  async function handleSetLocation() {
    if (!menuPos) return;
    const { lat, lng } = menuPos;
    setMenuPos(null);

    let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { "User-Agent": "ReentryResource/1.0" } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.display_name) address = data.display_name;
      }
    } catch {}

    setMyLocation({ address, latitude: lat, longitude: lng });
    window.dispatchEvent(new Event("open-right-sidebar"));
  }

  if (!menuPos) return null;

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{ position: "absolute", left: menuPos.x, top: menuPos.y, zIndex: 1000 }}
      className="bg-white dark:bg-ocean-dark rounded-lg shadow-lg border border-gray-200 dark:border-ocean-light py-1 min-w-[180px]"
    >
      <button
        onMouseDown={handleSetLocation}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light flex items-center gap-2"
      >
        <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        Set as My Location
      </button>
    </div>
  );
}

interface ResourceMapInnerProps {
  resources: Resource[];
  height: string;
}

interface CategoryInfo {
  name: string;
  imageUrl: string;
}

interface LocationGroup {
  key: string;
  lat: number;
  lng: number;
  resources: Resource[];
}

function groupByLocation(resources: Resource[]): LocationGroup[] {
  const groups = new Map<string, Resource[]>();
  for (const r of resources) {
    const key = `${r.latitude},${r.longitude}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  }
  return [...groups.entries()].map(([key, resources]) => ({
    key,
    lat: resources[0].latitude!,
    lng: resources[0].longitude!,
    resources,
  }));
}

function CategoryIcons({ categories }: { categories: CategoryInfo[] }) {
  if (categories.length === 0) return null;
  return (
    <div className="flex gap-1 mt-1.5 flex-wrap">
      {categories.slice(0, 4).map((c) => (
        <img key={c.name} src={c.imageUrl} alt={c.name} className="h-8 w-8 object-contain" title={c.name} />
      ))}
    </div>
  );
}

function SingleResourcePopup({ resource, categories }: { resource: Resource; categories: CategoryInfo[] }) {
  const href = `/resource/${(resource as any).slug || resource.id}`;
  const locationName = resource.facility_name || resource.organization_name;
  const address = [resource.street_address, resource.city, resource.state, resource.zip].filter(Boolean).join(", ");

  return (
    <div className="w-52">
      {locationName && (
        <p className="font-bold text-sm text-gray-900 leading-tight">{locationName}</p>
      )}
      {address && (
        <p className="text-xs text-gray-500 mt-0.5">{address}</p>
      )}
      <Link href={href} className="block no-underline mt-1.5">
        <p className="text-sm text-brand-gold hover:underline leading-tight font-medium">{resource.title}</p>
      </Link>
      <CategoryIcons categories={categories} />
    </div>
  );
}

function MultiResourcePopup({ group, categoryMap }: { group: LocationGroup; categoryMap: Record<string, CategoryInfo[]> }) {
  const first = group.resources[0];
  const locationName = first.facility_name || first.organization_name;
  const address = [first.street_address, first.city, first.state, first.zip].filter(Boolean).join(", ");

  return (
    <div className="w-56 max-h-72 overflow-y-auto">
      {locationName && (
        <p className="font-bold text-sm text-gray-900 leading-tight">{locationName}</p>
      )}
      {address && (
        <p className="text-xs text-gray-500 mt-0.5">{address}</p>
      )}
      <p className="text-xs font-medium text-gray-400 mt-2 mb-1.5">
        {group.resources.length} resources at this location
      </p>
      {group.resources.map((resource) => {
        const href = `/resource/${(resource as any).slug || resource.id}`;
        const cats = categoryMap[resource.id] ?? [];
        return (
          <Link
            key={resource.id}
            href={href}
            className="block no-underline border-t border-gray-100 py-2 hover:bg-gray-50 px-1 rounded"
          >
            <p className="text-sm font-medium text-brand-gold leading-tight hover:underline">
              {resource.title}
            </p>
            {resource.description && (
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{resource.description}</p>
            )}
            {cats.length > 0 && (
              <div className="flex gap-1 mt-1 flex-wrap">
                {cats.slice(0, 4).map((c) => (
                  <img key={c.name} src={c.imageUrl} alt={c.name} className="h-6 w-6 object-contain" title={c.name} />
                ))}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function ResourceMapInner({ resources, height }: ResourceMapInnerProps) {
  const mappable = resources.filter((r) => r.latitude && r.longitude);
  const { myLocation, hasLocation, radiusMiles } = useMyLocation();
  const [mapInteractive, setMapInteractive] = useState(false);
  const [categoryMap, setCategoryMap] = useState<Record<string, CategoryInfo[]>>({});

  const fetchCategories = useCallback(async () => {
    if (mappable.length === 0) return;
    const resourceIds = mappable.map((r) => r.id);
    const [junctionRes, catRes] = await Promise.all([
      supabase.from("resources_categories").select("resource_id, category_id").in("resource_id", resourceIds),
      supabase.from("categories").select("id, name, default_featured_image"),
    ]);
    const catLookup: Record<string, CategoryInfo> = {};
    (catRes.data ?? []).forEach((c: any) => {
      catLookup[c.id] = { name: c.name, imageUrl: c.default_featured_image ?? "" };
    });
    const map: Record<string, CategoryInfo[]> = {};
    (junctionRes.data ?? []).forEach((row: any) => {
      if (!map[row.resource_id]) map[row.resource_id] = [];
      const cat = catLookup[row.category_id];
      if (cat) map[row.resource_id].push(cat);
    });
    setCategoryMap(map);
  }, [mappable.length]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const center: [number, number] = hasLocation && myLocation.latitude && myLocation.longitude
    ? [myLocation.latitude, myLocation.longitude]
    : mappable.length > 0
      ? [
          mappable.reduce((s, r) => s + r.latitude!, 0) / mappable.length,
          mappable.reduce((s, r) => s + r.longitude!, 0) / mappable.length,
        ]
      : [45.5152, -122.6784];

  const radiusMeters = radiusMiles * 1609.34;
  const locationGroups = groupByLocation(mappable);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-ocean-light relative" style={{ height }}>
      {!mapInteractive && (
        <div
          onClick={() => setMapInteractive(true)}
          className="absolute inset-0 z-[500] flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          <span className="bg-white dark:bg-ocean-dark px-4 py-2 rounded-lg shadow text-sm text-gray-700 dark:text-gray-300 font-medium">
            Tap to interact with map
          </span>
        </div>
      )}
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        dragging={mapInteractive}
        touchZoom={mapInteractive}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapInteractionToggle enabled={mapInteractive} />
        <ShiftScrollZoom />
        <MapContextMenu />
        {hasLocation ? <FitToMyLocation /> : mappable.length > 1 && <FitBounds resources={mappable} />}

        {/* My Location pin + radius circle */}
        {hasLocation && myLocation.latitude && myLocation.longitude && (
          <>
            <Circle
              center={[myLocation.latitude, myLocation.longitude]}
              radius={radiusMeters}
              pathOptions={{ color: "#22C55E", fillColor: "#22C55E", fillOpacity: 0.08, weight: 2 }}
            />
            <Marker
              position={[myLocation.latitude, myLocation.longitude]}
              icon={myLocationIcon}
              eventHandlers={{
                click: () => window.dispatchEvent(new Event("open-right-sidebar")),
              }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold" style={{ color: "#22C55E" }}>My Location</p>
                <p className="text-xs text-gray-600 mt-1">{myLocation.address}</p>
                <p className="text-xs text-gray-400 mt-1">{radiusMiles} mile radius</p>
              </div>
            </Popup>
          </Marker>
          </>
        )}

        {/* Resource markers — grouped by location */}
        {locationGroups.map((group) => {
          if (group.resources.length === 1) {
            const resource = group.resources[0];
            return (
              <Marker key={group.key} position={[group.lat, group.lng]} icon={defaultIcon}>
                <Popup>
                  <SingleResourcePopup resource={resource} categories={categoryMap[resource.id] ?? []} />
                </Popup>
              </Marker>
            );
          }

          return (
            <Marker key={group.key} position={[group.lat, group.lng]} icon={createCountIcon(group.resources.length)}>
              <Popup>
                <MultiResourcePopup group={group} categoryMap={categoryMap} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
