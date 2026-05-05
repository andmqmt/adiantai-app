import { animalApi, farmApi } from "@/services/api";
import { createLivestockConnection } from "@/services/signalr";
import type { Animal, Farm } from "@/types";
import type { HubConnection } from "@microsoft/signalr";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLivestockStore = defineStore("livestock", () => {
  const farms = ref<Farm[]>([]);
  const selectedFarm = ref<Farm | null>(null);
  const animals = ref<Map<string, Animal>>(new Map());
  const isConnected = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  let connection: HubConnection | null = null;

  const animalList = computed(() => Array.from(animals.value.values()));

  const statusCounts = computed(() => {
    const counts = { Grazing: 0, Resting: 0, Moving: 0, Alert: 0 };
    animalList.value.forEach((a) => {
      const key = ["Grazing", "Resting", "Moving", "Alert"][
        a.status
      ] as keyof typeof counts;
      counts[key]++;
    });
    return counts;
  });

  async function loadFarms() {
    try {
      isLoading.value = true;
      farms.value = await farmApi.getAll();
    } catch (e) {
      error.value = "Falha ao carregar fazendas";
    } finally {
      isLoading.value = false;
    }
  }

  async function selectFarm(farm: Farm) {
    selectedFarm.value = farm;
    animals.value.clear();

    try {
      const list = await animalApi.getByFarm(farm.id);
      list.forEach((a) => animals.value.set(a.id, a));
    } catch {
      error.value = "Falha ao carregar animais";
    }

    await connectToFarm(farm.id);
  }

  async function connectToFarm(farmId: string) {
    if (connection) {
      await connection.stop();
    }

    connection = createLivestockConnection();

    connection.on("PositionUpdate", (updatedAnimals: Animal[]) => {
      updatedAnimals.forEach((a) => animals.value.set(a.id, { ...a }));
    });

    connection.onreconnected(() => {
      isConnected.value = true;
      connection?.invoke("JoinFarm", farmId);
    });

    connection.onclose(() => {
      isConnected.value = false;
    });

    try {
      await connection.start();
      await connection.invoke("JoinFarm", farmId);
      isConnected.value = true;
    } catch {
      error.value = "Falha ao conectar ao servidor em tempo real";
      isConnected.value = false;
    }
  }

  async function disconnect() {
    if (connection) {
      await connection.stop();
      connection = null;
    }
  }

  return {
    farms,
    selectedFarm,
    animals,
    animalList,
    statusCounts,
    isConnected,
    isLoading,
    error,
    loadFarms,
    selectFarm,
    disconnect,
  };
});
