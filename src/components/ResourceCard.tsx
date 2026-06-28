"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Resource } from "@/types/database";

interface ResourceCardProps {
  resource: Resource;
  modeLabels?: string[];
}

export default function ResourceCard({ resource, modeLabels = [] }: ResourceCardProps) {
  const href = `/resource/${resource.slug || resource.id}`;
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descRef.current) {
      setIsClamped(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, [resource.description]);

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((v) => !v);
  }

  return (
    <div>
      <Link href={href}>
        <div className="bg-white dark:bg-ocean-light rounded-lg border border-gray-200 dark:border-ocean-light overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col" style={{ minHeight: "380px" }}>
          {/* Top: Title */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-ocean flex-shrink-0">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">{resource.title}</h3>
          </div>

          {/* Image: taller area, centered, no cropping */}
          {resource.featured_image ? (
            <div className="h-52 bg-gray-100 dark:bg-ocean flex items-center justify-center flex-shrink-0 p-2">
              <img src={resource.featured_image} alt={resource.title} className="max-w-full max-h-full object-contain" />
            </div>
          ) : (
            <div className="h-52 bg-gray-100 dark:bg-ocean flex items-center justify-center flex-shrink-0">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}

          {/* Bottom: Description + Topics */}
          <div className="px-4 py-3 flex-1 flex flex-col border-t border-gray-100 dark:border-ocean">
            {resource.description && (
              <div className="mb-2">
                <p ref={descRef} className={`text-xs text-gray-600 dark:text-gray-300 ${expanded ? "" : "line-clamp-3"}`}>
                  {resource.description}
                </p>
              </div>
            )}
            <div className="mt-auto flex items-end justify-between">
              {resource.categories?.name ? (
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-brand-gold-light text-brand-brown">
                    {resource.categories.name}
                  </span>
                </div>
              ) : (
                <div />
              )}
              {isClamped && (
                <button
                  onClick={handleToggle}
                  className={`w-7 h-7 flex items-center justify-center rounded-full border-2 transition-all flex-shrink-0 ml-2 ${
                    expanded
                      ? "bg-brand-gold border-brand-gold text-white hover:bg-brand-gold/80"
                      : "border-gray-300 dark:border-gray-500 text-gray-400 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold-light"
                  }`}
                  aria-label={expanded ? "Collapse description" : "Expand description"}
                >
                  <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
            {modeLabels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {modeLabels.map((label) => (
                  <span key={label} className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-ocean text-gray-600 dark:text-gray-400">
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
