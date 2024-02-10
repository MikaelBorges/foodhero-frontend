import { z } from "zod";

const knownCategories = [
  "Seafood",
  "Beef",
  "Miscellaneous",
  "Lamb",
  "Chicken",
  "Vegetarian",
  "Pork",
  "Pasta",
  "Dessert",
  "Starter",
  "Breakfast",
  "Side",
  "Vegan",
  "Goat",
];

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
  categories: z.array(z.string()).refine((value) => value.length > 0, {
    message: "La propriété 'categories' est obligatoire.",
  }),
});
