"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";
import Link from "next/link";
import { useGetProductById } from "@/hooks/productsHooks";
import { useGetPhoneById } from "@/hooks/userHooks";

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
      {data?.product && <h1>{data.product.title}</h1>}
      {isLoading && <Loader2 className="animate-spin" />}
      {isError && <p className="text-red-500">erreur...</p>}
      {data?.product && !isLoading && !isError && (
        <div className="flex w-full">
          <div className="w-2/3">
            <p>product category {data.product.category}</p>
            <p>product location {data.product.location}</p>
            <p>product title {data.product.title}</p>
            {data.product.imageThumb && (
              <Image
                width={300}
                height={300}
                priority
                src={data.product.imageThumb}
                alt={data.product.title}
              />
            )}
            <p>product price {data.product.price}</p>
          </div>
          {data.user && (
            <div className="w-1/3 flex flex-col gap-2">
              <Link href={`/user/${data.user._id}/products`}>
                <Button variant="link">{data.user.firstname}</Button>
              </Link>
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
          )}
        </div>
      )}
    </>
  );
}
