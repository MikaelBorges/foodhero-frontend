import { filtersSchema } from "@/schemas/filtersSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type FilterValues = z.infer<typeof filtersSchema>;

export type CommonFilterProps = {
  control: UseFormReturn<FilterValues>["control"];
};
