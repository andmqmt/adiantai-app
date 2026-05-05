import type { Animal, Farm } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const farmApi = {
  getAll: () => get<Farm[]>("/api/farms"),
  getById: (id: string) => get<Farm>(`/api/farms/${id}`),
};

export const animalApi = {
  getByFarm: (farmId: string) => get<Animal[]>(`/api/animals/farm/${farmId}`),
};
