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
  created_at: string;
}

export default function AdminResourcesPage() {
  const { user, loading: authLoading } = useAuth();
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
    const { data } = await supabase
      .from("resources")
      .select("id, title, created_at, what_topics(name)")
      .order("created_at", { ascending: false });

    setResources(
      (data ?? []).map((r: any) => ({
        id: r.id,
        title: r.title,
        topic: r.what_topics?.name ?? null,
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
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (!data || data.length === 0) {
      alert("No resources to export.");
      return;
    }

    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(","),
      ...data.map((row: any) =>
        headers.map((h) => {
          const val = row[h] ?? "";
          const str = String(val).replace(/"/g, '""');
          return `"${str}"`;
        }).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
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
    const lines = text.split("\n").filter((l) => l.trim());
    if (lines.length < 2) {
      setImportError("CSV file must have a header row and at least one data row.");
      setImporting(false);
      return;
    }

    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    const titleIdx = headers.indexOf("title");
    if (titleIdx === -1) {
      setImportError("CSV must have a 'title' column.");
      setImporting(false);
      return;
    }

    let imported = 0;
    const authHeaders = await getAuthHeaders();

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].match(/("(?:[^"]|"")*"|[^,]*)/g)?.map((v) =>
        v.trim().replace(/^"|"$/g, "").replace(/""/g, '"')
      );
      if (!values) continue;

      const row: Record<string, string> = {};
      headers.forEach((h, idx) => { row[h] = values[idx] ?? ""; });

      if (!row.title) continue;

      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({
          title: row.title,
          description: row.description || null,
          content: row.content || null,
          street_address: row.street_address || null,
          city: row.city || null,
          state: row.state || null,
          zip: row.zip || null,
          region: row.region || null,
          country: row.country || null,
          phone: row.phone || null,
          email: row.email || null,
          website: row.website || null,
          featured_image: row.featured_image || null,
          latitude: row.latitude || null,
          longitude: row.longitude || null,
        }),
      });

      if (res.ok) imported++;
    }

    setImportSuccess(`Imported ${imported} resource${imported !== 1 ? "s" : ""}.`);
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
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Created</th>
                <th className="px-4 py-3 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r.id} className="border-t border-gray-100 dark:border-ocean-light hover:bg-gray-50 dark:hover:bg-ocean-light">
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{r.topic ?? "—"}</td>
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
