"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { WHY_CATEGORIES } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useShelter } from "@/context/ShelterContext";
import { useState, useEffect, useCallback } from "react";

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

const WHY_ICONS: Record<string, React.ReactNode> = {
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

const ADMIN_ITEMS = [
  {
    label: "Resources",
    href: "/admin/resources",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "Shelters",
    href: "/admin/shelters",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
      </svg>
    ),
  },
];

interface ShelterPageItem {
  id: string;
  title: string;
  slug: string;
  parent_id: string | null;
}

function ShelterPageTree({
  pages,
  parentId,
  depth,
  shelterSlug,
  pathname,
}: {
  pages: ShelterPageItem[];
  parentId: string | null;
  depth: number;
  shelterSlug: string;
  pathname: string;
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
              className={`block py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-gold-light text-brand-gold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light"
              }`}
              style={{ paddingLeft: `${12 + depth * 16}px`, paddingRight: "12px" }}
            >
              {page.title}
            </Link>
            {hasChildren && (
              <ShelterPageTree
                pages={pages}
                parentId={page.id}
                depth={depth + 1}
                shelterSlug={shelterSlug}
                pathname={pathname}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default function Sidebar({ expanded, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { currentShelter, selectShelter, isShelterUnlocked, unlockShelter } = useShelter();
  const isLoggedIn = !!user;

  const [shelters, setShelters] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [shelterPages, setShelterPages] = useState<{ id: string; title: string; slug: string; parent_id: string | null }[]>([]);
  const [shelterPassword, setShelterPassword] = useState("");
  const [shelterAuthError, setShelterAuthError] = useState<string | null>(null);

  const fetchShelters = useCallback(async () => {
    const res = await fetch("/api/filters");
    if (!res.ok) return;
    // Shelters aren't in filters, fetch separately
    const client = await import("@/lib/supabase").then((m) => m.supabase);
    const { data } = await client.from("shelters").select("id, name, slug").order("name");
    setShelters(data ?? []);
  }, []);

  useEffect(() => {
    fetchShelters();
  }, [fetchShelters]);

  const fetchShelterPages = useCallback(async () => {
    if (!currentShelter) { setShelterPages([]); return; }
    const res = await fetch(`/api/shelters/${currentShelter}/pages`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      console.log("Shelter pages loaded:", data.pages);
      setShelterPages(data.pages ?? []);
    }
  }, [currentShelter]);

  useEffect(() => {
    if (currentShelter && isShelterUnlocked(currentShelter)) {
      fetchShelterPages();
    } else {
      setShelterPages([]);
    }
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
        className={`bg-white dark:bg-ocean-deeper flex flex-col transition-all duration-300 ease-in-out overflow-hidden overflow-y-auto ${
          expanded ? "w-64" : "w-16"
        }`}
      >
        <div className="py-4">
          <div className="mb-6">
            {expanded && (
              <h3 className="px-4 text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap">
                Resources
              </h3>
            )}
            <nav className="space-y-1 px-2">
              {WHY_CATEGORIES.map((cat) => {
                const isActive = cat.slug === "all" ? pathname === "/" : pathname === cat.href;
                return (
                  <Link
                    key={cat.slug}
                    href={cat.href}
                    title={cat.label}
                    className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-brand-gold-light text-brand-gold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light"
                    } ${expanded ? "" : "justify-center"}`}
                  >
                    {WHY_ICONS[cat.slug]}
                    {expanded && <span>{cat.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mb-6">
            {expanded && (
              <h3 className="px-4 text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap">
                Shelter
              </h3>
            )}
            {expanded ? (
              <div className="px-2">
                <select
                  value={currentShelter ?? "none"}
                  onChange={(e) => selectShelter(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
                  <option value="none">None</option>
                  {shelters.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
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
                    {shelterPages.length > 0 ? (
                      <ShelterPageTree
                        pages={shelterPages}
                        parentId={null}
                        depth={0}
                        shelterSlug={currentShelter}
                        pathname={pathname}
                      />
                    ) : (
                      <p className="px-2 text-sm text-gray-400 italic">No pages yet</p>
                    )}
                  </nav>
                )}
              </div>
            ) : (
              <div className="flex justify-center px-2">
                <div className="p-2 text-brand-gray dark:text-gray-400" title="Shelter">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div>
            {expanded && (
              <h3 className="px-4 text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap">
                Admin
              </h3>
            )}
            {isLoggedIn ? (
              <nav className="space-y-1 px-2">
                {ADMIN_ITEMS.map((item) =>
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      title={item.label}
                      className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light whitespace-nowrap ${
                        expanded ? "" : "justify-center"
                      }`}
                    >
                      {item.icon}
                      {expanded && <span>{item.label}</span>}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      title={item.label}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light whitespace-nowrap ${
                        expanded ? "" : "justify-center"
                      }`}
                    >
                      {item.icon}
                      {expanded && <span>{item.label}</span>}
                    </button>
                  )
                )}
                {expanded && user && (
                  <div className="px-2 py-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Logged in User:</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 whitespace-nowrap ${
                    expanded ? "" : "justify-center"
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {expanded && <span>Logout</span>}
                </button>
              </nav>
            ) : (
              <div className="px-2">
                {expanded ? (
                  <Link
                    href="/login"
                    className="block w-full px-3 py-2 rounded-md text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors text-center"
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    title="Login"
                    className="w-full flex justify-center p-2 text-brand-gold hover:text-brand-gold/80"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 px-2">
            <button
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ocean-light whitespace-nowrap transition-colors ${
                expanded ? "" : "justify-center"
              }`}
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
              {expanded && <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
            </button>
          </div>
        </div>

      </aside>
  );
}
