import { z } from "zod";

export const newProductSchema = z.object({
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
  category: z.string().refine((data) => data !== "", {
    message: "La catégorie est obligatoire.",
  }),
});
