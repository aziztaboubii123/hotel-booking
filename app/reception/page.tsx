"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReceptionPage() {
  const { user } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "Receptionist") router.push("/");
  }, [user, router]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel Réception</h1>
      <div className="grid gap-4">
        <div className="bg-white p-4 border rounded-xl flex justify-between items-center">
          <div>
            <p className="font-bold">Chambre 101 - Jean Dupont</p>
            <p className="text-sm text-slate-500">Statut: <span className="text-orange-500 font-bold">Booked</span></p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Faire le Check-in</button>
        </div>
      </div>
    </div>
  );
}