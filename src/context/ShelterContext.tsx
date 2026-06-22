"use client";

import { createContext, useContext, useState, useCallback } from "react";

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

  const selectShelter = useCallback((slug: string | null) => {
    setCurrentShelter(slug === "none" ? null : slug);
  }, []);

  const unlockShelter = useCallback((slug: string) => {
    setUnlockedShelters((prev) => new Set(prev).add(slug));
  }, []);

  const isShelterUnlocked = useCallback(
    (slug: string) => unlockedShelters.has(slug),
    [unlockedShelters]
  );

  return (
    <ShelterContext.Provider value={{ currentShelter, unlockedShelters, selectShelter, unlockShelter, isShelterUnlocked }}>
      {children}
    </ShelterContext.Provider>
  );
}

export const useShelter = () => useContext(ShelterContext);
