"use client";

import { useState } from "react";
import type { Resource } from "@/types/database";
import ResourceGrid from "./ResourceGrid";
import ResourceMap from "./ResourceMap";

interface ViewToggleProps {
  resources: Resource[];
  backPath?: string;
}

export default function ViewToggle({ resources, backPath }: ViewToggleProps) {
  const [view, setView] = useState<"map" | "online">("map");

  const inPersonResources = resources.filter((r) => r.latitude && r.longitude);
  const onlineResources = resources.filter((r) => !r.latitude || !r.longitude);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setView("map")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === "map"
              ? "bg-brand-gold text-white"
              : "bg-gray-100 dark:bg-ocean-light text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-ocean"
          }`}
        >
          Map View
        </button>
        <button
          onClick={() => setView("online")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === "online"
              ? "bg-brand-gold text-white"
              : "bg-gray-100 dark:bg-ocean-light text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-ocean"
          }`}
        >
          Online Resources
        </button>
      </div>

      {view === "map" ? (
        <div>
          <ResourceMap resources={inPersonResources} backPath={backPath} />
          <div className="mt-6">
            {inPersonResources.length > 0 ? (
              <ResourceGrid resources={inPersonResources} backPath={backPath} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No in-person resources found.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          {onlineResources.length > 0 ? (
            <ResourceGrid resources={onlineResources} backPath={backPath} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No online resources found.</p>
          )}
        </div>
      )}
    </div>
  );
}
