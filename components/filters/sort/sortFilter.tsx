import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CommonFilterProps } from "@/types/filterTypes";

type Sorts = "desc" | "asc";

type PriceItem = {
  value: Sorts;
  label: string;
};

const sorts: PriceItem[] = [
  {
    value: "desc",
    label: "Plus récents",
  },
  {
    value: "asc",
    label: "Plus anciens",
  },
];

export function SortFilter({ control }: CommonFilterProps) {
  return (
    <FormField
      control={control}
      name="sort"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              key={Date.now()} // TRICK : Pour forcer le reset d'un radio coché
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-wrap space-y-0 gap-3"
            >
              {sorts.map(({ value, label }, index) => (
                <FormItem
                  key={`${value}-${index}`}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    {label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
