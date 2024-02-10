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
  KeyRound,
  Gauge,
  UserPlus,
  PlusCircle,
  Heart,
  MessageCircleMore,
  Cog,
  LogOut,
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
      <DropdownMenuContent style={{ zIndex: "500" }} align="end">
        <DropdownMenuLabel>{getGreeting()}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
          <Link
            href="/user/65bfa48aa82dcb1961c7f5e2/profile"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <CircleUserRound className="h-4 w-4" />
            <span>Jane</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
          <Button
            variant="ghost"
            onClick={() => console.log("se déconnecter")}
            className="flex items-center gap-2 p-0 h-auto text-red-500"
          >
            <LogOut className="h-4 w-4" />
            <span>Se déconnecter</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
          <Link
            href="/login"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <KeyRound className="h-4 w-4" />
            <span>Se connecter</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/register"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <UserPlus className="h-4 w-4" />
            <span>Créer mon compte</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Pages</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link
            href="/user/65bfa48aa82dcb1961c7f5e2"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Gauge className="h-4 w-4" />
            <span>Tableau de bord</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/product/new"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Ajouter</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Link
            href="/favorites"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart className="h-4 w-4" />
            <span>Favoris</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Link
            href="/messages"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <MessageCircleMore className="h-4 w-4" />
            <span>Messages</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/user/65bfa48aa82dcb1961c7f5e2/settings"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Cog className="h-4 w-4" />
            <span>Réglages</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Thème</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4" />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4" />
          <span>Sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setTheme("system")}
        >
          <Laptop className="h-4 w-4" />
          <span>Système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
