import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Role, Room } from "./types";

interface AppState {
  user: User | null;
  bookingCart: { room: Room; checkIn: string; checkOut: string; total: number } | null;
  login: (role: Role) => void;
  logout: () => void;
  setBooking: (cart: AppState["bookingCart"]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      bookingCart: null,
      login: (role) => set({ user: { id: "1", name: "Jean Dupont", role } }),
      logout: () => set({ user: null, bookingCart: null }),
      setBooking: (cart) => set({ bookingCart: cart }),
    }),
    { name: "hotel-storage" }
  )
);