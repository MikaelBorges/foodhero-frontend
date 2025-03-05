import { API_URL } from "@/constants/endPoints";
import { waitSeconds } from "@/lib/fetchUtils";
import { ProductType } from "@/types/productTypes";

type CreateProductParams = ProductType & {
  userId?: string;
};

export const createProductId = async (
  params: CreateProductParams
): Promise<number> => {
  await waitSeconds(1);
  params.userId = "65bfa48aa82dcb1961c7f5e2";
  const urlSearchParams = new URLSearchParams(
    params as unknown as Record<string, string>
  ).toString();
  const queryParams = urlSearchParams ? `?${urlSearchParams}` : "";
  const response = await fetch(`${API_URL}/product/new${queryParams}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const productIdCreated: number = await response.json();
  return productIdCreated;
};

export const createImagesUrls = async (files: any) => {
  // réduire la taille de la 1ere image et la mettre dans un dossier preview
  // prendre les 3 images et obtenir leurs url

  console.log("files", files);

  return [
    "https://locavor.fr/data/produits/4/92093/92093-flan-nature-1.jpg",
    "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg,t_recipe-256/flan-dab977.jpg",
    "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg,t_recipe-256/flan-63e48a8dce4017ca2c39ee6f.jpg",
  ];
};

export const patchImagesUrls = async (urls: string[], productId: number) => {
  // prendre la 1ere image
  // et la mettre dans strMealPreview

  // prendre toutes les images
  // et les mettre dans strMealThumb

  await fetch(`${API_URL}/product/updateImages/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ images: urls }),
  });

  return [
    "https://locavor.fr/data/produits/4/92093/92093-flan-nature-1.jpg",
    "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg,t_recipe-256/flan-dab977.jpg",
    "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg,t_recipe-256/flan-63e48a8dce4017ca2c39ee6f.jpg",
  ];
};
