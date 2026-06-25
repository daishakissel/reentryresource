"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface TopicRow {
  id: string;
  name: string;
  slug: string;
  resource_count: number;
  why_names: string[];
  why_ids: string[];
}

interface WhyCategory {
  id: string;
  name: string;
  slug: string;
}

export default function DatabasePage() {
  const { user, loading: authLoading, canAccessAdminPages } = useAuth();
  const router = useRouter();

  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [whyCategories, setWhyCategories] = useState<WhyCategory[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // New topic form
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newWhyIds, setNewWhyIds] = useState<Set<string>>(new Set());
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  // Edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editWhyIds, setEditWhyIds] = useState<Set<string>>(new Set());
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
    if (!authLoading && user && !canAccessAdminPages) router.replace("/");
  }, [user, authLoading, canAccessAdminPages, router]);

  async function getAuthHeaders(): Promise<Record<string, string>> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  const fetchData = useCallback(async () => {
    const headers = await getAuthHeaders();
    const res = await fetch("/api/admin/topics", { headers });
    if (res.ok) {
      const data = await res.json();
      setTopics(data.topics);
      setWhyCategories(data.why_categories);
    }
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (user && canAccessAdminPages) fetchData();
  }, [user, canAccessAdminPages, fetchData]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);

    if (newWhyIds.size === 0) {
      setCreateError("Select at least one WHY category.");
      return;
    }

    const headers = await getAuthHeaders();
    const res = await fetch("/api/admin/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ name: newName, slug: newSlug, why_category_ids: Array.from(newWhyIds) }),
    });

    if (res.ok) {
      setCreateSuccess(`Topic "${newName}" created.`);
      setNewName("");
      setNewSlug("");
      setNewWhyIds(new Set());
      fetchData();
    } else {
      const data = await res.json();
      setCreateError(data.error);
    }
  }

  function startEdit(topic: TopicRow) {
    setEditId(topic.id);
    setEditName(topic.name);
    setEditSlug(topic.slug);
    setEditWhyIds(new Set(topic.why_ids));
    setEditError(null);
  }

  async function handleSaveEdit() {
    if (!editId) return;
    if (editWhyIds.size === 0) {
      setEditError("Select at least one WHY category.");
      return;
    }

    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/topics/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ name: editName, slug: editSlug, why_category_ids: Array.from(editWhyIds) }),
    });

    if (res.ok) {
      setEditId(null);
      fetchData();
    } else {
      const data = await res.json();
      setEditError(data.error);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete topic "${name}"?`)) return;

    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/topics/${id}`, { method: "DELETE", headers });

    if (res.ok) {
      fetchData();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }

  if (authLoading || loadingData) return <p className="text-gray-500">Loading...</p>;
  if (!user || !canAccessAdminPages) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Database — WHAT Topics</h1>

      {/* Add new topic */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Add New Topic</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                }}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                placeholder="e.g. Yoga"
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">WHY Categories <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {whyCategories.map((wc) => (
                <label key={wc.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={newWhyIds.has(wc.id)}
                    onChange={() => {
                      const next = new Set(newWhyIds);
                      if (next.has(wc.id)) next.delete(wc.id); else next.add(wc.id);
                      setNewWhyIds(next);
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                  />
                  {wc.name}
                </label>
              ))}
            </div>
          </div>
          {createError && <p className="text-sm text-red-600">{createError}</p>}
          {createSuccess && <p className="text-sm text-green-600">{createSuccess}</p>}
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors">
            Create Topic
          </button>
        </form>
      </div>

      {/* Existing topics */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Existing Topics ({topics.length})</h2>
        {topics.length === 0 ? (
          <p className="text-gray-500">No topics found.</p>
        ) : (
          <div className="border border-gray-200 dark:border-ocean-light rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-ocean-dark">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Topic</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">WHY Categories</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Resources</th>
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {topics.map((t) => (
                  <tr key={t.id} className="border-t border-gray-100 dark:border-ocean-light hover:bg-gray-50 dark:hover:bg-ocean-light">
                    {editId === t.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => {
                              setEditName(e.target.value);
                              setEditSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                            }}
                            className="w-full px-2 py-1 rounded border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {whyCategories.map((wc) => (
                              <label key={wc.id} className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={editWhyIds.has(wc.id)}
                                  onChange={() => {
                                    const next = new Set(editWhyIds);
                                    if (next.has(wc.id)) next.delete(wc.id); else next.add(wc.id);
                                    setEditWhyIds(next);
                                  }}
                                  className="h-3 w-3 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                                />
                                {wc.name}
                              </label>
                            ))}
                          </div>
                          {editError && <p className="text-xs text-red-600 mt-1">{editError}</p>}
                        </td>
                        <td className="px-4 py-3 text-gray-500">{t.resource_count}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={handleSaveEdit} className="text-xs text-brand-gold hover:underline">Save</button>
                            <button onClick={() => setEditId(null)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 font-medium">{t.name}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t.why_names.join(", ")}</td>
                        <td className="px-4 py-3 text-gray-500">{t.resource_count}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEdit(t)}
                              title="Edit"
                              className="text-gray-400 hover:text-brand-gold transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(t.id, t.name)}
                              disabled={t.resource_count > 0}
                              title={t.resource_count > 0 ? `${t.resource_count} resource${t.resource_count > 1 ? "s" : ""} use this topic — reassign them first` : "Delete"}
                              className={`transition-colors ${
                                t.resource_count > 0
                                  ? "text-gray-200 dark:text-gray-600 cursor-not-allowed"
                                  : "text-gray-400 hover:text-red-600"
                              }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </>
                    )}
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
