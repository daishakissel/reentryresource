"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    setSidebarExpanded(window.innerWidth >= 768);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed header - full width, always on top */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-ocean-deeper">
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

          {/* Spacer to keep logo centered */}
          <div className="w-10" />
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-32" />

      {/* Middle section: sidebar + content */}
      <div className="flex flex-1">
        <Sidebar
          expanded={sidebarExpanded}
          onToggle={() => setSidebarExpanded((v) => !v)}
        />

        <main className="flex-1 min-w-0 px-4 py-6 dark:bg-ocean-deeper">
          {children}
        </main>
      </div>

      {/* Fixed footer - full width, always on bottom */}
      <Footer />
    </div>
  );
}
