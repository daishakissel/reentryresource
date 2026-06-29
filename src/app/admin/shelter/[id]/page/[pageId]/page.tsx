"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ContentImageInsert from "@/components/ContentImageInsert";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditShelterPage({ params }: { params: { id: string; pageId: string } }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [parentId, setParentId] = useState("");
  const [siblingPages, setSiblingPages] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase
        .from("shelter_pages")
        .select("title, slug, content, sort_order, parent_id")
        .eq("id", params.pageId)
        .single(),
      supabase
        .from("shelter_pages")
        .select("id, title")
        .eq("shelter_id", params.id)
        .neq("id", params.pageId)
        .order("title"),
    ]).then(([pageRes, siblingsRes]) => {
      if (pageRes.data) {
        setTitle(pageRes.data.title);
        setSlug(pageRes.data.slug);
        setContent(pageRes.data.content);
        setSortOrder(pageRes.data.sort_order);
        setParentId(pageRes.data.parent_id ?? "");
      }
      setSiblingPages(siblingsRes.data ?? []);
      setLoading(false);
    });
  }, [user, params.pageId, params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token;

    const res = await fetch(`/api/admin/shelters/${params.id}/pages/${params.pageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ title, slug, content, sort_order: sortOrder, parent_id: parentId || null }),
    });

    setSubmitting(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
  }

  if (authLoading || loading) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

  return (
    <div className="max-w-3xl">
      <Link href={`/admin/shelter/${params.id}/pages`} className="text-sm text-brand-gold hover:underline mb-4 inline-block">&larr; Back to pages</Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Page</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Page</label>
            <select value={parentId} onChange={(e) => setParentId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent">
              <option value="">None (top-level)</option>
              {siblingPages.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
            <ContentImageInsert bucket="shelters" folder="pages" onInsert={(tag) => setContent((prev) => prev + "\n" + tag + "\n")} />
          </div>
          <RichTextEditor value={content} onChange={setContent} minHeight="200px" />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">Page saved successfully.</p>}

        <div className="flex gap-4">
          <button type="submit" disabled={submitting} className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors disabled:opacity-50">
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={() => router.push(`/admin/shelter/${params.id}/pages`)} className="px-6 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
