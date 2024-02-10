"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function DevMode() {
  const [isTodolistVisible, setIsTodolistVisible] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Label htmlFor="dev-mode">Dev mode</Label>
        <Switch
          id="dev-mode"
          onCheckedChange={() => setIsTodolistVisible(!isTodolistVisible)}
        />
      </div>
      {isTodolistVisible && (
        <ol className="list-decimal pl-4 text-red-500">
          <li>
            au clic sur le logo (et sur le bouton retour) les filtres restent
            cochés, et le reset des filtres ne fonctionne plus
          </li>
          <li>la pagination est un peu statique et n&apos;évolue pas</li>
          <li>la page active dans la pagination n&apos;est pas visible</li>
          <li>ios : effet de zoom sur les champs qui reste actif même après</li>
          <li>retirer les badges des cards</li>
        </ol>
      )}
    </>
  );
}
