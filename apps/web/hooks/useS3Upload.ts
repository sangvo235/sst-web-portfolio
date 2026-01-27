"use client";

import { useState } from "react";

export function useS3UploadHandler() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);

  async function uploadFile(file: File) {
    setIsUploading(true);
    setError(null);

    try {
      const res = await fetch("/api/s3/upload", {
        method: "POST",
        body: JSON.stringify({ filename: file.name, filetype: file.type }),
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
      setImageKey(key);
      return key;

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  return {
    imageKey,
    isUploading,
    error,
    uploadFile,
  };
}
