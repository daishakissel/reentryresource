"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/lib/imageUpload";

interface ContentImageInsertProps {
  bucket: "resources" | "shelters";
  folder?: string;
  onInsert: (imgTag: string) => void;
}

export default function ContentImageInsert({ bucket, folder, onInsert }: ContentImageInsertProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setUploading(true);
    try {
      const url = await uploadImage(file, bucket, folder);
      onInsert(`<img src="${url}" alt="" style="max-width:100%" />`);
    } catch {
      alert("Failed to upload image");
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <label className="inline-block px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean transition-colors cursor-pointer">
      {uploading ? "Uploading..." : "Insert Image"}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        disabled={uploading}
        className="hidden"
      />
    </label>
  );
}
