"use client";

import dynamic from "next/dynamic";
import type { Resource } from "@/types/database";

const MapInner = dynamic(() => import("./ResourceMapInner"), { ssr: false });

interface ResourceMapProps {
  resources: Resource[];
  height?: string;
}

export default function ResourceMap({ resources, height = "400px" }: ResourceMapProps) {
  return <MapInner resources={resources} height={height} />;
}
