"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/lib/imageUpload";

interface ImageUploadProps {
  bucket: "resources" | "shelters";
  folder?: string;
  onUploaded: (url: string) => void;
  label?: string;
  currentUrl?: string;
}

export default function ImageUpload({ bucket, folder, onUploaded, label = "Upload Image", currentUrl }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const url = await uploadImage(file, bucket, folder);
      setPreview(url);
      onUploaded(url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handlePaste(e: React.ClipboardEvent) {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (!file) continue;

        setError(null);
        setUploading(true);

        try {
          const url = await uploadImage(file, bucket, folder);
          setPreview(url);
          onUploaded(url);
        } catch (err: any) {
          setError(err.message || "Upload failed");
        }

        setUploading(false);
        break;
      }
    }
  }

  return (
    <div onPaste={handlePaste}>
      {preview && (
        <div className="mb-2 relative inline-block">
          <img src={preview} alt="Preview" className="h-24 rounded border border-gray-200 dark:border-ocean-light object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(null); onUploaded(""); }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
          >
            &times;
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <label className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean transition-colors cursor-pointer">
          {uploading ? "Uploading..." : label}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <span className="text-xs text-gray-400">or paste an image</span>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
