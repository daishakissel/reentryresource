"use client";

import { useState, type ReactNode } from "react";

interface InfoTooltipProps {
  text: ReactNode;
}

export default function InfoTooltip({ text }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean-dark text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors flex-shrink-0"
        aria-label="More information"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }}
        >
          <div
            className="bg-white dark:bg-ocean-deeper rounded-xl shadow-lg max-w-sm w-full relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pr-4">{text}</div>
          </div>
        </div>
      )}
    </>
  );
}
