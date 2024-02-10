import { DevMode } from "@/components/devMode/devMode";
import { Filters } from "@/components/filters/filters";
import { ProductList } from "@/components/productList/productList";

export default function RootPage() {
  const isDevMode = process.env.NEXT_PUBLIC_ENV === "dev";

  return (
    <>
      {isDevMode ? (
        <DevMode />
      ) : (
        <h1 className="text-xl font-semibold tracking-tight text-center">
          Cuisine entre particuliers
        </h1>
      )}
      <Filters />
      <ProductList />
    </>
  );
}
