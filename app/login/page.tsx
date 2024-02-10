"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useConnectUser } from "@/hooks/userHooks";
import { BackButton } from "@/components/buttons/backButton/backButton";

export default function LoginPage() {
  const { data, isPending, isError, mutate } = useConnectUser();
  if (data) console.log("data", data);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "john.doe@gmail.com",
      password: "1234",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => mutate(values);

  return (
    <>
      <BackButton />
      <h1 className="text-xl font-semibold tracking-tight">Se connecter</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input placeholder="Mot de passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="secondary" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>{isPending ? "Un instant" : "Se connecter"}</span>
          </Button>
        </form>
      </Form>
      {isError && (
        <p className="text-red-500">Erreur, la connection a échoué.</p>
      )}
    </>
  );
}
