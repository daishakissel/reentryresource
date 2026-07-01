"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const ALL_COLUMNS: { key: string; label: string; defaultVisible: boolean }[] = [
  { key: "title", label: "Title", defaultVisible: true },
  { key: "categories", label: "Categories", defaultVisible: true },
  { key: "organization_name", label: "Organization", defaultVisible: true },
  { key: "facility_name", label: "Facility", defaultVisible: false },
  { key: "description", label: "Description", defaultVisible: false },
  { key: "engage", label: "Engage", defaultVisible: false },
  { key: "status", label: "Status", defaultVisible: true },
  { key: "street_address", label: "Address", defaultVisible: false },
  { key: "city", label: "City", defaultVisible: false },
  { key: "state", label: "State", defaultVisible: false },
  { key: "zip", label: "ZIP", defaultVisible: false },
  { key: "region", label: "Region", defaultVisible: false },
  { key: "phone", label: "Phone", defaultVisible: false },
  { key: "email", label: "Email", defaultVisible: false },
  { key: "website", label: "Website", defaultVisible: false },
  { key: "source_url", label: "Source URL", defaultVisible: false },
  { key: "scraped_url", label: "Scraped From", defaultVisible: false },
  { key: "scrape_status", label: "Scrape Status", defaultVisible: false },
  { key: "expiration_date", label: "Expiration", defaultVisible: false },
  { key: "created_at", label: "Created", defaultVisible: true },
  { key: "created_by", label: "Created By", defaultVisible: false },
  { key: "updated_at", label: "Updated", defaultVisible: false },
];

