"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { useDevModeContext } from "@/contexts/devModeContext";

export function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { devMode } = useDevModeContext();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devMode && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
