import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommonFilterProps } from "@/types/filterTypes";

export function LocationFilter({ control }: CommonFilterProps) {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem className="w-3/4">
          <FormControl>
            <Input placeholder="Ville" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
