import { Filters } from "@/components/filters/filters";
import { ProductList } from "@/components/productList/productList";

export default function RootPage() {
  return (
    <>
      <Filters />
      <ProductList />
    </>
  );
}
