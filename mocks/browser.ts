import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

let isStarted = false;

export async function startMockWorker() {
  if (typeof window !== "undefined" && !isStarted) {
    isStarted = true;
    // Le "as any" force TypeScript à ignorer l'erreur de typage stricte
    await worker.start({
      onUnhandledRequest: "bypass",
    } as any);
  }
}