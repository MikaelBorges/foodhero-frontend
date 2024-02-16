"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGetProducts } from "@/hooks/productsHooks";
import { removeEmptyValues } from "@/lib/formUtils";
import { filtersSchema } from "@/schemas/filtersSchema";
import { FilterValues } from "@/types/filterTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategoriesFilter } from "@/components/filters/categories/categoriesFilter";
import { PricesFilter } from "@/components/filters/prices/pricesFilter";
import { SortFilter } from "@/components/filters/sort/sortFilter";
import { TitleFilter } from "@/components/filters/title/titleFilter";
import { LocationFilter } from "@/components/filters/location/locationFilter";
import { DevTool } from "@hookform/devtools";
import { useDevModeContext } from "@/contexts/devModeContext";

export function Filters() {
  const { isLoading } = useGetProducts();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { devMode } = useDevModeContext();

  const form = useForm<FilterValues>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      title: params.title ? params.title : "",
      location: params.location ? params.location : "",
      minPrice: params.minPrice ? params.minPrice : "",
      maxPrice: params.maxPrice ? params.maxPrice : "",
      sort: params.sort ? (params.sort as "asc" | "desc") : "desc",
      categories: params.categories ? params.categories.split(",") : [],
    },
  }); // WARNING : Problème de type sur categories

  const onSubmit = (values: z.infer<typeof filtersSchema>) => {
    const usefulValues = removeEmptyValues(values);
    const urlSearchParams = new URLSearchParams(
      usefulValues as Record<string, string>
    ).toString();

    router.push(`${pathname}${urlSearchParams ? `?${urlSearchParams}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-md border p-4 bg-secondary text-right"
      >
        <div className="space-y-1">
          <TitleFilter control={form.control} />
          <LocationFilter control={form.control} />
        </div>
        <SortFilter control={form.control} />
        <PricesFilter control={form.control} />
        <CategoriesFilter control={form.control} />
        <div className="space-x-2">
          <Button disabled={isLoading} type="submit">
            Rechercher
          </Button>
          <Button
            disabled={isLoading}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              router.replace("/", {
                scroll: false,
              });
              form.reset();
            }}
          >
            Tout effacer
          </Button>
        </div>
      </form>
      {devMode && <DevTool control={form.control} />}
    </Form>
  );
}
