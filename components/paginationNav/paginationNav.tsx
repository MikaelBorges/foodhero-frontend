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

export function PaginationList({ totalPages }: any) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const pageParams = params.page ? Number(params.page) : 1;

  return (
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
                  pageParams + 1 <= totalPages ? pageParams + 1 : pageParams,
              },
            }}
            scroll={false}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
