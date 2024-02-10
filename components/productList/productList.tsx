"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetProducts } from "@/hooks/productsHooks";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { ProductCard } from "../productCard/productCard";

export function ProductList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { data, isLoading, isError } = useGetProducts();
  const pageParams = params.page ? Number(params.page) : 1;
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
      {data?.products && !isLoading && !isError && (
        <ul className="grid gap-3 grid-cols-1 w-full">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
      {!data?.totalProducts && !isLoading && !isError && (
        <p className="text-sm">Aucun produit ne correspond à vos critères</p>
      )}
      {Boolean(totalPages > 1) && !isLoading && !isError && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={{
                  pathname,
                  query: { ...params, page: Math.max(1, pageParams - 1) },
                }}
                scroll={false}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => {
              if (
                totalPages <= 4 ||
                (totalPages > 4 && (index <= 2 || index === totalPages - 1))
              ) {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={{
                        pathname,
                        query: {
                          ...params,
                          page: index + 1,
                        },
                      }}
                      scroll={false}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (totalPages > 4 && index === 3) {
                return (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
            })}
            <PaginationItem>
              <PaginationNext
                href={{
                  pathname,
                  query: {
                    ...params,
                    page:
                      pageParams + 1 <= totalPages
                        ? pageParams + 1
                        : pageParams,
                  },
                }}
                scroll={false}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
