"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { Room } from "@/lib/types";
import { Suspense } from "react";

function RoomList() {
  const { data, isLoading, isError, refetch } = useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await fetch("/api/rooms");
      if (!res.ok) throw new Error("Erreur serveur");
      return res.json();
    },
  });

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-72 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
      ))}
    </div>
  );

  if (isError) return (
    <div className="text-center p-10 bg-red-50 text-red-600 rounded-xl">
      <p>Impossible de charger les chambres.</p>
      <button onClick={() => refetch()} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Réessayer</button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data?.map((room) => (
        <div key={room.id} className="border rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition">
          <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-lg">{room.name}</h3>
            <p className="text-slate-500">{room.capacity} personnes · {room.type}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-xl">{room.price}€ <span className="text-sm font-normal">/ nuit</span></span>
              <Link href={`/rooms/${room.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Voir</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Trouvez votre séjour idéal</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <RoomList />
      </Suspense>
    </div>
  );
}