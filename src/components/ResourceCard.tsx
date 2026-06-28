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
  const [showPhonePopup, setShowPhonePopup] = useState(false);
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
    <div className="relative">
      {/* Contact icon buttons - top right, stacked vertically */}
      {(resource.website || resource.email || resource.phone) && (
        <div className="absolute top-14 right-2 z-10 flex flex-col gap-1.5">
          {resource.website && (
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center hover:bg-brand-gold/80 transition-colors shadow-md"
              aria-label="Visit website"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
            </a>
          )}
          {resource.email && (
            <a
              href={`mailto:${resource.email}`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center hover:bg-brand-gold/80 transition-colors shadow-md"
              aria-label="Send email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
          {resource.phone && (
            <>
              <a
                href={`tel:${resource.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center hover:bg-brand-gold/80 transition-colors shadow-md md:hidden"
                aria-label="Call phone"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowPhonePopup(true); }}
                className="hidden md:flex w-8 h-8 rounded-full bg-brand-gold text-white items-center justify-center hover:bg-brand-gold/80 transition-colors shadow-md"
                aria-label="Show phone number"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}

      {/* Phone popup (desktop) */}
      {showPhonePopup && resource.phone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowPhonePopup(false)}>
          <div className="bg-white dark:bg-ocean-deeper rounded-xl shadow-lg p-6 mx-4 max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowPhonePopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <svg className="w-10 h-10 text-brand-gold mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Call this resource</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{resource.phone}</p>
            </div>
          </div>
        </div>
      )}

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
