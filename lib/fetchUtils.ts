import { ProductRawType } from "@/types/productTypes";
import { ProductCardType } from "@/types/productTypes";

export const waitSeconds = async (seconds: number) => {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const usefullProductKeys = (
  product: ProductRawType
): ProductCardType => {
  return {
    _id: product._id,
    id: Number(product.idMeal),
    title: product.strMeal,
    description: product.strInstructions,
    price: product.price,
    categories: product.strCategory,
    image: product.strMealPreview,
    imageThumb: product.strMealThumb,
    location: product.location,
  };
};

export const usefullProductsKeys = (
  products: ProductRawType[]
): ProductCardType[] => {
  return products.map(usefullProductKeys);
};
