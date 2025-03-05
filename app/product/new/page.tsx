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
import { InputTextNumber } from "@/components/inputTextNumber/inputTextNumber";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useDevModeContext } from "@/contexts/devModeContext";
import { DevTool } from "@hookform/devtools";
import { mainTitleStyle } from "@/constants/commonStyles";
import { Input } from "@/components/ui/input";

export default function NewProductPage() {
  const { devMode } = useDevModeContext();
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
  }); // WARNING > Problème de type sur categories

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

  const fileRef1 = form.register("file1");
  const fileRef2 = form.register("file2");
  const fileRef3 = form.register("file3");

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    const { title, location, price, categories } = values;
    const textInputs = { title, location, price, categories };

    const { file1, file2, file3 } = values;
    const files = { file1, file2, file3 };

    mutate({ textInputs, files });
  };

  return (
    <>
      <BackButton />
      <h1 className={mainTitleStyle}>Déposer une annonce</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 rounded-md border p-4 bg-secondary text-right w-full"
        >
          <FormField
            control={form.control}
            name="file1"
            render={() => {
              return (
                <FormItem>
                  <FormControl>
                    <Input type="file" {...fileRef1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="file2"
            render={() => {
              return (
                <FormItem>
                  <FormControl>
                    <Input type="file" {...fileRef2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="file3"
            render={() => {
              return (
                <FormItem>
                  <FormControl>
                    <Input type="file" {...fileRef3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

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
        {devMode && <DevTool control={form.control} />}
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
