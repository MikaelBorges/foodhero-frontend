import { categories } from "@/types/productTypes";
import * as z from "zod";

export const filtersSchema = z.object({
  title: z.string().max(30, {
    message: "Maximum 30 caractères.",
  }),
  location: z.string().max(30, {
    message: "Maximum 30 caractères.",
  }),
  minPrice: z.string(),
  maxPrice: z.string(),
  sort: z
    .enum(["asc", "desc"])
    .refine((value) => ["asc", "desc"].includes(value)),
  //categories: z.array(z.string()),
  categories: z.array(z.enum(categories)),
});
