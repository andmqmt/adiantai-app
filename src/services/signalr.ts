import type { Animal } from "@/types";
import * as signalR from "@microsoft/signalr";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export function createLivestockConnection() {
  return new signalR.HubConnectionBuilder()
    .withUrl(`${BASE_URL}/hubs/livestock`)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Warning)
    .build();
}

export type PositionUpdateHandler = (animals: Animal[]) => void;
