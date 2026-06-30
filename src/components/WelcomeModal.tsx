"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "reentry-welcome-seen";

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(SEEN_KEY);
    if (!seen) setShow(true);
  }, []);

  function dismiss() {
    localStorage.setItem(SEEN_KEY, "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4"
      onClick={dismiss}
    >
      <div
        className="bg-white dark:bg-ocean-deeper rounded-xl shadow-lg max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Welcome to Reentry Resource</h2>

          <div className="space-y-4 mb-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-gold-light flex items-center justify-center mt-0.5">
                <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tap the <span className="font-medium text-gray-900 dark:text-white">resources icon</span> (top right) to browse resources by topic — like Health, Housing, or Income.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-gold-light flex items-center justify-center mt-0.5">
                <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tap the <span className="font-medium text-gray-900 dark:text-white">person icon</span> (top left) to set <span className="font-medium text-gray-900 dark:text-white">My Location</span> for nearby resources, or select your <span className="font-medium text-gray-900 dark:text-white">Shelter</span>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-gold-light flex items-center justify-center mt-0.5">
                <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                If you're staying at a shelter, selecting it may ask for a <span className="font-medium text-gray-900 dark:text-white">password</span> to unlock shelter-specific pages and resources.
              </p>
            </div>
          </div>

          <button
            onClick={dismiss}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
