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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUpdateUser } from "@/hooks/userHooks";
import { BackButton } from "@/components/buttons/backButton/backButton";
import { updateSchema } from "@/schemas/userSchemas";
import { useDevModeContext } from "@/contexts/devModeContext";
import { DevTool } from "@hookform/devtools";

export default function RegisterPage() {
  const { devMode } = useDevModeContext();
  const { isSuccess, isPending, isError, mutate } = useUpdateUser();

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      email: "jane.smith@gmail.com",
      firstname: "Janet",
      lastname: "Tears",
      phone: "06 07 08 09 10",
      password: "pA$$w0rD",
    },
  });

  const onSubmit = (values: z.infer<typeof updateSchema>) => mutate(values);

  return (
    <>
      <BackButton />
      <h1 className="text-xl font-semibold tracking-tight">
        Modifier mon compte
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de famille</FormLabel>
                <FormControl>
                  <Input placeholder="nom de famille" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>N° de téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="n° de téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button
            type="submit"
            variant="secondary"
            disabled={isPending || isSuccess}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>
              {isPending ? "Un instant" : "Valider les modifications"}
            </span>
          </Button>
        </form>
        {devMode && <DevTool control={form.control} />}
      </Form>
      {isError && (
        <p className="text-red-500">La modification de compte a échoué.</p>
      )}
      {isSuccess && (
        <p className="text-green-500 text-center">Compte bien modifié</p>
      )}
    </>
  );
}
