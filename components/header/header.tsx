"use client";
import { Logo } from "@/components/logo/logo";
import { Menu } from "@/components/menu/menu";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  //PlusSquare,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { DevModeContext } from "@/contexts/devModeContext";
import { useContext } from "react";

export function Header() {
  const devModeCtx = useContext(DevModeContext);

  return (
    <header className="z-10 sticky top-0 bg-secondary flex justify-center">
      <input
        onChange={() => devModeCtx.setDevMode(!devModeCtx.devMode)}
        className="fixed top-0 left-0"
        type="checkbox"
      />
      <div className="p-4 flex justify-between w-full max-w-lg items-center">
        <Logo />
        <div className="space-x-2">
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
