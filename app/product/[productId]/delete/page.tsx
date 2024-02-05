"use client";
import { useParams } from "next/navigation";

export default function DeleteProductPage() {
  const { id } = useParams();
  console.log("id", id);

  return <div>DeleteProductPage</div>;
}
