"use client";
import { ToDoList } from "@/components/toDoList/toDoList";
import { Filters } from "@/components/filters/filters";
import { ProductList } from "@/components/productList/productList";
import { useDevModeContext } from "@/contexts/devModeContext";
import { mainTitleStyle } from "@/constants/commonStyles";

export default function RootPage() {
  const { devMode } = useDevModeContext();

  return (
    <>
      {devMode && <ToDoList />}
      <h1 className={`${mainTitleStyle} text-center`}>
        Rechercher un repas, un dessert...
      </h1>
      <Filters />
      <ProductList />
    </>
  );
}
