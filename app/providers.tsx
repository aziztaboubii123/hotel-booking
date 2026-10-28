"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } }
  }));

  useEffect(() => {
    if (typeof window !== "undefined") {
      // On utilise notre fonction sécurisée au lieu de worker.start() directement
      const { startMockWorker } = require("@/mocks/browser");
      startMockWorker();
    }
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}