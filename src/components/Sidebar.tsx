"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ELEMENTS } from "@/lib/constants";
import { useEffect, useRef } from "react";

interface SidebarProps {
  expanded: boolean;
  onClose: () => void;
}

const ELEMENT_ICONS: Record<string, React.ReactNode> = {
  all: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  ),
  health: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  housing: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
    </svg>
  ),
  admin: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  income: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "daily-essentials": (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  "my-team": (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};


export default function Sidebar({ expanded, onClose }: SidebarProps) {
  const pathname = usePathname();
  const touchStartX = useRef<number>(0);

  useEffect(() => { onClose(); }, [pathname]);

  function handleTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e: React.TouchEvent) { if (e.changedTouches[0].clientX - touchStartX.current > 60) onClose(); }

  return (
      <aside
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-0 right-0 bottom-0 z-[1001] bg-white dark:bg-ocean-deeper flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto w-64 ${
          expanded ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="py-4">
          <div className="flex justify-start px-3 mb-2">
            <button onClick={onClose} className="p-1 text-brand-gray dark:text-gray-400 hover:text-brand-gold" aria-label="Close menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-6">
            {(
              <h3 className="px-4 text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap">
                Resources
              </h3>
            )}
            <nav className="space-y-1 px-2">
              {ELEMENTS.map((cat) => {
                const isActive = cat.slug === "all" ? pathname === "/" : pathname === cat.href;
                return (
                  <Link
                    key={cat.slug}
                    href={cat.href}
                    onClick={onClose}
                    title={cat.label}
                    className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-brand-gold-light text-brand-brown"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light"
                    } `}
                  >
                    {ELEMENT_ICONS[cat.slug]}
                    {<span>{cat.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

        </div>

      </aside>
  );
}
