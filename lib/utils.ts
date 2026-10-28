import { differenceInDays, isBefore, startOfToday } from "date-fns";

// 1. Empêcher les dates passées
export const isPastDate = (date: Date) => isBefore(date, startOfToday());

// 2. Calculer le prix en direct
export const calculateTotal = (checkIn: Date | null, checkOut: Date | null, ratePerNight: number) => {
  if (!checkIn || !checkOut || isBefore(checkOut, checkIn)) return 0;
  const nights = differenceInDays(checkOut, checkIn);
  if (nights === 0) return 0;
  const subtotal = nights * ratePerNight;
  const tax = subtotal * 0.1; // 10% de taxe
  return subtotal + tax;
};