"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";
import ContentImageInsert from "@/components/ContentImageInsert";

interface FilterOption { id: string; name: string }

interface Filters {
  categories: FilterOption[];
  modes: FilterOption[];
  formats: FilterOption[];
  centerings: FilterOption[];
}

export default function AddResourcePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [filters, setFilters] = useState<Filters | null>(null);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [engage, setEngage] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
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

  const [selected, setSelected] = useState<Record<string, Set<string>>>({
    mode_ids: new Set(),
    format_ids: new Set(),
    centering_ids: new Set(),
  });

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  const fetchFilters = useCallback(async () => {
    const res = await fetch("/api/filters");
    if (res.ok) setFilters(await res.json());
    setLoadingFilters(false);
  }, []);

  useEffect(() => { fetchFilters(); }, [fetchFilters]);

  async function handleGeocode() {
    const addr = [streetAddress, city, state, zip, country].filter(Boolean).join(", ");
    if (!addr) return;
    setGeocoding(true);
    const res = await fetch(`/api/geocode?address=${encodeURIComponent(addr)}`);
    if (res.ok) {
      const data = await res.json();
      setLatitude(data.latitude.toString());
      setLongitude(data.longitude.toString());
    }
    setGeocoding(false);
  }

  function toggleSelection(group: string, id: string) {
    setSelected((prev) => {
      const next = new Set(prev[group]);
      if (next.has(id)) next.delete(id); else next.add(id);
      return { ...prev, [group]: next };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const body: Record<string, unknown> = {
      title, slug, description, engage, content, featured_image: featuredImage,
      expiration_date: expirationDate || null,
      street_address: streetAddress, city, state, zip, region, country,
      latitude, longitude, phone, email, website,
      category_id: whatTopicId || null,
    };
    for (const [key, ids] of Object.entries(selected)) {
      body[key] = Array.from(ids);
    }

    const res = await fetch("/api/admin/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    });

    setSubmitting(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error || "Failed to create resource");
    } else {
      setSuccess(true);
    }
  }

  if (loading || loadingFilters) return <p className="text-gray-500">Loading...</p>;
  if (!user) return null;

  if (success) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resource Created</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The resource has been added successfully.</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => { setSuccess(false); setTitle(""); setSlug(""); setDescription(""); setEngage(""); setContent(""); setExpirationDate(""); setFeaturedImage(""); setStreetAddress(""); setCity(""); setState(""); setZip(""); setRegion(""); setCountry(""); setLatitude(""); setLongitude(""); setPhone(""); setEmail(""); setWebsite(""); setWhatTopicId(""); setSelected({ mode_ids: new Set(), format_ids: new Set(), centering_ids: new Set() }); }} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors">Add Another</button>
          <button onClick={() => router.push("/")} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">Go to Resources</button>
        </div>
      </div>
    );
  }

  const checkboxGroups = [
    { label: "Mode", key: "mode_ids", filterKey: "modes" },
    { label: "Format", key: "format_ids", filterKey: "formats" },
    { label: "Centering", key: "centering_ids", filterKey: "centerings" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Resource</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title <span className="text-red-500">*</span></label>
              <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")); }} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" placeholder="auto-generated-from-title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" placeholder="Brief summary shown on resource cards" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">How to Engage</label>
              <textarea value={engage} onChange={(e) => setEngage(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" placeholder="Steps to access or engage with this resource..." />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                <ContentImageInsert bucket="resources" folder="content" onInsert={(tag) => setContent((prev) => prev + "\n" + tag + "\n")} />
              </div>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent font-mono text-sm" placeholder="Detailed content..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category <span className="text-red-500">*</span></label>
              <select value={whatTopicId} onChange={(e) => setWhatTopicId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent">
                <option value="">Select a topic</option>
                {(filters?.categories ?? []).map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiration Date</label>
              <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
              <p className="text-xs text-gray-400 mt-1">Leave empty for no expiration</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Featured Image</label>
              <ImageUpload bucket="resources" folder="featured" onUploaded={(url) => setFeaturedImage(url)} currentUrl={featuredImage} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
              <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" placeholder="https://..." />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Location</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
              <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP</label>
                <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
              <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" placeholder="County or larger region" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Latitude</label>
                <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Longitude</label>
                <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent" />
              </div>
            </div>
            <button type="button" onClick={handleGeocode} disabled={geocoding} className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-brand-gray hover:bg-brand-gray/90 transition-colors disabled:opacity-50">
              {geocoding ? "Looking up..." : "Lookup Coordinates from Address"}
            </button>
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
                        <input type="checkbox" checked={selected[group.key].has(opt.id)} onChange={() => toggleSelection(group.key, opt.id)} className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold" />
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

        <div className="flex gap-4 pb-8">
          <button type="submit" disabled={submitting} className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-brand-gold hover:bg-brand-gold/90 transition-colors disabled:opacity-50">{submitting ? "Saving..." : "Save Resource"}</button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
