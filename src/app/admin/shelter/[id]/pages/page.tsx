"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ContentImageInsert from "@/components/ContentImageInsert";

interface ShelterPage {
  id: string;
  title: string;
  slug: string;
  sort_order: number;
  parent_id: string | null;
}

export default function ShelterPagesAdmin({ params }: { params: { id: string } }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [pages, setPages] = useState<ShelterPage[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [shelterName, setShelterName] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newSort, setNewSort] = useState(0);
  const [newParentId, setNewParentId] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  async function getAuthHeaders() {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  const fetchPages = useCallback(async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/shelters/${params.id}/pages`, { headers });
    if (res.ok) {
      const data = await res.json();
      setPages(data.pages);
    }
    setLoadingPages(false);
  }, [params.id]);

  useEffect(() => {
    if (user) {
      fetchPages();
      supabase.from("shelters").select("name").eq("id", params.id).single().then(({ data }) => {
        if (data) setShelterName(data.name);
      });
    }
  }, [user, fetchPages, params.id]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);

    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/shelters/${params.id}/pages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ title: newTitle, slug: newSlug, content: newContent, sort_order: newSort, parent_id: newParentId || null }),
    });

    if (res.ok) {
      setCreateSuccess(`Page "${newTitle}" created.`);
      setNewTitle("");
      setNewSlug("");
      setNewContent("");
      setNewSort(0);
      setNewParentId("");
      fetchPages();
    } else {
      const data = await res.json();
      setCreateError(data.error);
    }
  }

  async function handleDelete(pageId: string, title: string) {
    if (!confirm(`Delete page "${title}"?`)) return;
    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/shelters/${params.id}/pages/${pageId}`, { method: "DELETE", headers });
    if (res.ok) fetchPages();
    else alert("Failed to delete page");
  }

  if (authLoading) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <Link href="/admin/shelters" className="text-sm text-brand-gold hover:underline mb-4 inline-block">&larr; Back to shelters</Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{shelterName} — Pages</h1>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Add Page</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => { setNewTitle(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")); }}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Page</label>
              <select
                value={newParentId}
                onChange={(e) => setNewParentId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              >
                <option value="">None (top-level)</option>
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
              <input
                type="number"
                value={newSort}
                onChange={(e) => setNewSort(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
              <ContentImageInsert bucket="shelters" folder="pages" onInsert={(tag) => setNewContent((prev) => prev + "\n" + tag + "\n")} />
            </div>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              placeholder="Page content (HTML or plain text)..."
            />
          </div>
          {createError && <p className="text-sm text-red-600">{createError}</p>}
          {createSuccess && <p className="text-sm text-green-600">{createSuccess}</p>}
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors">
            Create Page
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Existing Pages</h2>
        {loadingPages ? (
          <p className="text-gray-500">Loading...</p>
        ) : pages.length === 0 ? (
          <p className="text-gray-500">No pages yet.</p>
        ) : (
          <div className="border border-gray-200 dark:border-ocean-light rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-ocean-dark">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Slug</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Parent</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Order</th>
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100 dark:border-ocean-light hover:bg-gray-50 dark:hover:bg-ocean-light">
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.slug}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.parent_id ? pages.find((x) => x.id === p.parent_id)?.title ?? "—" : "—"}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/shelter/${params.id}/page/${p.id}`}
                          title="Edit"
                          className="text-gray-400 hover:text-brand-gold transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
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
    </div>
  );
}
