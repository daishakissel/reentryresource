"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setSidebarExpanded(window.innerWidth >= 768);
  }, []);

  // Listen for custom event to open right sidebar (from map pin click)
  useEffect(() => {
    function handleOpenRight() { setRightSidebarExpanded(true); }
    window.addEventListener("open-right-sidebar", handleOpenRight);
    return () => window.removeEventListener("open-right-sidebar", handleOpenRight);
  }, []);

  const handleScroll = useCallback(() => {
    if (mainRef.current) {
      setShowScrollTop(mainRef.current.scrollTop > 300);
    }
  }, []);

  function scrollToTop() {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  const anyOpen = sidebarExpanded || rightSidebarExpanded;

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* Dark overlay — covers entire screen including header */}
      <div
        className={`fixed inset-0 z-[1000] bg-black transition-opacity duration-500 ${
          anyOpen ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => { setSidebarExpanded(false); setRightSidebarExpanded(false); }}
      />

      {/* Left Sidebar */}
      <Sidebar
        expanded={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
      />

      {/* Right Sidebar */}
      <RightSidebar
        expanded={rightSidebarExpanded}
        onClose={() => setRightSidebarExpanded(false)}
      />

      {/* Fixed header */}
      <header
        className="flex-shrink-0 z-50 bg-white dark:bg-ocean-deeper"
        onWheel={(e) => {
          if (mainRef.current) mainRef.current.scrollTop += e.deltaY;
        }}
      >
        <div className="flex items-center justify-between px-4 pt-6 pb-2">
          {/* Left: hamburger */}
          <button
            onClick={() => { setSidebarExpanded((v) => !v); setRightSidebarExpanded(false); }}
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

          {/* Right: user/shelter menu icon */}
          <button
            onClick={() => { setRightSidebarExpanded((v) => !v); setSidebarExpanded(false); }}
            className="p-2 text-brand-gray hover:text-brand-gold dark:text-gray-400 dark:hover:text-brand-gold"
            aria-label="Toggle user menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center px-4 pb-4">
          <SearchBar />
        </div>
      </header>

      {/* Scrollable main content */}
      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto dark:bg-ocean-deeper flex flex-col"
      >
        <div className="px-4 py-6 flex-1">
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
