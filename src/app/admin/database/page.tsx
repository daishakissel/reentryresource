"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";

interface TopicRow {
  id: string;
  name: string;
  slug: string;
  resource_count: number;
  element_names: string[];
  element_ids_list: string[];
}

interface WhyCategory {
  id: string;
  name: string;
  slug: string;
}

const ALL_COLUMNS: { key: string; label: string; defaultVisible: boolean }[] = [
  { key: "name", label: "Category", defaultVisible: true },
  { key: "slug", label: "Slug", defaultVisible: false },
  { key: "element_names", label: "Elements", defaultVisible: true },
  { key: "resource_count", label: "Resources", defaultVisible: true },
];

export default function DatabasePage() {
  const { user, loading: authLoading, canAccessAdminPages } = useAuth();
  const router = useRouter();

  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [elementCategories, setWhyCategories] = useState<WhyCategory[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    () => new Set(ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key))
  );
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [showColumnPicker, setShowColumnPicker] = useState(false);

  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newWhyIds, setNewWhyIds] = useState<Set<string>>(new Set());
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

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
      setWhyCategories(data.elements);
    }
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (user && canAccessAdminPages) fetchData();
  }, [user, canAccessAdminPages, fetchData]);

  function getCellValue(t: TopicRow, key: string): string {
    if (key === "element_names") return t.element_names.join(", ");
    if (key === "resource_count") return String(t.resource_count);
    return (t as any)[key] ?? "—";
  }

  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      for (const [key, filter] of Object.entries(columnFilters)) {
        if (!filter.trim()) continue;
        const val = getCellValue(t, key);
        if (!val.toLowerCase().includes(filter.toLowerCase())) return false;
      }
      return true;
    });
  }, [topics, columnFilters]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);

    if (newWhyIds.size === 0) {
      setCreateError("Select at least one element.");
      return;
    }

    const headers = await getAuthHeaders();
    const res = await fetch("/api/admin/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ name: newName, slug: newSlug, element_ids: Array.from(newWhyIds) }),
    });

    if (res.ok) {
      setCreateSuccess(`Category "${newName}" created.`);
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
    setEditWhyIds(new Set(topic.element_ids_list));
    setEditError(null);
  }

  async function handleSaveEdit() {
    if (!editId) return;
    if (editWhyIds.size === 0) {
      setEditError("Select at least one element.");
      return;
    }

    const headers = await getAuthHeaders();
    const res = await fetch(`/api/admin/topics/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ name: editName, slug: editSlug, element_ids: Array.from(editWhyIds) }),
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
    if (!confirm(`Delete category "${name}"?`)) return;

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

  const activeColumns = ALL_COLUMNS.filter((c) => visibleColumns.has(c.key));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Database — Categories</h1>

      {/* Add new category */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">Add New Category</h2>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Elements <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {elementCategories.map((wc) => (
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
            Create Category
          </button>
        </form>
      </div>

      {/* Existing categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Existing Categories</h2>
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
                <div className="absolute right-0 top-full mt-1 z-40 bg-white dark:bg-ocean-dark border border-gray-200 dark:border-ocean-light rounded-lg shadow-lg p-3 w-48">
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
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {filteredTopics.length} of {topics.length} categories
        </p>
        {topics.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
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
                {filteredTopics.map((t) => (
                  <tr key={t.id} className="border-t border-gray-100 dark:border-ocean-light hover:bg-gray-50 dark:hover:bg-ocean-light">
                    {editId === t.id ? (
                      <>
                        {activeColumns.map((col) => {
                          if (col.key === "name") return (
                            <td key={col.key} className="px-4 py-3">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => {
                                  setEditName(e.target.value);
                                  setEditSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                                }}
                                className="w-full px-2 py-1 rounded border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold dark:bg-ocean-deeper dark:text-gray-300"
                              />
                            </td>
                          );
                          if (col.key === "slug") return (
                            <td key={col.key} className="px-4 py-3">
                              <input
                                type="text"
                                value={editSlug}
                                onChange={(e) => setEditSlug(e.target.value)}
                                className="w-full px-2 py-1 rounded border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold dark:bg-ocean-deeper dark:text-gray-300"
                              />
                            </td>
                          );
                          if (col.key === "element_names") return (
                            <td key={col.key} className="px-4 py-3">
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {elementCategories.map((wc) => (
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
                          );
                          return (
                            <td key={col.key} className="px-4 py-3 text-gray-300 dark:text-gray-300">
                              {getCellValue(t, col.key)}
                            </td>
                          );
                        })}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={handleSaveEdit} className="text-xs text-brand-gold hover:underline">Save</button>
                            <button onClick={() => setEditId(null)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        {activeColumns.map((col) => (
                          <td key={col.key} className="px-4 py-3 text-gray-300 dark:text-gray-300" title={getCellValue(t, col.key)}>
                            {getCellValue(t, col.key)}
                          </td>
                        ))}
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
                              title={t.resource_count > 0 ? `${t.resource_count} resource${t.resource_count > 1 ? "s" : ""} use this category — reassign them first` : "Delete"}
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
