"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface ResourceRow {
  id: string;
  title: string;
  topic: string | null;
  expiration_date: string | null;
  created_at: string;
}

export default function AdminResourcesPage() {
  const { user, loading: authLoading, isAuthor, canManageAllResources } = useAuth();
  const router = useRouter();
  const [resources, setResources] = useState<ResourceRow[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  const fetchResources = useCallback(async () => {
    let query = supabase
      .from("resources")
      .select("id, title, expiration_date, created_at, created_by, categories(name)")
      .order("created_at", { ascending: false });

    if (isAuthor && user) {
      query = query.eq("created_by", user.id);
    }

    const { data } = await query;

    setResources(
      (data ?? []).map((r: any) => ({
        id: r.id,
        title: r.title,
        topic: r.categories?.name ?? null,
        expiration_date: r.expiration_date ?? null,
        created_at: r.created_at,
      }))
    );
    setLoadingResources(false);
  }, []);

  useEffect(() => {
    if (user) fetchResources();
  }, [user, fetchResources]);

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
    if (!res.ok) {
      alert("Export failed");
      return;
    }
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

    const text = await file.text();
    const lines = text.split("\n");
    if (lines.length < 2) {
      setImportError("CSV file must have a header row and at least one data row.");
      setImporting(false);
      return;
    }

    // Parse CSV properly handling quoted fields with commas and newlines
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

    // Parse all data rows
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
      if (data.errors?.length > 0) {
        console.log("Import errors:", data.errors);
      }
    } else {
      setImportError(data.error || "Import failed");
    }

    setImporting(false);
    fetchResources();
    e.target.value = "";
  }

  if (authLoading) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

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
        </div>
      </div>

      {importError && <p className="text-sm text-red-600 mb-4">{importError}</p>}
      {importSuccess && <p className="text-sm text-green-600 mb-4">{importSuccess}</p>}

      {loadingResources ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : resources.length === 0 ? (
        <p className="text-gray-500">No resources yet.</p>
      ) : (
        <div className="border border-gray-200 dark:border-ocean-light rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-ocean-dark">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Topic</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Created</th>
                <th className="px-4 py-3 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r.id} className="border-t border-gray-100 dark:border-ocean-light hover:bg-gray-50 dark:hover:bg-ocean-light">
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{r.topic ?? "—"}</td>
                  <td className="px-4 py-3">
                    {(() => {
                      const expired = r.expiration_date && new Date(r.expiration_date) < new Date();
                      return (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${expired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                          {expired ? "Expired" : "Active"}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{new Date(r.created_at).toLocaleDateString()}</td>
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
