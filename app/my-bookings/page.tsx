"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyBookingsPage() {
  const { user } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "Guest") router.push("/");
  }, [user, router]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mes Réservations</h1>
      <div className="bg-white p-6 rounded-xl border">
        <p>Aucune réservation active pour le moment.</p>
        <p className="text-sm text-slate-500 mt-2">(Vous pouvez en créer une depuis la page d'accueil)</p>
      </div>
    </div>
  );
}