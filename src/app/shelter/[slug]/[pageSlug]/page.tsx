"use client";

import { useEffect, useState } from "react";
import { useShelter } from "@/context/ShelterContext";
import { useRouter } from "next/navigation";
import ContentRenderer from "@/components/ContentRenderer";

interface ShelterPage {
  title: string;
  content: string;
}

export default function ShelterPageView({ params }: { params: { slug: string; pageSlug: string } }) {
  const { isShelterUnlocked } = useShelter();
  const router = useRouter();
  const [page, setPage] = useState<ShelterPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isShelterUnlocked(params.slug)) {
      router.replace("/");
      return;
    }

    async function load() {
      const res = await fetch(`/api/shelters/${params.slug}/pages`);
      if (res.ok) {
        const data = await res.json();
        const found = data.pages.find((p: any) => p.slug === params.pageSlug);
        setPage(found ?? null);
      }
      setLoading(false);
    }
    load();
  }, [params.slug, params.pageSlug, isShelterUnlocked, router]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!page) return <p className="text-gray-500">Page not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{page.title}</h1>
      <ContentRenderer content={page.content} />
    </div>
  );
}
