import type { Categories } from "@/api/productsApi";

export type ProductCardType = {
  _id: string;
  id: number;
  title: string;
  description: string;
  price: number;
  categories: Categories[];
  image: string;
  imageThumb: string;
  location: string;
};
