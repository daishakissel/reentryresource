"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { loadLastWhy } from "@/lib/filterStorage";
import Link from "next/link";
import ResourceMap from "@/components/ResourceMap";
import ContentRenderer from "@/components/ContentRenderer";

interface ResourceDetail {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  featured_image: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  region: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  what_topic_id: string | null;
  created_at: string;
  what_topic: string | null;
  why_categories: string[];
  where_types: string[];
  when_times: string[];
  how_formats: string[];
  who_centerings: string[];
}

async function fetchResource(slug: string): Promise<ResourceDetail | null> {
  // Try slug first, fall back to ID for old links
  let { data: resource } = await supabase
    .from("resources")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!resource) {
    const { data: byId } = await supabase
      .from("resources")
      .select("*")
      .eq("id", slug)
      .single();
    resource = byId;
  }

  if (!resource) return null;

  const detail: ResourceDetail = {
    ...resource,
    what_topic: null,
    why_categories: [],
    where_types: [],
    when_times: [],
    how_formats: [],
    who_centerings: [],
  };

  // Fetch tags via API
  const res = await fetch(`/api/resources/${resource.id}/tags`, { cache: "no-store" });
  if (res.ok) {
    const tags = await res.json();
    detail.what_topic = tags["What"]?.[0] ?? null;
    detail.why_categories = tags["Why"] ?? [];
    detail.where_types = tags["Where"] ?? [];
    detail.when_times = tags["When"] ?? [];
    detail.how_formats = tags["How"] ?? [];
    detail.who_centerings = tags["Who"] ?? [];
  }

  return detail;
}

function TagList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="px-2 py-1 bg-brand-gold-light text-brand-brown rounded-md text-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const [resource, setResource] = useState<ResourceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [lastWhy, setLastWhy] = useState({ label: "All", href: "/" });

  useEffect(() => {
    setLastWhy(loadLastWhy());
    fetchResource(params.slug).then((r) => {
      setResource(r);
      setLoading(false);
    });
  }, [params.slug]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!resource) return <p className="text-gray-500">Resource not found.</p>;

  const hasLocation = resource.latitude && resource.longitude;
  const fullAddress = [resource.street_address, resource.city, resource.state, resource.zip].filter(Boolean).join(", ");

  return (
    <div>
      <button onClick={() => window.history.back()} className="text-sm text-brand-gold hover:underline mb-4 inline-block">&larr; Back to {lastWhy.label} resources</button>

      {hasLocation && (
        <div className="mb-6">
          <ResourceMap
            resources={[{
              ...resource,
              updated_at: resource.created_at,
            } as any]}
            height="300px"
          />
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{resource.title}</h1>

      {resource.what_topic && (
        <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-ocean-light text-gray-600 dark:text-gray-300 rounded-md text-sm mb-4">
          {resource.what_topic}
        </span>
      )}

      {resource.description && (
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">{resource.description}</p>
      )}

      {resource.content && (
        <div className="mt-4 mb-6">
          <ContentRenderer content={resource.content} />
        </div>
      )}

      {/* Contact & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Contact</h2>
          {resource.phone && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Phone:</span>{" "}
              <a href={`tel:${resource.phone}`} className="text-brand-gold hover:underline">{resource.phone}</a>
            </p>
          )}
          {resource.email && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Email:</span>{" "}
              <a href={`mailto:${resource.email}`} className="text-brand-gold hover:underline">{resource.email}</a>
            </p>
          )}
          {resource.website && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Website:</span>{" "}
              <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">{resource.website}</a>
            </p>
          )}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Location</h2>
          {fullAddress ? (
            <p className="text-sm text-gray-700 dark:text-gray-300">{fullAddress}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">No address provided</p>
          )}
          {resource.region && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Region: {resource.region}</p>
          )}
        </div>
      </div>

      {/* Classifications dropdown */}
      <div className="mb-8">
        <button
          onClick={() => setDetailsOpen((v) => !v)}
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-200 hover:text-brand-gold transition-colors"
        >
          <span>Details</span>
          <svg className={`w-5 h-5 transition-transform ${detailsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {detailsOpen && (
          <div className="mt-4 space-y-4">
            {resource.what_topic && <TagList label="What" items={[resource.what_topic]} />}
            <TagList label="Why" items={resource.why_categories} />
            <TagList label="Where" items={resource.where_types} />
            <TagList label="When" items={resource.when_times} />
            <TagList label="How" items={resource.how_formats} />
            <TagList label="Who" items={resource.who_centerings} />
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">Added {new Date(resource.created_at).toLocaleDateString()}</p>
    </div>
  );
}
