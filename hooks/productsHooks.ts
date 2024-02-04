import {
  CreateProductParams,
  createProduct,
  getCategories,
  getProducts,
} from "@/api/productsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetProducts = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  return useQuery({
    queryFn: () => getProducts(params),
    queryKey: ["products", params],
  });
};

export const useGetCategories = () =>
  useQuery({
    queryFn: () => getCategories(),
    queryKey: ["categories"],
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  /* const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  console.log("useCreateProduct");
  console.log("params", params);
  console.log("longueur", Object.keys(params).length); */

  return useMutation({
    mutationFn: (params: CreateProductParams) => createProduct(params),
    onSuccess: (result) => {
      queryClient.setQueryData(["products"], result);
    },
  });
};
