"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

interface MyLocation {
  address: string;
  latitude: number | null;
  longitude: number | null;
}

export const RADIUS_OPTIONS = [5, 10, 15, 20, 25, 50] as const;
export type RadiusMiles = (typeof RADIUS_OPTIONS)[number];

interface MyLocationContextType {
  myLocation: MyLocation;
  setMyLocation: (loc: MyLocation) => void;
  clearMyLocation: () => void;
  hasLocation: boolean;
  radiusMiles: RadiusMiles;
  setRadiusMiles: (r: RadiusMiles) => void;
}

const EMPTY: MyLocation = { address: "", latitude: null, longitude: null };
const STORAGE_KEY = "myLocation";
const RADIUS_KEY = "myLocationRadius";

const MyLocationContext = createContext<MyLocationContextType>({
  myLocation: EMPTY,
  setMyLocation: () => {},
  clearMyLocation: () => {},
  hasLocation: false,
  radiusMiles: 5,
  setRadiusMiles: () => {},
});

export function MyLocationProvider({ children }: { children: React.ReactNode }) {
  const [myLocation, setMyLocationState] = useState<MyLocation>(EMPTY);
  const [radiusMiles, setRadiusMilesState] = useState<RadiusMiles>(5);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setMyLocationState(JSON.parse(stored));
      const storedRadius = localStorage.getItem(RADIUS_KEY);
      if (storedRadius) setRadiusMilesState(parseInt(storedRadius) as RadiusMiles);
    } catch {}
    setLoaded(true);
  }, []);

  const setMyLocation = useCallback((loc: MyLocation) => {
    setMyLocationState(loc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  }, []);

  const clearMyLocation = useCallback(() => {
    setMyLocationState(EMPTY);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setRadiusMiles = useCallback((r: RadiusMiles) => {
    setRadiusMilesState(r);
    localStorage.setItem(RADIUS_KEY, String(r));
  }, []);

  const hasLocation = !!(myLocation.latitude && myLocation.longitude);

  if (!loaded) return null;

  return (
    <MyLocationContext.Provider value={{ myLocation, setMyLocation, clearMyLocation, hasLocation, radiusMiles, setRadiusMiles }}>
      {children}
    </MyLocationContext.Provider>
  );
}

export const useMyLocation = () => useContext(MyLocationContext);
