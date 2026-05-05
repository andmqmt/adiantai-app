<template>
  <div class="farm-map" ref="mapContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Animal, Farm } from "@/types";
import { AnimalStatus } from "@/types";

const props = defineProps<{
  farm: Farm;
  animals: Animal[];
}>();

let map: L.Map | null = null;
const markers = new Map<string, L.CircleMarker>();
const mapContainer = ref<HTMLDivElement | null>(null);

import { ref } from "vue";

const statusColor: Record<AnimalStatus, string> = {
  [AnimalStatus.Grazing]: "#22c55e",
  [AnimalStatus.Resting]: "#3b82f6",
  [AnimalStatus.Moving]: "#f59e0b",
  [AnimalStatus.Alert]: "#ef4444",
};

function initMap() {
  if (!mapContainer.value) return;

  map = L.map(mapContainer.value, {
    center: [props.farm.centerLat, props.farm.centerLon],
    zoom: 15,
    zoomControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Draw farm boundary
  const bounds: L.LatLngBoundsExpression = [
    [props.farm.southWestLat, props.farm.southWestLon],
    [props.farm.northEastLat, props.farm.northEastLon],
  ];
  L.rectangle(bounds, {
    color: "#16a34a",
    weight: 2,
    fillOpacity: 0.05,
    dashArray: "6,4",
  }).addTo(map);
}

function upsertMarker(animal: Animal) {
  if (!map) return;

  const color = statusColor[animal.status];
  const latlng: L.LatLngExpression = [animal.latitude, animal.longitude];

  if (markers.has(animal.id)) {
    const marker = markers.get(animal.id)!;
    marker.setLatLng(latlng);
    marker.setStyle({ fillColor: color, color });
    marker.getTooltip()?.setContent(tooltipContent(animal));
  } else {
    const marker = L.circleMarker(latlng, {
      radius: 7,
      fillColor: color,
      color,
      weight: 1.5,
      fillOpacity: 0.9,
    }).addTo(map);

    marker.bindTooltip(tooltipContent(animal), {
      permanent: false,
      direction: "top",
      className: "animal-tooltip",
    });

    markers.set(animal.id, marker);
  }
}

function tooltipContent(animal: Animal): string {
  const statusLabel = ["Pastando", "Descansando", "Movendo", "Alerta"][
    animal.status
  ];
  return `<strong>${animal.name}</strong><br>Tag: ${animal.tag}<br>Raça: ${animal.breed}<br>Status: ${statusLabel}`;
}

onMounted(() => {
  initMap();
  props.animals.forEach(upsertMarker);
});

onUnmounted(() => {
  map?.remove();
  map = null;
  markers.clear();
});

watch(
  () => props.animals,
  (newAnimals) => {
    newAnimals.forEach(upsertMarker);
  },
  { deep: true },
);
</script>

<style scoped>
.farm-map {
  width: 100%;
  height: 100%;
  min-height: 500px;
  border-radius: 12px;
  overflow: hidden;
}
</style>
