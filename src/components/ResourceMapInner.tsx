"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Resource } from "@/types/database";
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

function FitBounds({ resources }: { resources: Resource[] }) {
  const map = useMap();

  useEffect(() => {
    if (resources.length === 0) return;
    const bounds = L.latLngBounds(
      resources.map((r) => [r.latitude!, r.longitude!] as [number, number])
    );
    map.fitBounds(bounds.pad(0.3));
  }, [resources, map]);

  return null;
}

function ShiftScrollZoom() {
  const map = useMap();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Shift") map.scrollWheelZoom.enable();
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "Shift") map.scrollWheelZoom.disable();
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [map]);

  return null;
}

interface ResourceMapInnerProps {
  resources: Resource[];
  backPath?: string;
  height: string;
}

export default function ResourceMapInner({ resources, backPath, height }: ResourceMapInnerProps) {
  const mappable = resources.filter((r) => r.latitude && r.longitude);

  const center: [number, number] = mappable.length > 0
    ? [
        mappable.reduce((s, r) => s + r.latitude!, 0) / mappable.length,
        mappable.reduce((s, r) => s + r.longitude!, 0) / mappable.length,
      ]
    : [45.5152, -122.6784];

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-ocean-light" style={{ height }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ShiftScrollZoom />
        {mappable.length > 1 && <FitBounds resources={mappable} />}
        {mappable.map((resource) => {
          const resourceSlug = (resource as any).slug || resource.id;
          const href = backPath
            ? `/resource/${resourceSlug}?from=${encodeURIComponent(backPath)}`
            : `/resource/${resourceSlug}`;

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
