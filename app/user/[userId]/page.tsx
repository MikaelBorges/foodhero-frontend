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
import { Cog, Newspaper } from "lucide-react";

export default function UserPage() {
  const { userId } = useParams();

  return (
    <>
      <BackButton />
      <h1>Tableau de bord</h1>
      <ul className="grid gap-3 grid-cols-1 w-full">
        <Link href={`/user/${userId}/products`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <Newspaper />
                Annonces
              </CardTitle>
              <CardDescription>Toutes mes annonces</CardDescription>
            </CardHeader>
            <CardContent>Toutes mes annonces</CardContent>
          </Card>
        </Link>
        <Link href={`/user/${userId}/settings`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <Cog />
                Réglages
              </CardTitle>
              <CardDescription>Tous mes réglages</CardDescription>
            </CardHeader>
            <CardContent>Tous mes réglages</CardContent>
          </Card>
        </Link>
      </ul>
    </>
  );
}
