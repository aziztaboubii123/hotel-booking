"use client";

import { useState, Suspense } from "react"; // ← Ajout de Suspense
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { calculateTotal } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

// 1. On renomme le composant principal en RoomDetailsContent
function RoomDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const setBooking = useAppStore((s) => s.setBooking);
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const { data: room, isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      return data.find((r: any) => r.id === id);
    },
  });

  if (isLoading) return <div className="h-96 bg-slate-200 rounded-xl animate-pulse" />;
  if (!room) return <div>Chambre introuvable</div>;

  const total = calculateTotal(new Date(checkIn), new Date(checkOut), room.price);

  const handleBook = () => {
    if (!checkIn || !checkOut || total === 0) return alert("Dates invalides");
    setBooking({ room, checkIn, checkOut, total });
    router.push("/checkout");
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img src={room.image} alt={room.name} className="w-full rounded-xl object-cover h-[400px]" />
      <div>
        <h1 className="text-3xl font-bold">{room.name}</h1>
        <p className="text-xl text-blue-600 font-bold mt-2">{room.price}€ / nuit</p>
        <p className="mt-4 text-slate-600">Une chambre magnifique avec vue imprenable. Idéale pour se détendre.</p>
        
        <div className="mt-8 border-t pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Date d'arrivée</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border p-2 rounded mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Date de départ</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border p-2 rounded mt-1" />
          </div>
          
          <div className="bg-slate-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-semibold">Total (Taxes incl.)</span>
            <span className="text-2xl font-bold text-green-600">{total.toFixed(2)} €</span>
          </div>
          
          <button onClick={handleBook} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
            Réserver maintenant
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. On crée le composant par défaut qui enveloppe le tout dans Suspense
export default function RoomDetailsPage() {
  return (
    <Suspense fallback={<div className="text-center p-20 text-slate-500">Chargement des détails...</div>}>
      <RoomDetailsContent />
    </Suspense>
  );
}