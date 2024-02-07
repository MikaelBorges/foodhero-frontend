"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Menu as BurgerMenu,
  Laptop,
  Moon,
  Sun,
  CircleUserRound,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export function Menu() {
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? "Bonjour" : "Bonsoir";
  };

  return (
    <DropdownMenu
      open={isMenuOpen}
      onOpenChange={() => setIsMenuOpen(!isMenuOpen)}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <BurgerMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
          <Link
            href="/user/65bfa48aa82dcb1961c7f5e2"
            className="flex gap-2 items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <CircleUserRound className="h-4 w-4" />
            <span className="capitalize">Utilisateur</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Thème</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("system")}
        >
          <Laptop className="mr-2 h-4 w-4" />
          <span>Système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
