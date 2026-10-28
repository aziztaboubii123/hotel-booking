"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Moon, Sun, LogOut, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { user, login, logout } = useAppStore();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <nav className="border-b bg-white dark:bg-slate-900 p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl text-blue-600">HotelBook</Link>
      
      <div className="flex gap-4 items-center">
        {!user ? (
          <select onChange={(e) => login(e.target.value as any)} className="border p-2 rounded">
            <option value="">Se connecter en tant que...</option>
            <option value="Guest">Guest</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Admin">Admin</option>
          </select>
        ) : (
          <>
            {user.role === "Guest" && <Link href="/my-bookings">Mes Réservations</Link>}
            {user.role === "Receptionist" && <Link href="/reception">Accueil</Link>}
            {user.role === "Admin" && <Link href="/admin">Dashboard</Link>}
            
            <span className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 rounded-full">
              <UserIcon size={14} /> {user.name} ({user.role})
            </span>
            <button onClick={logout} className="text-red-500"><LogOut size={20} /></button>
          </>
        )}
        
        <button onClick={() => setDark(!dark)} className="p-2">
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}