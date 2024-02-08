import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ControlNewProductProps } from "@/types/formTypes";
import { Input } from "@/components/ui/input";

type InputTextNumberProps = ControlNewProductProps & {
  placeholder?: string;
  type?: string;
  name: string;
};

export function InputTextNumber({
  placeholder,
  type,
  name,
  control,
}: InputTextNumberProps) {
  return (
    <FormField
      control={control}
      name={name as "title" | "location" | "price"}
      render={({ field }) => (
        <FormItem className="w-full relative">
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              min={type === "number" ? 0 : undefined}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
