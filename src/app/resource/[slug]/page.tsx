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
  engage: string | null;
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
  category_id: string | null;
  created_at: string;
  category_name: string | null;
  elements: string[];
  modes_list: string[];
  formats: string[];
  centerings: string[];
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
    category_name: null,
    elements: [],
    modes_list: [],
    formats: [],
    centerings: [],
  };

  // Fetch tags via API
  const res = await fetch(`/api/resources/${resource.id}/tags`, { cache: "no-store" });
  if (res.ok) {
    const tags = await res.json();
    detail.category_name = tags["Category"]?.[0] ?? null;
    detail.elements = tags["Element"] ?? [];
    detail.modes_list = tags["Mode"] ?? [];
    detail.formats = tags["Format"] ?? [];
    detail.centerings = tags["Centering"] ?? [];
  }

  return detail;
}


export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const [resource, setResource] = useState<ResourceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastWhy, setLastWhy] = useState({ label: "All", href: "/" });
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

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

  const allLabels = [
    ...(resource.elements.length > 0 ? resource.elements : []),
    ...(resource.category_name ? [resource.category_name] : []),
    ...resource.modes_list,
    ...resource.formats,
    ...resource.centerings,
  ];

  const lastModified = resource.updated_at && resource.updated_at !== resource.created_at
    ? resource.updated_at
    : resource.created_at;

  function toggleSection(key: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  function SectionToggle({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    const isOpen = openSections.has(id);
    return (
      <div className="border-b border-gray-200 dark:border-ocean-light">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between py-3 text-left"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && <div className="pb-4">{children}</div>}
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => window.history.back()} className="text-sm text-brand-gold hover:underline mb-6 inline-block">&larr; Back to {lastWhy.label} resources</button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{resource.title}</h1>

      {/* Labels */}
      {allLabels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {allLabels.map((label) => (
            <span key={label} className="text-xs px-2 py-0.5 rounded bg-brand-gold-light text-brand-brown">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Map */}
      {hasLocation && (
        <div className="mb-6">
          <ResourceMap
            resources={[{ ...resource, updated_at: resource.created_at } as any]}
            height="300px"
          />
        </div>
      )}

      {/* Toggled sections */}
      <div className="space-y-0">
        <SectionToggle id="description" title="Description">
          {resource.description ? (
            <p className="text-gray-600 dark:text-gray-300">{resource.description}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">No description available</p>
          )}
        </SectionToggle>

        <SectionToggle id="engage" title="Engage">
          {resource.engage ? (
            <p className="text-gray-600 dark:text-gray-300">{resource.engage}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">No engagement information available</p>
          )}
        </SectionToggle>

        <SectionToggle id="content" title="More Info">
          {resource.content ? (
            <ContentRenderer content={resource.content} />
          ) : (
            <p className="text-sm text-gray-400 italic">No additional information available</p>
          )}
        </SectionToggle>

        <SectionToggle id="contact" title="Contact">
          {(resource.phone || resource.email || resource.website || fullAddress) ? (
            <div className="space-y-2">
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
              {fullAddress && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Address:</span> {fullAddress}
                </p>
              )}
              {resource.region && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Region:</span> {resource.region}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No contact information available</p>
          )}
        </SectionToggle>
      </div>

      {/* Last Modified */}
      <p className="text-xs text-gray-400 mt-8">
        Last Modified: {new Date(lastModified).toLocaleDateString()} {new Date(lastModified).toLocaleTimeString()}
      </p>
    </div>
  );
}
