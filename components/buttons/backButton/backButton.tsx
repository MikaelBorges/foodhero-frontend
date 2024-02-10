"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <div className="w-full">
      <Button
        onClick={() => router.back()}
        variant="link"
        className="space-x-2 p-0"
      >
        <ChevronLeft /> Retour
      </Button>
    </div>
  );
}
