export type Role = "Guest" | "Receptionist" | "Admin";

export type User = {
  id: string;
  name: string;
  role: Role;
};

export type Room = {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  status: "Available" | "Booked" | "Occupied" | "Cleaning";
  image: string;
};

export type Booking = {
  id: string;
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  total: number;
  status: "Confirmed" | "CheckedIn" | "Completed";
};