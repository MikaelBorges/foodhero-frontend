"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BackButton } from "@/components/buttons/backButton/backButton";
import Link from "next/link";
import { useGetProductById } from "@/hooks/productsHooks";
import { useGetPhoneById } from "@/hooks/userHooks";
import noImageLight from "@/assets/noImageProductLight.jpg";
import noImageDark from "@/assets/noImageProductDark.jpg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  MapContainer,
  TileLayer,
  //GeoJSON
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";

export default function ProductPage() {
  const [userId, setUserId] = useState<string>("");
  const { data, isLoading, isError } = useGetProductById();
  const {
    data: phone,
    isLoading: isLoadingPhone,
    isError: isErrorPhone,
  } = useGetPhoneById(userId);
  const [colorTheme, setColorTheme] = useState<string>("");
  const { theme } = useTheme();

  const style = () => {
    return {
      fillColor: "orange",
      weight: 1,
      opacity: 1,
      color: "#888",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const countries = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [48.89207, 2.2043814],
    },
    properties: {
      name: "Nanterre",
    },
  };

  useEffect(() => {
    if (theme === "dark") {
      setColorTheme("dark");
    } else if (theme === "light") {
      setColorTheme("light");
    } else if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setColorTheme("dark");
      } else {
        setColorTheme("light");
      }
    }
  }, [theme]);

  const noImageUrl = colorTheme == "dark" ? noImageDark : noImageLight;

  return (
    <>
      <BackButton />
      {data && !isLoading && !isError && (
        <>
          <Image
            src={data.product.imageThumb ? data.product.imageThumb : noImageUrl}
            alt={data.product.title}
            width={500}
            height={500}
            priority
          />
          <div className="text-start w-full space-y-2">
            <div className="space-x-1">
              {data.product.categories.map((category, index) => (
                <Badge
                  key={`${category}-${index}`}
                  className="truncate h-fit inline w-fit"
                >
                  {category}
                </Badge>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              {data.product.location}
            </p>
            <h1 className="text-xl font-semibold tracking-tight">
              {data.product.title}
            </h1>
          </div>
          <MapContainer center={[48.89207, 2.2043814]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <GeoJSON key={1} data={countries} style={() => style} /> */}
          </MapContainer>
          <div className="w-full">
            <Link
              className="underline"
              href={`/user/${data.user._id}/products`}
            >
              Annonces de {data.user.firstname}
            </Link>
          </div>
          <div className="flex flex-wrap w-full gap-2">
            {isErrorPhone ? (
              <p className="text-red-500">
                problème dans la récupération du n° de téléphone
              </p>
            ) : (
              <>
                {phone ? (
                  <a
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    href={`tel:${phone}`}
                  >
                    {phone}
                  </a>
                ) : (
                  <Button onClick={() => setUserId(data.user._id)}>
                    {isLoadingPhone && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>
                      {isLoadingPhone ? "Un instant" : "Voir le numéro"}
                    </span>
                  </Button>
                )}
              </>
            )}
            <Link href={`/product/${data.product._id}/update`}>
              <Button variant="secondary">Modifier</Button>
            </Link>
            <Link href={`/product/${data.product._id}/delete`}>
              <Button variant="destructive">Supprimer</Button>
            </Link>
          </div>
        </>
      )}
      {isLoading && <Loader2 className="animate-spin" />}
      {isError && <p className="text-red-500">Le produit n&apos;existe pas</p>}
    </>
  );
}
