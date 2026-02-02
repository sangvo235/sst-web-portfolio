"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitButton } from "@/components/general/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Comment({
  postId,
  projectId,
}: {
  postId?: string;
  projectId?: string;
}) {
  if (!postId && !projectId) return null;

  const router = useRouter();
  const [content, setContent] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    if (postId) formData.append("postId", postId);
    if (projectId) formData.append("projectId", projectId);

    console.log(postId, projectId);
    console.log(content);

    const res = await fetch("/api/comments", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setContent("");
      router.push(data.redirectTo);
    }
  }

  return (
    <div className="col-start-2 col-span-4 px-6">
      <Label className="py-2">Add your comment</Label>
      <div>
        <form className="flex flex-col gap-4 mb-4" onSubmit={onSubmit}>
          {postId && <Input type="hidden" name="postId" value={postId} />}
          {projectId && (
            <Input type="hidden" name="projectId" value={projectId} />
          )}

          <div className="flex flex-col gap-2">
            <Textarea
              name="content"
              required
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

// TODO: Instead of redirect force should map the content
