"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setSidebarExpanded(window.innerWidth >= 768);
  }, []);

  const handleScroll = useCallback(() => {
    if (mainRef.current) {
      setShowScrollTop(mainRef.current.scrollTop > 300);
    }
  }, []);

  function scrollToTop() {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* Dark overlay — covers entire screen including header */}
      <div
        className={`fixed inset-0 z-[1000] bg-black transition-opacity duration-500 ${
          sidebarExpanded ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarExpanded(false)}
      />

      {/* Sidebar — covers entire screen height */}
      <Sidebar
        expanded={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
      />

      {/* Fixed header */}
      <header className="flex-shrink-0 z-50 bg-white dark:bg-ocean-deeper">
        <div className="flex items-center justify-between px-4 pt-6 pb-4 h-28">
          <button
            onClick={() => setSidebarExpanded((v) => !v)}
            className="p-2 text-brand-gray hover:text-brand-gold dark:text-gray-400 dark:hover:text-brand-gold"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1 flex justify-center">
            <Logo />
          </div>

          <div className="w-10" />
        </div>
      </header>

      {/* Scrollable main content */}
      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto dark:bg-ocean-deeper"
      >
        <div className="px-4 py-6">
          {children}
        </div>
        <Footer />
      </main>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-brand-gold text-white shadow-lg hover:bg-brand-gold/90 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
