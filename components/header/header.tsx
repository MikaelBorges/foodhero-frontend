"use client";
import { Logo } from "@/components/logo/logo";
import { Menu } from "@/components/menu/menu";
import { Button } from "@/components/ui/button";
import { Newspaper, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useDevModeContext } from "@/contexts/devModeContext";

export function Header() {
  const { toggleDevMode } = useDevModeContext();

  return (
    <header className="z-10 sticky top-0 bg-secondary flex justify-center">
      <div className="fixed top-0 left-0 w-3 h-3" onClick={toggleDevMode} />
      <div className="p-4 flex justify-between w-full max-w-lg items-center">
        <Logo />
        <div className="flex gap-2">
          <Link href="/product/new">
            <Button variant="outline" size="icon">
              <PlusCircle />
            </Button>
          </Link>
          <Link href="/user/65bfa48aa82dcb1961c7f5e2/products">
            <Button variant="outline" size="icon">
              <Newspaper />
            </Button>
          </Link>
          <Menu />
        </div>
      </div>
    </header>
  );
}
