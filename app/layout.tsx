import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HotelBook — Plateforme de réservation",
  description: "Réservez votre séjour idéal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-white`}>
        <Providers>
          <Navbar />
          <main className="max-w-6xl mx-auto p-4 sm:p-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}