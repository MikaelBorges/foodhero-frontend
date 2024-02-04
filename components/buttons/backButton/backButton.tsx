import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BackButton() {
  return (
    <div className="w-full">
      <Link href="/">
        <Button variant="link" className="space-x-2 p-0">
          ← Retour
        </Button>
      </Link>
    </div>
  );
}
