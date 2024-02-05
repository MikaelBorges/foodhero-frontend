"use client";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserPage() {
  const { userId } = useParams();

  return (
    <>
      <BackButton />
      <h1>UserPage</h1>
      <Link href={`/user/${userId}/products`}>
        <Button>Annonces</Button>
      </Link>
    </>
  );
}
