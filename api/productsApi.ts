import { API_URL } from "@/constants/endPoints";
import type { ProductCardType } from "@/types/productTypes";
import { waitSeconds } from "@/lib/fetchUtils";

type ProductType = {
  _id: string;
  userId: string;
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  price: number;
  strMealPreview: string;
  location: string;
};

type GetProductsType = {
  totalProducts: number;
  products: ProductCardType[];
};

type ParamsType = {
  title?: string;
  location?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  categories?: string;
  page?: string;
};

type ResponseProducts = {
  totalProducts: number;
  productsRaw: ProductType[];
};

export const getProducts = async (
  params: ParamsType
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

export const getUserProducts = async (userId: string) => {
  await waitSeconds(1);
  const promise = await fetch(`${API_URL}/products/user/${userId}`);
  const response = await promise.json();
  const { totalProducts, productsRaw, firstname } = response;
  const products = usefullProductsKeys(productsRaw);
  return { totalProducts, products, firstname };
};

const usefullProductKeys = (product: ProductType): ProductCardType => {
  return {
    _id: product._id,
    id: Number(product.idMeal),
    title: product.strMeal,
    price: product.price,
    category: product.strCategory,
    image: product.strMealPreview,
    imageThumb: product.strMealThumb,
    location: product.location,
  };
};

const usefullProductsKeys = (products: ProductType[]): ProductCardType[] => {
  return products.map(usefullProductKeys);
};

export const getProductById = async (productId: string) => {
  await waitSeconds(1);
  const response = await fetch(`${API_URL}/product/${productId}`);
  const productRaw: any = await response.json();
  const { user } = productRaw;
  const product = usefullProductKeys(productRaw);
  return { product, user };
};

type Categories =
  | "Seafood"
  | "Beef"
  | "Miscellaneous"
  | "Lamb"
  | "Chicken"
  | "Vegetarian"
  | "Pork"
  | "Pasta"
  | "Dessert"
  | "Starter"
  | "Breakfast"
  | "Side"
  | "Vegan"
  | "Goat";

export const getCategories = async (): Promise<Categories[]> => {
  await waitSeconds(1);
  const response = await fetch(`${API_URL}/products/categories`);
  return await response.json();
};

export const deleteProduct = async (productId: string) => {
  await waitSeconds(1);
  const promise = await fetch(`${API_URL}/product/delete/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const productIdDeleted: number = await promise.json();
  return productIdDeleted;
};

export const createProduct = async (params: any) => {
  await waitSeconds(1);
  params.userId = "65bfa48aa82dcb1961c7f5e2";
  const urlSearchParams = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const queryParams = urlSearchParams ? `?${urlSearchParams}` : "";
  const promise = await fetch(`${API_URL}/product/new${queryParams}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const productIdCreated: number = await promise.json();
  return productIdCreated;
};

export const updateProduct = async (params: any, productId: string) => {
  await waitSeconds(1);
  const urlSearchParams = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const promise = await fetch(
    `${API_URL}/product/update/${productId}?${urlSearchParams}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );
  const productUpdated: number = await promise.json();
  return productUpdated;
};
