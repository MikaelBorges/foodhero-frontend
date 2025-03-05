export const categories = [
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
] as const;

export type CategoriesType = (typeof categories)[number];

export type ProductRawType = {
  _id: string;
  userId: string;
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: CategoriesType[];
  strArea: string;
  strInstructions: string;
  strMealThumb: string[];
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

export type ProductCardType = {
  _id: string;
  id: number;
  title: string;
  description: string;
  price: number;
  categories: CategoriesType[];
  image: string;
  imageThumb: string[];
  location: string;
};

export type ProductType = {
  categories: CategoriesType[];
  location: string;
  price: string;
  title: string;
  images?: string[];
};

export type FilesType = {
  file1?: FileList | undefined;
  file2?: FileList | undefined;
  file3?: FileList | undefined;
};
