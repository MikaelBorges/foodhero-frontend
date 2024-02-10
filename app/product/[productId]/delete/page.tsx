"use client";
import { BackButton } from "@/components/buttons/backButton/backButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDeleteProduct, useGetProductById } from "@/hooks/productsHooks";
import Link from "next/link";
import noImageLight from "@/assets/noImageProductLight.jpg";
import noImageDark from "@/assets/noImageProductDark.jpg";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const { data, isLoading, isError } = useGetProductById();
  const {
    data: idDeleted,
    isPending: isPendingDelete,
    isError: isErrorDelete,
    mutate,
  } = useDeleteProduct();
  const [colorTheme, setColorTheme] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      setColorTheme("dark");
    } else if (theme === "light") {
      setColorTheme("light");
    } else if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setColorTheme("dark");
      } else {
        setColorTheme("light");
      }
    }
  }, [theme]);

  const noImageUrl = colorTheme == "dark" ? noImageDark : noImageLight;

  return (
    <>
      {!Boolean(idDeleted) && <BackButton />}
      {data && !isLoading && !isError && (
        <>
          <h1 className="text-xl font-semibold tracking-tight">
            Etes-vous sûr(e) ?
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href={`/user/${data.user._id}/products`}>
              <Button>Revenir à mes annonces</Button>
            </Link>
            <Button
              disabled={Boolean(idDeleted) || isPendingDelete}
              onClick={() => mutate()}
              variant="destructive"
            >
              {isPendingDelete && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isPendingDelete ? "Un instant" : "Oui supprimer"}
            </Button>
            {idDeleted && !isPendingDelete && !isErrorDelete && (
              <p className="text-green-500">Annonce bien supprimée</p>
            )}
            {isErrorDelete && (
              <p className="text-red-500">
                Problème dans la suppression de l&apos;annonce
              </p>
            )}
          </div>
          <Image
            src={data.product.imageThumb ? data.product.imageThumb : noImageUrl}
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
        </>
      )}
      {isLoading && <Loader2 className="animate-spin" />}
      {isError && <p className="text-red-500">Le produit n&apos;existe pas</p>}
    </>
  );
}
