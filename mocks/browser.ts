import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// On stocke la promesse pour ne jamais relancer le worker s'il tourne déjà
let startPromise: ReturnType<typeof worker.start> | undefined;

export function startMockWorker() {
  if (!startPromise) {
    startPromise = worker.start({ onUnhandledRequest: "bypass" }).catch((error) => {
      // Si ça échoue, on réinitialise pour pouvoir réessayer
      startPromise = undefined;
      throw error;
    });
  }
  return startPromise;
}