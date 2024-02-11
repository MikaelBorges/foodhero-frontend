"use client";
import { Button } from "@/components/ui/button";
import { useCreateProduct, useGetCategories } from "@/hooks/productsHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productSchema } from "@/schemas/productSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { removeEmptyValues } from "@/lib/formUtils";
import { InputTextNumber } from "@/components/inputTextNumber/inputTextNumber";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { Checkbox } from "@/components/ui/checkbox";

export default function NewProductPage() {
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategories();
  const {
    isSuccess: isSuccessCreateProduct,
    isPending: isPendingCreateProduct,
    isError: isErrorCreateProduct,
    mutate,
  } = useCreateProduct();

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: params.title ? params.title : "",
      location: params.location ? params.location : "",
      price: params.price ? params.price : "",
      categories: params.categories ? params.categories.split(",") : [],
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => mutate(values);

  const inputs = [
    {
      name: "title",
      placeholder: "Nom du plat...",
    },
    {
      name: "location",
      placeholder: "Ville",
    },
    {
      name: "price",
      placeholder: "Prix",
      type: "number",
    },
  ];

  const categories = categoriesData?.map((category) => ({
    id: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  }));

  return (
    <>
      <BackButton />
      <h1 className="text-xl font-semibold tracking-tight">
        Déposer une annonce
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 rounded-md border p-4 bg-secondary text-right w-full"
        >
          {inputs.map(({ name, placeholder, type }) => (
            <InputTextNumber
              key={name}
              type={type}
              placeholder={placeholder}
              name={name}
              control={form.control}
            />
          ))}

          {categoriesData && !isLoadingCategories && !isErrorCategories && (
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem className="flex flex-wrap space-y-0 gap-3">
                  {categories?.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
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

          <div className="space-x-2">
            <Button
              disabled={
                isLoadingCategories ||
                isPendingCreateProduct ||
                isSuccessCreateProduct
              }
              type="submit"
            >
              {isPendingCreateProduct && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>
                {isPendingCreateProduct
                  ? "Un instant"
                  : "Soumettre mon annonce"}
              </span>
            </Button>
          </div>
        </form>
      </Form>

      {(isErrorCategories || isErrorCreateProduct) && (
        <p className="text-red-500 text-center">
          Problème dans la soumission de l&apos;annonce
        </p>
      )}

      {isSuccessCreateProduct && (
        <p className="text-green-500 text-center">Annonce bien soumise</p>
      )}
    </>
  );
}
