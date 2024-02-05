import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
  path?: string;
};

export function BackButton({ path = "/" }: BackButtonProps) {
  return (
    <div className="w-full">
      <Link href={path}>
        <Button variant="link" className="space-x-2 p-0">
          ← Retour
        </Button>
      </Link>
    </div>
  );
}