export default function AdminResourcesPage() {
  const { user, loading: authLoading, isAuthor, canManageAllResources } = useAuth();
  const router = useRouter();
  const [resources, setResources] = useState<Record<string, any>[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [importRowErrors, setImportRowErrors] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    () => new Set(ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key))
  );
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [showColumnPicker, setShowColumnPicker] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  const fetchResources = useCallback(async () => {
    let query = supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (isAuthor && user) {
      query = query.eq("created_by", user.id);
    }

    const { data } = await query;
    const resourceIds = (data ?? []).map((r: any) => r.id);

    const [catJunctionRes, catRes] = await Promise.all([
      supabase.from("resources_categories").select("resource_id, category_id").in("resource_id", resourceIds),
      supabase.from("categories").select("id, name"),
    ]);
    const catLookup = Object.fromEntries((catRes.data ?? []).map((c: any) => [c.id, c.name]));
    const catMap: Record<string, string[]> = {};
    (catJunctionRes.data ?? []).forEach((row: any) => {
      if (!catMap[row.resource_id]) catMap[row.resource_id] = [];
      const name = catLookup[row.category_id];
      if (name) catMap[row.resource_id].push(name);
    });

    setResources(
      (data ?? []).map((r: any) => ({
        ...r,
        categories: catMap[r.id] ?? [],
        status: r.expiration_date && new Date(r.expiration_date) < new Date() ? "Expired" : "Active",
      }))
    );
    setLoadingResources(false);
  }, []);

  useEffect(() => {
    if (user) fetchResources();
  }, [user, fetchResources]);

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      for (const [key, filter] of Object.entries(columnFilters)) {
        if (!filter.trim()) continue;
        const val = key === "categories"
          ? (r.categories as string[]).join(", ")
          : String(r[key] ?? "");
        if (!val.toLowerCase().includes(filter.toLowerCase())) return false;
      }
      return true;
    });
  }, [resources, columnFilters]);

  function getCellValue(r: Record<string, any>, key: string): string {
    if (key === "categories") return (r.categories as string[]).join(", ") || "—";
    if (key === "status") return r.status;
    if (key === "created_at" || key === "updated_at") return r[key] ? new Date(r[key]).toLocaleDateString() : "—";
    if (key === "expiration_date") return r[key] ? new Date(r[key]).toLocaleDateString() : "—";
    return r[key] ?? "—";
  }

  async function getAuthHeaders(): Promise<Record<string, string>> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/resources/${id}`, { method: "DELETE", headers });
    if (res.ok) fetchResources();
    else alert("Failed to delete resource");
  }

  async function handleExport() {
    const headers = await getAuthHeaders();
    const res = await fetch("/api/admin/resources/export", { headers });
    if (!res.ok) { alert("Export failed"); return; }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resources-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportError(null);
    setImportSuccess(null);
    setImportRowErrors([]);

    const text = await file.text();
    const lines = text.split("\n");
    if (lines.length < 2) {
      setImportError("CSV file must have a header row and at least one data row.");
      setImporting(false);
      return;
    }

    function parseCSVLine(line: string): string[] {
      const result: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
          if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
          else if (ch === '"') { inQuotes = false; }
          else { current += ch; }
        } else {
          if (ch === '"') { inQuotes = true; }
          else if (ch === ',') { result.push(current); current = ""; }
          else { current += ch; }
        }
      }
      result.push(current);
      return result;
    }

    const headers = parseCSVLine(lines[0]).map((h) => h.trim());
    if (!headers.includes("title")) {
      setImportError("CSV must have a 'title' column.");
      setImporting(false);
      return;
    }

    const rows: Record<string, string>[] = [];
    let currentLine = "";
    let inQuotes = false;
    for (let i = 1; i < lines.length; i++) {
      currentLine += (currentLine ? "\n" : "") + lines[i];
      for (const ch of lines[i]) {
        if (ch === '"') inQuotes = !inQuotes;
      }
      if (!inQuotes) {
        if (currentLine.trim()) {
          const values = parseCSVLine(currentLine);
          const row: Record<string, string> = {};
          headers.forEach((h, idx) => { row[h] = values[idx] ?? ""; });
          if (row.title) rows.push(row);
        }
        currentLine = "";
      }
    }

    if (rows.length === 0) {
      setImportError("No valid data rows found.");
      setImporting(false);
      return;
    }

    const authHeaders = await getAuthHeaders();
    const res = await fetch("/api/admin/resources/import", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({ rows }),
    });

    const data = await res.json();
    if (res.ok) {
      let msg = `Imported ${data.imported} resource${data.imported !== 1 ? "s" : ""}.`;
      if (data.skipped > 0) msg += ` Skipped ${data.skipped} (no title).`;
      if (data.errors?.length > 0) msg += ` ${data.errors.length} error(s).`;
      setImportSuccess(msg);
      if (data.errors?.length > 0) setImportRowErrors(data.errors);
    } else {
      setImportError(data.error || "Import failed");
    }

    setImporting(false);
    fetchResources();
    e.target.value = "";
  }

  if (authLoading) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

  const activeColumns = ALL_COLUMNS.filter((c) => visibleColumns.has(c.key));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resources</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/add-resource"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors"
          >
            Add New
          </Link>
          {canManageAllResources && (
            <>
              <label className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean transition-colors cursor-pointer">
                {importing ? "Importing..." : "Import CSV"}
                <input type="file" accept=".csv" onChange={handleImport} className="hidden" disabled={importing} />
              </label>
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean transition-colors"
              >
                Export CSV
              </button>
            </>
          )}
          {/* Column picker */}
          <div className="relative">
            <button
              onClick={() => setShowColumnPicker((v) => !v)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              Columns
            </button>
            {showColumnPicker && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowColumnPicker(false)} />
                <div className="absolute right-0 top-full mt-1 z-40 bg-white dark:bg-ocean-dark border border-gray-200 dark:border-ocean-light rounded-lg shadow-lg p-3 w-56 max-h-80 overflow-y-auto">
                  {ALL_COLUMNS.map((col) => (
                    <label key={col.key} className="flex items-center gap-2 py-1 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-ocean-light px-1 rounded">
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(col.key)}
                        onChange={() => {
                          setVisibleColumns((prev) => {
                            const next = new Set(prev);
                            if (next.has(col.key)) next.delete(col.key);
                            else next.add(col.key);
                            return next;
                          });
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {importError && <p className="text-sm text-red-600 mb-4">{importError}</p>}
      {importSuccess && <p className="text-sm text-green-600 mb-4">{importSuccess}</p>}
      {importRowErrors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">Row errors:</p>
          <ul className="text-sm text-red-600 dark:text-red-300 list-disc list-inside space-y-0.5">
            {importRowErrors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {filteredResources.length} of {resources.length} resources
      </p>

      {loadingResources ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : resources.length === 0 ? (
        <p className="text-gray-500">No resources yet.</p>
      ) : (
        <div className="border border-gray-200 dark:border-ocean-light rounded-lg overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-ocean-dark">
              <tr>
                {activeColumns.map((col) => (
                  <th key={col.key} className="text-left px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex flex-col gap-1">
                      <span>{col.label}</span>
                      <input
                        type="text"
                        placeholder="Filter..."
                        value={columnFilters[col.key] ?? ""}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, [col.key]: e.target.value }))}
                        className="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-ocean-light bg-white dark:bg-ocean-deeper text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-2 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((r) => (
                <tr key={r.id} className="border-t border-gray-100 dark:border-ocean-light hover:bg-gray-50 dark:hover:bg-ocean-light">
                  {activeColumns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-300 dark:text-gray-300 max-w-xs truncate" title={getCellValue(r, col.key)}>
                      {col.key === "status" ? (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          r.status === "Expired" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}>
                          {r.status}
                        </span>
                      ) : col.key === "website" || col.key === "source_url" || col.key === "scraped_url" ? (
                        r[col.key] ? (
                          <a href={r[col.key]} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
                            {r[col.key].replace(/^https?:\/\/(www\.)?/, "").slice(0, 40)}
                          </a>
                        ) : "—"
                      ) : (
                        getCellValue(r, col.key)
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/edit-resource/${r.id}`}
                        title="Edit"
                        className="text-gray-400 hover:text-brand-gold transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(r.id, r.title)}
                        title="Delete"
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
