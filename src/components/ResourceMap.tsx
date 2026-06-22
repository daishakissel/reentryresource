"use client";

import dynamic from "next/dynamic";
import type { Resource } from "@/types/database";

const MapInner = dynamic(() => import("./ResourceMapInner"), { ssr: false });

interface ResourceMapProps {
  resources: Resource[];
  backPath?: string;
  height?: string;
}

export default function ResourceMap({ resources, backPath, height = "400px" }: ResourceMapProps) {
  return <MapInner resources={resources} backPath={backPath} height={height} />;
}
