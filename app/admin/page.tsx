"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const data = [
  { name: "Lun", revenue: 4000, occupancy: 60 },
  { name: "Mar", revenue: 3000, occupancy: 55 },
  { name: "Mer", revenue: 2000, occupancy: 40 },
  { name: "Jeu", revenue: 2780, occupancy: 70 },
  { name: "Ven", revenue: 1890, occupancy: 80 },
  { name: "Sam", revenue: 2390, occupancy: 95 },
  { name: "Dim", revenue: 3490, occupancy: 85 },
];

export default function AdminPage() {
  const { user } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "Admin") router.push("/");
  }, [user, router]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="font-bold mb-4">Revenus Hebdomadaires (€)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h2 className="font-bold mb-4">Taux d'occupation (%)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="occupancy" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}