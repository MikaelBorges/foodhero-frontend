"use client";
import { Button } from "@/components/ui/button";
import {
  useGetProductById,
  useGetCategories,
  useUpdateProduct,
} from "@/hooks/productsHooks";
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
import { InputTextNumber } from "@/components/inputTextNumber/inputTextNumber";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { useEffect } from "react";

export default function UpdateProductPage() {
  const {
    data: productData,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useGetProductById();
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategories();
  const {
    isSuccess: isSuccessUpdateProduct,
    isPending: isPendingUpdateProduct,
    isError: isErrorUpdateProduct,
    mutate,
  } = useUpdateProduct();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (productData?.product) {
      form.setValue("title", productData.product.title);
      form.setValue("location", productData.product.location);
      form.setValue("price", String(productData.product.price));
      form.setValue("category", productData.product.category);
    }
  }, [productData, form]);

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

  return (
    <>
      <BackButton />
      {productData && !isLoadingProduct && !isErrorProduct && (
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        key={Date.now()} // TRICK : Pour forcer le reset d'un radio coché
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                        className="flex gap-3 py-3"
                      >
                        <div className="flex flex-wrap space-y-0 gap-3">
                          {categoriesData?.map((category) => (
                            <FormItem
                              key={category}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={category} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {category}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isLoadingCategories && <Loader2 className="animate-spin m-auto" />}
            {isErrorCategories && (
              <p className="italic text-sm text-start text-orange-500">
                Catégories non disponibles mais on peut toujours mettre à jour
                l&pos;annonce
              </p>
            )}

            <div className="space-x-2">
              <Button
                disabled={
                  isPendingUpdateProduct ||
                  isSuccessUpdateProduct ||
                  isLoadingProduct ||
                  isErrorProduct
                }
                type="submit"
              >
                {isPendingUpdateProduct && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>
                  {isPendingUpdateProduct
                    ? "Un instant"
                    : "Modifier mon annonce"}
                </span>
              </Button>
            </div>
          </form>
        </Form>
      )}

      {isLoadingProduct && <Loader2 className="animate-spin m-auto" />}

      {(isErrorCategories || isErrorUpdateProduct) && (
        <p className="text-red-500 text-center">
          Problème dans la soumission de l&apos;annonce
        </p>
      )}

      {isSuccessUpdateProduct && (
        <p className="text-green-500 text-center">Annonce bien soumise</p>
      )}
    </>
  );
}
