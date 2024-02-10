import {
  createProduct,
  getCategories,
  getProducts,
  getUserProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  Categories,
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

  return useQuery({
    queryFn: () => getUserProducts(userId as string),
    queryKey: ["userProducts", userId],
  });
};

export const useGetProducts = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  if (!Object.keys(params).length) params.sort = "desc";

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
