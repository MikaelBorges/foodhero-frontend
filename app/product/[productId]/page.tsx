"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";
import Link from "next/link";
import { useGetProductById } from "@/hooks/productsHooks";
import { useGetPhoneById } from "@/hooks/userHooks";
import noImage from "@/assets/noImageProduct.png";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProductPage() {
  const [userId, setUserId] = useState<string>("");
  const { data, isLoading, isError } = useGetProductById();
  const {
    data: phone,
    isLoading: isLoadingPhone,
    isError: isErrorPhone,
  } = useGetPhoneById(userId);

  return (
    <>
      <BackButton />
      {data && !isLoading && !isError && (
        <>
          <Image
            src={data.product.imageThumb ? data.product.imageThumb : noImage}
            alt={data.product.title}
            width={500}
            height={500}
            priority
          />
          <div className="text-start w-full space-y-2">
            <Badge>{data.product.category}</Badge>
            <p className="text-xs text-muted-foreground">
              {data.product.location}
            </p>
            <h1 className="text-xl font-semibold tracking-tight">
              {data.product.title}
            </h1>
          </div>
          <Separator />
          <div className="w-full">
            <Link
              className="underline"
              href={`/user/${data.user._id}/products`}
            >
              Annonces de {data.user.firstname}
            </Link>
          </div>
          <div className="flex flex-wrap w-full gap-2">
            {isErrorPhone ? (
              <p className="text-red-500">
                problème dans la récupération du n° de téléphone
              </p>
            ) : (
              <>
                {phone ? (
                  <a
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    href={`tel:${phone}`}
                  >
                    {phone}
                  </a>
                ) : (
                  <Button onClick={() => setUserId(data.user._id)}>
                    {isLoadingPhone && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>
                      {isLoadingPhone ? "Un instant" : "Voir le numéro"}
                    </span>
                  </Button>
                )}
              </>
            )}
            <Link href={`/product/${data.product._id}/update`}>
              <Button variant="secondary">Modifier</Button>
            </Link>
            <Link href={`/product/${data.product._id}/delete`}>
              <Button variant="destructive">Supprimer</Button>
            </Link>
          </div>
        </>
      )}
      {isLoading && <Loader2 className="animate-spin" />}
      {isError && <p className="text-red-500">Le produit n&apos;existe pas</p>}
    </>
  );
}
