"use client";
import { BackButton } from "@/components/buttons/backButton/backButton";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleUserRound, Cog, Newspaper } from "lucide-react";

export default function UserPage() {
  const { userId } = useParams();

  return (
    <>
      <BackButton />
      <h1 className="text-xl font-semibold tracking-tight">Tableau de bord</h1>
      <ul className="grid gap-3 grid-cols-1 w-full">
        <Link href={`/user/${userId}/products`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Newspaper />
                Annonces
              </CardTitle>
              <CardDescription>Toutes mes annonces</CardDescription>
            </CardHeader>
            <CardContent>Toutes mes annonces</CardContent>
          </Card>
        </Link>
        <Link href={`/user/${userId}/update`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CircleUserRound />
                Profil
              </CardTitle>
              <CardDescription>Voir mon profil</CardDescription>
            </CardHeader>
            <CardContent>Voir mon profil</CardContent>
          </Card>
        </Link>
        <Card className="text-gray-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Cog />
              Réglages
            </CardTitle>
            <CardDescription>Tous mes réglages</CardDescription>
          </CardHeader>
          <CardContent>Tous mes réglages</CardContent>
        </Card>
      </ul>
    </>
  );
}
