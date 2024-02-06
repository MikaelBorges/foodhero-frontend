"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@/config/numeralConfig";
import { cn } from "@/lib/utils";
import { ProductCardType } from "@/types/productTypes";
import numeral from "numeral";
import { CardImage } from "./productCardImage";
import Link from "next/link";

type CardProps = React.ComponentProps<typeof Card>;

type ProductCardProps = {
  product: ProductCardType;
} & CardProps;

export function ProductCard({
  product,
  className,
  ...props
}: ProductCardProps) {
  const { title, price: rawPrice, image, category, location, _id } = product;
  const price = numeral(rawPrice).format("0,0.00");

  return (
    <Link href={`/product/${_id}`} className="w-full">
      <Card
        className={cn("bg-secondary flex overflow-hidden h-40", className)}
        {...props}
      >
        {image && <CardImage imageUrl={image} imageAlt={title} />}
        <CardContent className="p-0 flex flex-col justify-between w-full">
          <CardHeader className="p-4 pb-0">
            <Badge className="truncate h-fit inline w-fit">{category}</Badge>
            <CardDescription className="text-xs truncate">
              {location}
            </CardDescription>
          </CardHeader>
          <CardTitle className="break-words text-md line-clamp-2 px-4">
            {title}
          </CardTitle>
          <CardFooter className="p-4 pt-0 justify-end text-sm">
            {`${price} €`}
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
}
