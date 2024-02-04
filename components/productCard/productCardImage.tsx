import Image from "next/image";

type CardImageProps = {
  imageUrl: string;
  imageAlt: string;
};

export function CardImage({ imageUrl, imageAlt }: CardImageProps) {
  return (
    <figure className="w-1/2 flex items-center min-w-[50%]">
      <Image
        className="object-cover h-full w-full"
        src={imageUrl}
        alt={imageAlt}
        width={100}
        height={100}
        priority
      />
    </figure>
  );
}
