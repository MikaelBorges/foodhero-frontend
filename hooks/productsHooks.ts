import {
  createProduct,
  getCategories,
  getProducts,
  getUserProducts,
  getProductById,
  // deleteProduct,
} from "@/api/productsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

export const useGetProductById = () => {
  const { productId } = useParams();

  return useQuery({
    queryFn: () => getProductById(productId as string),
    queryKey: ["productId", productId],
  });
};

export const useGetUserProducts = () => {
  const { userId } = useParams();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

  return useQuery({
    queryFn: () => getUserProducts(userId as string, params),
    queryKey: ["userProducts", userId, params],
  });
};

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

type CreateProductParams = {
  title: string;
  location: string;
  price: string;
  category: string;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateProductParams) => createProduct(params),
    onSuccess: (productIdCreated) => {
      queryClient.setQueryData(["products"], productIdCreated);
    },
  });
};

/* export const useDeleteProduct = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(productId as string),
    onSuccess: (productIdDeleted) => {
      queryClient.setQueryData(["products"], productIdDeleted);
    },
  });
}; */
