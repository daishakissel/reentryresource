"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

interface ShelterContextType {
  currentShelter: string | null;
  unlockedShelters: Set<string>;
  selectShelter: (slug: string | null) => void;
  unlockShelter: (slug: string) => void;
  isShelterUnlocked: (slug: string) => boolean;
}

const ShelterContext = createContext<ShelterContextType>({
  currentShelter: null,
  unlockedShelters: new Set(),
  selectShelter: () => {},
  unlockShelter: () => {},
  isShelterUnlocked: () => false,
});

export function ShelterProvider({ children }: { children: React.ReactNode }) {
  const [currentShelter, setCurrentShelter] = useState<string | null>(null);
  const [unlockedShelters, setUnlockedShelters] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("currentShelter");
    const unlocked = localStorage.getItem("unlockedShelters");
    if (stored && stored !== "null") setCurrentShelter(stored);
    if (unlocked) {
      try { setUnlockedShelters(new Set(JSON.parse(unlocked))); } catch {}
    }
    setLoaded(true);
  }, []);

  const selectShelter = useCallback((slug: string | null) => {
    const val = slug === "none" ? null : slug;
    setCurrentShelter(val);
    localStorage.setItem("currentShelter", val || "");
  }, []);

  const unlockShelter = useCallback((slug: string) => {
    setUnlockedShelters((prev) => {
      const next = new Set(prev).add(slug);
      localStorage.setItem("unlockedShelters", JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const isShelterUnlocked = useCallback(
    (slug: string) => unlockedShelters.has(slug),
    [unlockedShelters]
  );

  if (!loaded) return null;

  return (
    <ShelterContext.Provider value={{ currentShelter, unlockedShelters, selectShelter, unlockShelter, isShelterUnlocked }}>
      {children}
    </ShelterContext.Provider>
  );
}

export const useShelter = () => useContext(ShelterContext);
