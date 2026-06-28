"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useShelter } from "@/context/ShelterContext";
import { useMyLocation, RADIUS_OPTIONS } from "@/context/MyLocationContext";
import { useState, useEffect, useCallback, useRef } from "react";

interface RightSidebarProps {
  expanded: boolean;
  onClose: () => void;
}

interface ShelterPageItem {
  id: string;
  title: string;
  slug: string;
  parent_id: string | null;
}

function ShelterPageTree({
  pages, parentId, depth, shelterSlug, pathname, onClose,
}: {
  pages: ShelterPageItem[]; parentId: string | null; depth: number;
  shelterSlug: string; pathname: string; onClose: () => void;
}) {
  const children = pages.filter((p) => p.parent_id === parentId);
  if (children.length === 0) return null;
  return (
    <>
      {children.map((page) => {
        const pageHref = `/shelter/${shelterSlug}/${page.slug}`;
        const isActive = pathname === pageHref;
        const hasChildren = pages.some((p) => p.parent_id === page.id);
        return (
          <div key={page.id}>
            <Link
              href={pageHref}
              onClick={onClose}
              className={`block py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-brand-gold-light text-brand-brown" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light"
              }`}
              style={{ paddingLeft: `${12 + depth * 16}px`, paddingRight: "12px" }}
            >
              {page.title}
            </Link>
            {hasChildren && <ShelterPageTree pages={pages} parentId={page.id} onClose={onClose} depth={depth + 1} shelterSlug={shelterSlug} pathname={pathname} />}
          </div>
        );
      })}
    </>
  );
}

const ADMIN_ITEMS = [
  {
    label: "Resources",
    href: "/admin/resources",
    adminOnly: false,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "Database",
    href: "/admin/database",
    adminOnly: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    label: "Shelters",
    href: "/admin/shelters",
    adminOnly: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "Users",
    href: "/admin/users",
    adminOnly: true,
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
      </svg>
    ),
  },
];

