import { Logo } from "@/components/logo/logo";
import { Menu } from "@/components/menu/menu";
import { Button } from "../ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="z-10 sticky top-0 bg-secondary flex justify-center">
      <div className="p-4 flex justify-between w-full max-w-lg">
        <Logo />
        <div className="space-x-2">
          <Link href="/product/new">
            <Button variant="outline" size="icon">
              <PlusSquare />
            </Button>
          </Link>
          <Menu />
        </div>
      </div>
    </header>
  );
}
