import { productSchema } from "@/schemas/productSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type ControlNewProductProps = {
  control: UseFormReturn<z.infer<typeof productSchema>>["control"];
};
