"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";
import ContentImageInsert from "@/components/ContentImageInsert";

interface FilterOption { id: string; name: string }
interface Filters { what_topics: FilterOption[]; where_location_types: FilterOption[]; when_times: FilterOption[]; how_formats: FilterOption[]; who_centerings: FilterOption[] }

const JUNCTION_LOAD: { key: string; table: string; fk: string }[] = [
  { key: "where_location_type_ids", table: "resources_where_location_types", fk: "where_location_type_id" },
  { key: "when_time_ids", table: "resources_when_times", fk: "when_time_id" },
  { key: "how_format_ids", table: "resources_how_formats", fk: "how_format_id" },
  { key: "who_centering_ids", table: "resources_who_centerings", fk: "who_centering_id" },
];

export default function EditResourcePage({ params }: { params: { id: string } }) {
  const { user, loading: authLoading, isAuthor } = useAuth();
  const router = useRouter();
  const [filters, setFilters] = useState<Filters | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [whatTopicId, setWhatTopicId] = useState("");

  const [selected, setSelected] = useState<Record<string, Set<string>>>(() => {
    const init: Record<string, Set<string>> = {};
    JUNCTION_LOAD.forEach((j) => { init[j.key] = new Set(); });
    return init;
  });

  useEffect(() => { if (!authLoading && !user) router.replace("/login"); }, [user, authLoading, router]);

  const loadData = useCallback(async () => {
    const [filtersRes, resourceRes] = await Promise.all([
      fetch("/api/filters"),
      supabase.from("resources").select("*").eq("id", params.id).single(),
    ]);
    if (filtersRes.ok) setFilters(await filtersRes.json());

    const r = resourceRes.data;
    if (r && isAuthor && r.created_by !== user?.id) {
      router.replace("/admin/resources");
      return;
    }
    if (r) {
      setTitle(r.title); setSlug(r.slug ?? ""); setDescription(r.description ?? ""); setContent(r.content ?? "");
      setFeaturedImage(r.featured_image ?? ""); setStreetAddress(r.street_address ?? "");
      setCity(r.city ?? ""); setState(r.state ?? ""); setZip(r.zip ?? "");
      setRegion(r.region ?? ""); setCountry(r.country ?? "");
      setLatitude(r.latitude?.toString() ?? ""); setLongitude(r.longitude?.toString() ?? "");
      setPhone(r.phone ?? ""); setEmail(r.email ?? ""); setWebsite(r.website ?? "");
      setWhatTopicId(r.what_topic_id ?? "");

      const newSelected: Record<string, Set<string>> = {};
      await Promise.all(JUNCTION_LOAD.map(async (j) => {
        const { data: links } = await supabase.from(j.table).select(j.fk).eq("resource_id", params.id);
        newSelected[j.key] = new Set((links ?? []).map((l: Record<string, string>) => l[j.fk]));
      }));
      setSelected(newSelected);
    }
    setLoadingData(false);
  }, [params.id]);

  useEffect(() => { if (user) loadData(); }, [user, loadData]);

  function toggleSelection(group: string, id: string) {
    setSelected((prev) => { const next = new Set(prev[group]); if (next.has(id)) next.delete(id); else next.add(id); return { ...prev, [group]: next }; });
  }

  async function handleGeocode() {
    const addr = [streetAddress, city, state, zip, country].filter(Boolean).join(", ");
    if (!addr) return;
    setGeocoding(true);
    const res = await fetch(`/api/geocode?address=${encodeURIComponent(addr)}`);
    if (res.ok) { const data = await res.json(); setLatitude(data.latitude.toString()); setLongitude(data.longitude.toString()); }
    setGeocoding(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setSubmitting(true);
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    const body: Record<string, unknown> = {
      title, slug, description, content, featured_image: featuredImage,
      street_address: streetAddress, city, state, zip, region, country,
      latitude, longitude, phone, email, website, what_topic_id: whatTopicId || null,
    };
    for (const [key, ids] of Object.entries(selected)) { body[key] = Array.from(ids); }

    const res = await fetch(`/api/admin/resources/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    });
    setSubmitting(false);
    if (!res.ok) { const d = await res.json(); setError(d.error || "Failed to update"); } else { setSuccess(true); setTimeout(() => setSuccess(false), 3000); }
  }

  if (authLoading || loadingData) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

  const checkboxGroups = [
    { label: "Where", key: "where_location_type_ids", filterKey: "where_location_types" },
    { label: "When", key: "when_time_ids", filterKey: "when_times" },
    { label: "How", key: "how_format_ids", filterKey: "how_formats" },
    { label: "Who", key: "who_centering_ids", filterKey: "who_centerings" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Resource</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title <span className="text-red-500">*</span></label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                <ContentImageInsert bucket="resources" folder="content" onInsert={(tag) => setContent((prev) => prev + "\n" + tag + "\n")} />
              </div>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent font-mono text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What (Topic)</label>
              <select value={whatTopicId} onChange={(e) => setWhatTopicId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent">
                <option value="">Select a topic</option>
                {(filters?.what_topics ?? []).map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Featured Image</label>
              <ImageUpload bucket="resources" folder="featured" onUploaded={(url) => setFeaturedImage(url)} currentUrl={featuredImage} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label><input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" placeholder="https://..." /></div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Location</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label><input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label><input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label><input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP</label><input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label><input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label><input type="text" value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" placeholder="County or larger region" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Latitude</label><input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Longitude</label><input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" /></div>
            </div>
            <button type="button" onClick={handleGeocode} disabled={geocoding} className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-brand-gray hover:bg-brand-gray/90 transition-colors disabled:opacity-50">{geocoding ? "Looking up..." : "Lookup Coordinates"}</button>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Classifications</h2>
          <div className="space-y-6">
            {checkboxGroups.map((group) => {
              const options = (filters as any)?.[group.filterKey] ?? [];
              if (options.length === 0) return null;
              return (
                <div key={group.key}>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{group.label}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {options.map((opt: FilterOption) => (
                      <label key={opt.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <input type="checkbox" checked={selected[group.key]?.has(opt.id) ?? false} onChange={() => toggleSelection(group.key, opt.id)} className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold" />
                        {opt.name}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">Resource updated successfully.</p>}

        <div className="flex gap-4 pb-8">
          <button type="submit" disabled={submitting} className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors disabled:opacity-50">{submitting ? "Saving..." : "Save Changes"}</button>
          <button type="button" onClick={() => router.push("/admin/resources")} className="px-6 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
