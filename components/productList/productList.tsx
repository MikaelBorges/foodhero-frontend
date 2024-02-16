"use client";
import { useGetProducts } from "@/hooks/productsHooks";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/productCard/productCard";
import { PaginationList } from "../paginationNav/paginationNav";

export function ProductList() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { data, isLoading, isError } = useGetProducts();
  // TO DO : Ces histoires de range ou pageSize
  const rangeParams = params.range ? Number(params.range) : 10;
  const totalPages = data?.totalProducts
    ? Math.ceil(data.totalProducts / rangeParams)
    : 1;

  return (
    <>
      {Boolean(data?.totalProducts) && !isLoading && !isError && (
        <p className="text-sm">{data?.totalProducts} annonce(s) trouvée(s)</p>
      )}
      {isLoading && <Loader2 className="animate-spin m-auto" />}
      {isError && (
        <p className="text-red-500 text-sm">
          Erreur lors de la récupération des produits
        </p>
      )}
      {Boolean(data?.products.length) && !isLoading && !isError && (
        <ul className="grid gap-3 grid-cols-1 w-full">
          {data?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
      {!data?.totalProducts && !isLoading && !isError && (
        <p className="text-sm">Aucun produit ne correspond à vos critères</p>
      )}
      {totalPages > 1 && !isLoading && !isError && (
        <PaginationList totalPages={totalPages} />
      )}
    </>
  );
}
