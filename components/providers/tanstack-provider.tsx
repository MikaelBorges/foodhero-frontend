"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { DevModeContext } from "@/contexts/devModeContext";
import { useContext } from "react";

export function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const devModeCtx = useContext(DevModeContext);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devModeCtx.devMode && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
