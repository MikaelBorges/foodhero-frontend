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
import { useLoginUser } from "@/hooks/userHooks";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { useDevModeContext } from "@/contexts/devModeContext";
import { DevTool } from "@hookform/devtools";

export default function LoginPage() {
  const { devMode } = useDevModeContext();

  const { isPending, isError, mutate } = useLoginUser();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "jane.smith@gmail.com",
      password: "pA$$w0rD",
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
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    {...field}
                  />
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
        {devMode && <DevTool control={form.control} />}
      </Form>
      {isError && (
        <p className="text-red-500">Erreur, la connection a échoué.</p>
      )}
    </>
  );
}
