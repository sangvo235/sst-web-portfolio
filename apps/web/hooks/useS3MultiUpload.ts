"use client";

import { useState } from "react";

export function useS3MultiUploadHandler(folder: string) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keys, setKeys] = useState<string[]>([]);

  async function uploadFiles(files: File[]) {
    if (!files.length) return [];

    setIsUploading(true);
    setError(null);

    const uploadedKeys: string[] = [];

    try {
      for (const file of files) {
        const res = await fetch("/api/s3/upload", {
          method: "POST",
          body: JSON.stringify({
            filename: file.name,
            filetype: file.type,
            folder,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Failed to get upload URL");
        }

        const { signedUrl, key } = await res.json();

        const uploadRes = await fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!uploadRes.ok) {
            const errorText = await uploadRes.text();
            throw new Error(errorText || "Failed to upload to S3");
        }

        // Pulbic URL to be stored in DB
        uploadedKeys.push(key);
      }

      setKeys(prev => [...prev, ...uploadedKeys]);
      return uploadedKeys;
    } catch (err: any) {
      setError(err.message ?? "Upload failed");
      return [];
    } finally {
      setIsUploading(false);
    }
  }

  return {
    keys,
    isUploading,
    error,
    uploadFiles,
  };
}
