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
import { newProductSchema } from "@/schemas/newProductSchema";
//import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { removeEmptyValues } from "@/lib/formUtils";
import { InputTextNumber } from "@/components/inputTextNumber/inputTextNumber";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";

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

  const form = useForm<z.infer<typeof newProductSchema>>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      title: params.title ? params.title : "",
      location: params.location ? params.location : "",
      price: params.price ? params.price : "",
      category: params.category ? params.category : "",
    },
  });

  const onSubmit = (values: z.infer<typeof newProductSchema>) => {
    const usefulValues: any = removeEmptyValues(values);
    mutate(usefulValues);
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

  return (
    <>
      <BackButton />
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

          {(isErrorCategories || isErrorCreateProduct) && (
            <p className="text-red-500 text-center">
              Problème dans la soumission de l&apos;annonce
            </p>
          )}

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

      {isSuccessCreateProduct && (
        <p className="text-green-500 text-center">Annonce bien soumise</p>
      )}
    </>
  );
}
