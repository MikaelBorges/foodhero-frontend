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
import { InputTextNumber } from "@/components/inputTextNumber/inputTextNumber";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDevModeContext } from "@/contexts/devModeContext";
import { DevTool } from "@hookform/devtools";
import { mainTitleStyle } from "@/constants/commonStyles";

export default function UpdateProductPage() {
  const { devMode } = useDevModeContext();

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
      // WARNING > Ceci provoque une erreur dans la console
      form.setValue("title", productData.product.title);
      form.setValue("location", productData.product.location);
      form.setValue("price", String(productData.product.price));
      form.setValue("categories", productData.product.categories);
    }
  }, [productData, form]);

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    mutate(values);
  };
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
      <h1 className={mainTitleStyle}>Modifiez votre annonce</h1>
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

            {/* {categoriesData && !isLoadingCategories && !isErrorCategories && (
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
            )} */}

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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
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
                    : "Valider les modifications"}
                </span>
              </Button>
            </div>
          </form>
          {devMode && <DevTool control={form.control} />}
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
