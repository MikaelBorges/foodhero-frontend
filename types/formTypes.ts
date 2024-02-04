import { newProductSchema } from "@/schemas/newProductSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type ControlNewProductProps = {
  control: UseFormReturn<z.infer<typeof newProductSchema>>["control"];
};
