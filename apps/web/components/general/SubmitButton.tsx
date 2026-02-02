"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  disabled?: boolean;
};

export function SubmitButton({ disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-fit" type="submit" disabled={pending || disabled}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
