import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommonFilterProps } from "@/types/filterTypes";

type Prices = "minPrice" | "maxPrice";

type PriceItem = {
  name: Prices;
  placeholder: string;
};

const prices: PriceItem[] = [
  {
    name: "minPrice",
    placeholder: "Prix min",
  },
  {
    name: "maxPrice",
    placeholder: "Prix max",
  },
];

export function PricesFilter({ control }: CommonFilterProps) {
  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        {prices.map(({ name, placeholder }, index) => (
          <div key={`${name}-${index}`} className="flex flex-col gap-2">
            <FormField
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder={placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
