"use client";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { ProductCard } from "@/components/productCard/productCard";
import { Button } from "@/components/ui/button";
import { useDeleteProduct, useGetProductById } from "@/hooks/productsHooks";
import Link from "next/link";

export default function DeleteProductPage() {
  const { data, isLoading, isError } = useGetProductById();
  const {
    data: idDeleted,
    isPending: isPendingDelete,
    isError: isErrorDelete,
    mutate,
  } = useDeleteProduct();

  return (
    <>
      <BackButton />
      <h1 className="text-xl font-semibold tracking-tight">
        Etes-vous sûr(e) ?
      </h1>
      {data?.product && !isLoading && !isError && (
        <ProductCard product={data.product} />
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <Link href={`/user/${data?.user._id}/products`}>
          <Button>Revenir à mes annonces</Button>
        </Link>
        <Button onClick={() => mutate()} variant="destructive">
          Oui supprimer
        </Button>
      </div>
      {idDeleted && !isPendingDelete && !isErrorDelete && (
        <p className="text-green-500 text-center">Annonce bien supprimée</p>
      )}
    </>
  );
}
