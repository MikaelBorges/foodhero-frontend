"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu as BurgerMenu, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
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
        <DropdownMenuLabel>Thème</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>Système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
