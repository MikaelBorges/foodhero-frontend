"use client";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/constants/endPoints";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;

  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState();
  const [product, setProduct] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProductById = async (id: any) => {
      const promise = await fetch(`${API_URL}/product/${id}`);
      const response: any = await promise.json();

      setFirstname(response.userId.firstname);
      delete response.userId;
      setProduct(response);
    };

    getProductById(id);
  }, [id]);

  const getPhone = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setPhone("06 07 08 08 10");
  };

  return (
    <>
      <BackButton />
      <h1>ProductPage</h1>

      {product && (
        <div className="flex">
          <div className="w-2/3">
            <p>product category {product.strCategory}</p>
            <p>product location {product.location}</p>
            <p>product title {product.strMeal}</p>
            {product.strMealThumb && (
              <Image
                width={300}
                height={300}
                priority
                src={product.strMealThumb}
                alt={product.strMeal}
              />
            )}
            <p>product price {product.price}</p>
          </div>
          <div className="w-1/3">
            <p>user name {firstname}</p>
            {phone ? (
              <a
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                href={`tel:${phone}`}
              >
                {phone}
              </a>
            ) : (
              <Button onClick={() => getPhone()}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span>{isLoading ? "Un instant" : "Voir le numéro"}</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
