"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const isDevMode = process.env.NEXT_PUBLIC_ENV === "dev";

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDevMode && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
