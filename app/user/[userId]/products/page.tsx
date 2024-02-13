"use client";
import { useGetUserProducts } from "@/hooks/productsHooks";
import { ProductCard } from "@/components/productCard/productCard";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { Loader2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginationList } from "@/components/paginationNav/paginationNav";

export default function UserProductsPage() {
  const { data, isLoading, isError } = useGetUserProducts();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const pageParams = params.page ? Number(params.page) : 1;
  // TO DO > Ces histoires de range ou pageSize
  const rangeParams = params.range ? Number(params.range) : 10;
  const totalPages = data?.totalProducts
    ? Math.ceil(data.totalProducts / rangeParams)
    : 1;

  return (
    <>
      <BackButton />
      {data?.firstname && (
        <h1 className="text-xl font-semibold tracking-tight">
          Annonce(s) de {data.firstname}
        </h1>
      )}
      {Boolean(data?.totalProducts) && (
        <p className="text-sm">{data?.totalProducts} annonce(s)</p>
      )}
      {Boolean(data?.totalProducts) && !isLoading && !isError && (
        <ul className="grid gap-3 grid-cols-1 w-full">
          {data?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
      {!data?.totalProducts && !isLoading && !isError && (
        <p className="text-sm">Pas d&apos;annonces</p>
      )}
      {isLoading && <Loader2 className="animate-spin m-auto" />}
      {isError && (
        <p className="text-red-500 text-sm">
          Erreur lors de la récupération des annonces de l&paos;utilisateur
        </p>
      )}
      {totalPages > 1 && !isLoading && !isError && (
        <PaginationList totalPages={totalPages} />
      )}
    </>
  );
}
