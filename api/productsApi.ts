import { API_URL } from "@/constants/endPoints";
import type {
  CategoriesType,
  FilesType,
  ProductCardType,
  ProductRawType,
  ProductType,
} from "@/types/productTypes";
import {
  usefullProductKeys,
  usefullProductsKeys,
  waitSeconds,
} from "@/lib/fetchUtils";
import {
  createImagesUrls,
  createProductId,
  patchImagesUrls,
} from "./products/create/createProductsApi";

type GetProductsParamsType = {
  title?: string;
  location?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  categories?: string;
  page?: string;
};

type GetProductsType = {
  totalProducts: number;
  products: ProductCardType[];
};

type ResponseProducts = {
  totalProducts: number;
  productsRaw: ProductRawType[];
};

export const getProducts = async (
  params: GetProductsParamsType
): Promise<GetProductsType> => {
  await waitSeconds(1);
  const urlSearchParams = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const queryParams = urlSearchParams ? `?${urlSearchParams}` : "";
  const promise = await fetch(`${API_URL}/products${queryParams}`);
  const response: ResponseProducts = await promise.json();
  const { totalProducts, productsRaw } = response;
  const products = usefullProductsKeys(productsRaw);
  return { totalProducts, products };
};

export const getCategories = async (): Promise<CategoriesType[]> => {
  await waitSeconds(1);
  const promise = await fetch(`${API_URL}/products/categories`);
  const response: CategoriesType[] = await promise.json();
  return response;
};

type GetUserProductsParamsType = {
  page?: string;
};

type GetUserProductsType = GetProductsType & {
  firstname: string;
};

type ProductsWithFirstNameResponse = ResponseProducts & {
  firstname: string;
};

export const getUserProducts = async (
  params: GetUserProductsParamsType,
  userId: string
): Promise<GetUserProductsType> => {
  await waitSeconds(1);
  const urlSearchParams = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const queryParams = urlSearchParams ? `?${urlSearchParams}` : "";
  const promise = await fetch(
    `${API_URL}/products/user/${userId}${queryParams}`
  );
  const response: ProductsWithFirstNameResponse = await promise.json();
  const { totalProducts, productsRaw, firstname } = response;
  const products = usefullProductsKeys(productsRaw);
  return { totalProducts, products, firstname };
};

type UserType = { firstname: string; _id: string };

type GetProductIdType = {
  product: ProductCardType;
  user: UserType;
};

type ProductRawWithUserResponse = ProductRawType & {
  user: UserType;
};

export const getProductById = async (
  productId: string
): Promise<GetProductIdType> => {
  await waitSeconds(1);
  const response = await fetch(`${API_URL}/product/${productId}`);
  const productRaw: ProductRawWithUserResponse = await response.json();
  const { user } = productRaw;
  const product = usefullProductKeys(productRaw);
  return { product, user };
};

export const deleteProduct = async (productId: string): Promise<number> => {
  await waitSeconds(1);
  const response = await fetch(`${API_URL}/product/delete/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const productIdDeleted: number = await response.json();
  return productIdDeleted;
};

type CreateProductParams = ProductType & {
  userId?: string;
};

export const createProduct = async (
  textInputs: ProductType,
  files: FilesType
): Promise<number> => {
  const productIdCreated: number = await createProductId(textInputs);

  const isAnyFile = Object.values(files).some(
    (fileList) => fileList instanceof FileList && fileList.length > 0
  );

  if (isAnyFile) {
    const urls: string[] = await createImagesUrls(files);
    await patchImagesUrls(urls, productIdCreated);
  }

  /* params.images = ["yes"];
  if (params.images.length) {
    const urls: string[] = await createImagesUrls(params.images);
    await patchImagesUrls(
      urls,
      productIdCreated
    );
  } */

  return productIdCreated;
};

export const updateProduct = async (
  params: ProductType,
  productId: string
): Promise<ProductType> => {
  await waitSeconds(1);
  const urlSearchParams = new URLSearchParams(
    params as unknown as Record<string, string>
  ).toString();
  const promise = await fetch(
    `${API_URL}/product/update/${productId}?${urlSearchParams}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );
  const productUpdated: ProductType = await promise.json();
  return productUpdated;
};
