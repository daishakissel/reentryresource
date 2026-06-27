"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { Resource } from "@/types/database";
import { useMyLocation } from "@/context/MyLocationContext";
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
    if (hasLocation) return; // Let FitToMyLocation handle it
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

    // Reverse geocode to get address
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

export default function ResourceMapInner({ resources, height }: ResourceMapInnerProps) {
  const mappable = resources.filter((r) => r.latitude && r.longitude);
  const { myLocation, hasLocation, radiusMiles } = useMyLocation();
  const [mapInteractive, setMapInteractive] = useState(false);

  const center: [number, number] = hasLocation && myLocation.latitude && myLocation.longitude
    ? [myLocation.latitude, myLocation.longitude]
    : mappable.length > 0
      ? [
          mappable.reduce((s, r) => s + r.latitude!, 0) / mappable.length,
          mappable.reduce((s, r) => s + r.longitude!, 0) / mappable.length,
        ]
      : [45.5152, -122.6784];

  const radiusMeters = radiusMiles * 1609.34;

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

        {mappable.map((resource) => {
          const resourceSlug = (resource as any).slug || resource.id;
          const href = `/resource/${resourceSlug}`;

          return (
            <Marker
              key={resource.id}
              position={[resource.latitude!, resource.longitude!]}
              icon={defaultIcon}
            >
              <Popup>
                <Link href={href} className="block no-underline">
                  <div className="w-48">
                    {resource.featured_image && (
                      <img
                        src={resource.featured_image}
                        alt={resource.title}
                        className="w-full h-24 object-cover rounded-t"
                      />
                    )}
                    <p className="text-sm font-semibold text-gray-900 mt-1 px-1 pb-1 leading-tight">
                      {resource.title}
                    </p>
                  </div>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