export default function RightSidebar({ expanded, onClose }: RightSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, role, canAccessAdminPages } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { currentShelter, selectShelter, isShelterUnlocked, unlockShelter } = useShelter();
  const { myLocation, setMyLocation, clearMyLocation, hasLocation, radiusMiles, setRadiusMiles } = useMyLocation();
  const isLoggedIn = !!user;
  const touchStartX = useRef<number>(0);
  const [locationAddress, setLocationAddress] = useState("");
  const [suggestions, setSuggestions] = useState<{ display: string; lat: number; lng: number }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { onClose(); }, [pathname]);

  useEffect(() => { setLocationAddress(myLocation.address); }, [myLocation.address]);

  function handleAddressInput(value: string) {
    setLocationAddress(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 3) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5&lang=en&lat=45.5&lon=-122.6&osm_tag=place&osm_tag=highway&osm_tag=building`
        );
        if (res.ok) {
          const data = await res.json();
          const results = (data.features ?? []).map((f: any) => {
            const p = f.properties;
            const parts = [p.housenumber, p.street, p.city, p.state, p.postcode, p.country].filter(Boolean);
            return {
              display: parts.length > 0 ? parts.join(", ") : p.name || "Unknown",
              lat: f.geometry.coordinates[1],
              lng: f.geometry.coordinates[0],
            };
          });
          setSuggestions(results);
          setShowSuggestions(results.length > 0);
        }
      } catch {}
    }, 300);
  }

  function selectSuggestion(s: { display: string; lat: number; lng: number }) {
    setMyLocation({ address: s.display, latitude: s.lat, longitude: s.lng });
    setLocationAddress(s.display);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) onClose();
  }

  const [shelters, setShelters] = useState<{ id: string; name: string; short_name?: string; slug: string; street_address?: string; city?: string; state?: string; zip?: string; latitude?: number; longitude?: number }[]>([]);
  const [shelterPages, setShelterPages] = useState<ShelterPageItem[]>([]);
  const [loadingShelterPages, setLoadingShelterPages] = useState(false);
  const [shelterPassword, setShelterPassword] = useState("");
  const [shelterAuthError, setShelterAuthError] = useState<string | null>(null);

  const fetchShelters = useCallback(async () => {
    const { supabase } = await import("@/lib/supabase");
    const { data } = await supabase.from("shelters").select("id, name, short_name, slug, street_address, city, state, zip, latitude, longitude").order("name");
    setShelters(data ?? []);
  }, []);

  useEffect(() => { fetchShelters(); }, [fetchShelters]);

  const fetchShelterPages = useCallback(async () => {
    if (!currentShelter) { setShelterPages([]); return; }
    setLoadingShelterPages(true);
    const res = await fetch(`/api/shelters/${currentShelter}/pages`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setShelterPages(data.pages ?? []);
    }
    setLoadingShelterPages(false);
  }, [currentShelter]);

  useEffect(() => {
    if (currentShelter && isShelterUnlocked(currentShelter)) fetchShelterPages();
    else setShelterPages([]);
  }, [currentShelter, isShelterUnlocked, fetchShelterPages]);

  async function handleShelterAuth() {
    if (!currentShelter) return;
    setShelterAuthError(null);
    const res = await fetch(`/api/shelters/${currentShelter}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: shelterPassword }),
    });
    if (res.ok) {
      unlockShelter(currentShelter);
      setShelterPassword("");
      fetchShelterPages();
    } else {
      const data = await res.json();
      setShelterAuthError(data.error || "Incorrect password");
    }
  }

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  return (
    <aside
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed top-0 left-0 bottom-0 z-[1001] bg-white dark:bg-ocean-deeper flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto w-64 ${
        expanded ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="py-4">
        {/* Close button - top right */}
        <div className="flex justify-end px-3 mb-2">
          <button onClick={onClose} className="p-1 text-brand-gray dark:text-gray-400 hover:text-brand-gold" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* My Location Section */}
        <div className="mb-6">
          <h3 className="px-4 text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap">
            My Location
          </h3>
          <div className="px-2 space-y-2">
            <div className="relative">
              <input
                type="text"
                value={locationAddress}
                onChange={(e) => handleAddressInput(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search for an address..."
                className="w-full px-2 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              {showSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-ocean-dark border border-gray-200 dark:border-ocean-light rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onMouseDown={() => selectSuggestion(s)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light border-b border-gray-50 dark:border-ocean-light last:border-b-0"
                    >
                      {s.display}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {hasLocation && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Lat: {myLocation.latitude?.toFixed(5)} &nbsp; Lng: {myLocation.longitude?.toFixed(5)}
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Radius:</label>
                  <select
                    value={radiusMiles}
                    onChange={(e) => setRadiusMiles(parseInt(e.target.value) as any)}
                    className="flex-1 px-2 py-1 rounded-md border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  >
                    {RADIUS_OPTIONS.map((r) => (
                      <option key={r} value={r}>{r} Miles</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => { clearMyLocation(); setLocationAddress(""); }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Clear location
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Shelter Section */}
        <div className="mb-6">
          <h3 className="px-4 text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap">
            Shelter
          </h3>
          <div className="px-2">
            <select
              value={currentShelter ?? "none"}
              onChange={(e) => {
                selectShelter(e.target.value);
                // Auto-fill My Location from shelter address if not already set
                if (!hasLocation && e.target.value !== "none") {
                  const shelter = shelters.find((s) => s.slug === e.target.value);
                  if (shelter?.latitude && shelter?.longitude) {
                    const addr = [shelter.street_address, shelter.city, shelter.state, shelter.zip].filter(Boolean).join(", ");
                    setMyLocation({ address: addr || shelter.name, latitude: shelter.latitude, longitude: shelter.longitude });
                  }
                }
              }}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
              <option value="none">None</option>
              {shelters.map((s) => (
                <option key={s.slug} value={s.slug}>{s.short_name || s.name}</option>
              ))}
            </select>
            {currentShelter && !isShelterUnlocked(currentShelter) && (
              <div className="mt-2 space-y-2">
                <input
                  type="password"
                  value={shelterPassword}
                  onChange={(e) => setShelterPassword(e.target.value)}
                  placeholder="Shelter password"
                  className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  onKeyDown={(e) => e.key === "Enter" && handleShelterAuth()}
                />
                {shelterAuthError && <p className="text-xs text-red-500">{shelterAuthError}</p>}
                <button
                  onClick={handleShelterAuth}
                  className="w-full px-3 py-1.5 rounded-md text-xs font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors"
                >
                  Unlock
                </button>
              </div>
            )}
            {currentShelter && isShelterUnlocked(currentShelter) && (
              <nav className="mt-2 space-y-0.5">
                {loadingShelterPages ? (
                  <p className="px-2 text-sm text-gray-400 italic">Loading shelter pages...</p>
                ) : shelterPages.length > 0 ? (
                  <ShelterPageTree pages={shelterPages} parentId={null} depth={0} shelterSlug={currentShelter} pathname={pathname} onClose={onClose} />
                ) : (
                  <p className="px-2 text-sm text-gray-400 italic">No pages found</p>
                )}
              </nav>
            )}
          </div>
        </div>

        {/* User Section */}
        <div>
          <h3 className="px-4 text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap">
            {!isLoggedIn ? "Guest" : role === "admin" ? "Admin" : role === "editor" ? "Editor" : role === "author" ? "Author" : "User"}
          </h3>
          {isLoggedIn ? (
            <nav className="space-y-1 px-2">
              <button
                onClick={toggleTheme}
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light whitespace-nowrap transition-colors"
              >
                {theme === "light" ? (
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </button>
              {ADMIN_ITEMS.map((item) => {
                if (item.adminOnly && !canAccessAdminPages) return null;
                return (
                  <Link key={item.label} href={item.href} onClick={onClose} title={item.label} className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light whitespace-nowrap">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button onClick={handleLogout} title="Logout" className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 whitespace-nowrap">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
              <div className="px-2 py-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Logged in as:</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email ?? "Guest"}</p>
              </div>
            </nav>
          ) : (
            <nav className="space-y-1 px-2">
              <button onClick={toggleTheme} title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"} className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light whitespace-nowrap transition-colors">
                {theme === "light" ? (
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </button>
              <Link href="/login" onClick={onClose} className="block w-full px-3 py-2 rounded-md text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors text-center">
                Login
              </Link>
            </nav>
          )}
        </div>
      </div>
    </aside>
  );
}
