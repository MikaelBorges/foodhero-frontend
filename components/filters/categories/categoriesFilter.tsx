import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetCategories } from "@/hooks/productsHooks";
import { CommonFilterProps } from "@/types/filterTypes";
import { Loader2 } from "lucide-react";

export function CategoriesFilter({ control }: CommonFilterProps) {
  const { data, isLoading, isError } = useGetCategories();

  const categories = data?.map((category) => ({
    id: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  }));

  return (
    <>
      {data && !isLoading && !isError && (
        <FormField
          control={control}
          name="categories"
          render={() => (
            <FormItem className="flex flex-wrap space-y-0 gap-3">
              {categories?.map((item) => (
                <FormField
                  key={item.id}
                  control={control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {isLoading && <Loader2 className="animate-spin m-auto" />}
      {isError && (
        <p className="italic text-sm text-start text-orange-500">
          Catégories non disponibles mais on peut toujours faire des recherches
        </p>
      )}
    </>
  );
}
