import { http, HttpResponse, delay } from "msw";

const rooms = [
  { id: "1", name: "Deluxe Suite", type: "Suite", price: 250, capacity: 2, status: "Available", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800" },
  { id: "2", name: "Standard Queen", type: "Standard", price: 120, capacity: 2, status: "Booked", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800" },
  { id: "3", name: "Family Room", type: "Family", price: 350, capacity: 4, status: "Occupied", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800" },
];

export const handlers = [
  http.get("/api/rooms", async () => {
    await delay(800); // Faux délai réseau pour les skeletons
    if (Math.random() < 0.1) return new HttpResponse(null, { status: 500 }); // 10% d'erreur
    return HttpResponse.json(rooms);
  }),
];