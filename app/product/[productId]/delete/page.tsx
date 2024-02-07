"use client";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { ProductCard } from "@/components/productCard/productCard";
import { Button } from "@/components/ui/button";
import {
  //useDeleteProduct,
  useGetProductById,
} from "@/hooks/productsHooks";
import Link from "next/link";

export default function DeleteProductPage() {
  const { data, isLoading, isError } = useGetProductById();

  /* const { data: idDeleted } = useDeleteProduct();
  console.log("idDeleted", idDeleted); */

  return (
    <>
      <BackButton />
      <h1>Supprimer cette annonce ?</h1>
      {data?.product && !isLoading && !isError && (
        <ProductCard product={data.product} />
      )}
      <div className="flex gap-2">
        <Link href={`/user/${data?.user._id}/products`}>
          <Button>Revenir à mes annonces</Button>
        </Link>
        <Button
          onClick={() => console.log("supprimer annonce")}
          variant="destructive"
        >
          Oui supprimer
        </Button>
      </div>
    </>
  );
}
