"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jsPDF } from "jspdf";

export default function CheckoutPage() {
  const { bookingCart, user, setBooking } = useAppStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!bookingCart) {
    return <div className="text-center p-10">Votre panier est vide. <button onClick={() => router.push("/")} className="text-blue-600 underline">Retour</button></div>;
  }

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Veuillez vous connecter en tant que Guest");
    
    setLoading(true);
    setTimeout(() => {
      // Génération de la facture PDF
      const doc = new jsPDF();
      doc.text("Facture HotelBook", 10, 10);
      doc.text(`Client: ${user.name}`, 10, 20);
      doc.text(`Chambre: ${bookingCart.room.name}`, 10, 30);
      doc.text(`Dates: ${bookingCart.checkIn} au ${bookingCart.checkOut}`, 10, 40);
      doc.text(`Total: ${bookingCart.total} EUR`, 10, 50);
      doc.save("facture.pdf");
      
      setLoading(false);
      setBooking(null); // Vider le panier
      alert("Paiement réussi ! Facture téléchargée.");
      router.push("/my-bookings");
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Paiement</h1>
      <div className="mb-6 bg-slate-50 p-4 rounded">
        <p><strong>Chambre:</strong> {bookingCart.room.name}</p>
        <p><strong>Du:</strong> {bookingCart.checkIn} <strong>Au:</strong> {bookingCart.checkOut}</p>
        <p className="text-xl font-bold mt-2">Total: {bookingCart.total.toFixed(2)} €</p>
      </div>
      
      <form onSubmit={handlePay} className="space-y-4">
        <div>
          <label className="block text-sm">Nom sur la carte</label>
          <input required type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Numéro de carte</label>
          <input required type="text" placeholder="4242 4242 4242 4242" className="w-full border p-2 rounded" />
        </div>
        <button disabled={loading} type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold disabled:opacity-50">
          {loading ? "Traitement en cours..." : "Payer et télécharger la facture"}
        </button>
      </form>
    </div>
  );
}