import { categories } from "@/types/productTypes";
import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .max(30, {
      message: "Maximum 30 caractères.",
    })
    .refine((data) => data !== "", {
      message: "Le titre est obligatoire.",
    }),
  location: z
    .string()
    .max(30, {
      message: "Maximum 30 caractères.",
    })
    .refine((data) => data !== "", {
      message: "La ville est obligatoire.",
    }),
  price: z.string().refine((data) => data !== "", {
    message: "Le prix est obligatoire.",
  }),
  categories: z.array(z.enum(categories)).refine((value) => value.length > 0, {
    message: "La propriété 'categories' est obligatoire.",
  }),
  // WARNING > Ceci provoque une erreur dans la console
  file1: z.instanceof(FileList).optional(),
  file2: z.instanceof(FileList).optional(),
  file3: z.instanceof(FileList).optional(),
});
