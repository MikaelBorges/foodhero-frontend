"use client";
import { ToDoList } from "@/components/toDoList/toDoList";
import { Filters } from "@/components/filters/filters";
import { ProductList } from "@/components/productList/productList";
import { useDevModeContext } from "@/contexts/devModeContext";

export default function RootPage() {
  const { devMode } = useDevModeContext();

  return (
    <>
      {devMode && <ToDoList />}
      <h1 className="text-xl font-semibold tracking-tight text-center">
        Rechercher un repas, un dessert...
      </h1>
      <Filters />
      <ProductList />
    </>
  );
}
