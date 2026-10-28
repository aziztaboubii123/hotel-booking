"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } }
  }));

  useEffect(() => {
    // Import dynamique pour éviter les erreurs de build côté serveur
    const initMsw = async () => {
      if (typeof window !== "undefined") {
        const { startMockWorker } = await import("@/mocks/browser");
        await startMockWorker();
      }
    };
    initMsw();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}