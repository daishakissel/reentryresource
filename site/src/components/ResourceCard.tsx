"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Resource } from "@/types/database";

interface CategoryImage {
  name: string;
  imageUrl: string;
}

interface ResourceCardProps {
  resource: Resource;
  modeLabels?: string[];
  categoryImages?: CategoryImage[];
  formatLabels?: string[];
  centeringLabels?: string[];
}

export default function ResourceCard({ resource, modeLabels = [], categoryImages = [], formatLabels = [], centeringLabels = [] }: ResourceCardProps) {
  const href = `/resource/${resource.slug || resource.id}`;
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [engageOpen, setEngageOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
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
        <div className="absolute top-[72px] right-2 z-10 flex flex-col gap-1.5">
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
        <div
          className={`bg-white dark:bg-ocean-light rounded-lg border border-gray-200 dark:border-ocean-light hover:shadow-md transition-shadow cursor-pointer flex flex-col ${expanded ? "" : "overflow-hidden"}`}
          style={{ height: expanded ? "auto" : "460px", minHeight: "460px" }}
        >
          {/* Top: Title + organization */}
          <div className="px-4 py-2 border-b border-gray-100 dark:border-ocean flex-shrink-0 h-[64px] flex flex-col justify-center">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight">{resource.title}</h3>
            {resource.organization_name && (
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">{resource.organization_name}</p>
            )}
          </div>

          {/* Image area — flips to show all labels */}
          <div className="h-60 flex-shrink-0 relative" style={{ perspective: "1000px" }}>
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* Front: image / category icons */}
              <div className="absolute inset-0 bg-gray-100 dark:bg-ocean overflow-hidden" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                {resource.featured_image ? (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <img src={resource.featured_image} alt={resource.title} className="max-w-full max-h-full object-contain" />
                  </div>
                ) : categoryImages.length > 0 ? (
                  <CategoryIconGrid categories={categoryImages} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}
              </div>
              {/* Back: all labels */}
              <div
                className="absolute inset-0 bg-gray-100 dark:bg-ocean overflow-y-auto px-3 py-2 text-left"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                {modeLabels.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {modeLabels.map((label) => (
                      <span key={label} className="text-[10px] px-2 py-0.5 rounded bg-brand-gold-light text-brand-brown">
                        {label === "By Appointment Only" ? "By Appointment" : label}
                      </span>
                    ))}
                  </div>
                )}
                <LabelGroup title="Categories" items={categoryImages.map((c) => c.name)} />
                <LabelGroup title="Formats" items={formatLabels} />
                <LabelGroup title="Centerings" items={centeringLabels} />
              </div>
            </div>
            {/* Flip button (bottom-left, mirrors the top-right contact buttons) */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFlipped((v) => !v); }}
              className="absolute bottom-2 left-2 z-20 w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center hover:bg-brand-gold/80 transition-colors shadow-md"
              aria-label={flipped ? "Show image" : "Show all labels"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Bottom: Description */}
          <div className="px-4 py-3 flex-1 flex flex-col border-t border-gray-100 dark:border-ocean">
            {resource.description && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1">Description</p>
                <p ref={descRef} className={`text-xs text-gray-600 dark:text-gray-300 ${expanded ? "" : "line-clamp-3"}`}>
                  {resource.description}
                </p>
              </div>
            )}
            <div className="mt-auto flex items-end justify-end">
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
          </div>

          {/* Engage footer */}
          {resource.engage && (
            <div className="bg-gray-100 dark:bg-ocean flex-shrink-0 border-t border-gray-200 dark:border-ocean-light">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEngageOpen((v) => !v); }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-gold transition-colors"
              >
                <span>Engage</span>
                <svg className={`w-4 h-4 transition-transform ${engageOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {engageOpen && (
                <div className="px-4 pb-3" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{resource.engage}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

function LabelGroup({ title, items }: { title: string; items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <div className="flex flex-wrap gap-1">
        {items.map((it) => (
          <span key={it} className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-ocean-light text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-ocean">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function CategoryIconGrid({ categories }: { categories: CategoryImage[] }) {
  const count = categories.length;

  if (count === 1) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <img src={categories[0].imageUrl} alt={categories[0].name} className="w-full h-full object-contain" />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="w-full h-full flex items-center p-3">
        <div className="flex-1 flex items-center justify-center h-full">
          <img src={categories[0].imageUrl} alt={categories[0].name} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="w-px h-3/4 bg-gray-300 dark:bg-gray-600" />
        <div className="flex-1 flex items-center justify-center h-full">
          <img src={categories[1].imageUrl} alt={categories[1].name} className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="w-full h-full flex flex-col p-3 min-h-0">
        <div className="flex-1 flex items-center min-h-0">
          <div className="flex-1 flex items-center justify-center h-full min-h-0 min-w-0">
            <img src={categories[0].imageUrl} alt={categories[0].name} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="w-px h-3/4 bg-gray-300 dark:bg-gray-600" />
          <div className="flex-1 flex items-center justify-center h-full min-h-0 min-w-0">
            <img src={categories[1].imageUrl} alt={categories[1].name} className="max-w-full max-h-full object-contain" />
          </div>
        </div>
        <div className="h-px w-3/4 mx-auto bg-gray-300 dark:bg-gray-600" />
        <div className="flex-1 flex items-center justify-center min-h-0">
          <img src={categories[2].imageUrl} alt={categories[2].name} className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    );
  }

  // 4 categories: 2x2 grid
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 p-3">
      {categories.slice(0, 4).map((cat, i) => (
        <div key={cat.name} className={`flex items-center justify-center ${
          i % 2 === 0 ? "border-r border-gray-300 dark:border-gray-600" : ""
        } ${i < 2 ? "border-b border-gray-300 dark:border-gray-600" : ""}`}>
          <img src={cat.imageUrl} alt={cat.name} className="max-w-full max-h-full object-contain p-1" />
        </div>
      ))}
    </div>
  );
}
