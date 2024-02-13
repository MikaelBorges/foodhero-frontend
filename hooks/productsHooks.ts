import {
  createProduct,
  getCategories,
  getProducts,
  getUserProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "@/api/productsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

export const useGetProducts = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  if (!params.page) params.page = "1";
  if (!params.sort) params.sort = "desc";

  return useQuery({
    queryFn: () => getProducts(params),
    queryKey: ["products", params],
  });
};

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
  if (!params.page) params.page = "1";

  return useQuery({
    queryFn: () => getUserProducts(params, userId as string),
    queryKey: ["userProducts", params, userId],
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryFn: () => getCategories(),
    queryKey: ["categories"],
  });
};

type CreateProductParams = {
  title: string;
  location: string;
  price: string;
  categories: string[];
};

export const useDeleteProduct = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(productId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateProductParams) => createProduct(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateProductParams) =>
      updateProduct(params, productId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
