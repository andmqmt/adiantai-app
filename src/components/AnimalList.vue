<template>
  <div class="animal-list">
    <div
      v-for="animal in animals"
      :key="animal.id"
      class="animal-row"
      :class="statusClass(animal.status)"
    >
      <span class="animal-tag">{{ animal.tag }}</span>
      <div class="animal-main">
        <span class="animal-name">{{ animal.name }}</span>
        <span class="animal-breed">{{ animal.breed }}</span>
      </div>
      <span class="status-badge">{{ statusLabel(animal.status) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AnimalStatus, type Animal } from "@/types";

defineProps<{ animals: Animal[] }>();

function statusLabel(status: AnimalStatus): string {
  const labels: Record<AnimalStatus, string> = {
    [AnimalStatus.Grazing]: "Pastando",
    [AnimalStatus.Resting]: "Descansando",
    [AnimalStatus.Moving]: "Movendo",
    [AnimalStatus.Alert]: "Alerta",
  };
  return labels[status];
}

function statusClass(status: AnimalStatus): string {
  const classes: Record<AnimalStatus, string> = {
    [AnimalStatus.Grazing]: "grazing",
    [AnimalStatus.Resting]: "resting",
    [AnimalStatus.Moving]: "moving",
    [AnimalStatus.Alert]: "alert",
  };
  return classes[status];
}
</script>

<style scoped>
.animal-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
}

.animal-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #f8fafc;
  border-left: 4px solid transparent;
  transition: background 0.2s;
}

.animal-row:hover {
  background: #f1f5f9;
}

.grazing {
  border-color: #22c55e;
}
.resting {
  border-color: #3b82f6;
}
.moving {
  border-color: #f59e0b;
}
.alert {
  border-color: #ef4444;
}

.animal-tag {
  font-size: 0.7rem;
  font-weight: 600;
  color: #94a3b8;
  min-width: 56px;
}

.animal-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.animal-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.animal-breed {
  font-size: 0.75rem;
  color: #64748b;
}

.status-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: #e2e8f0;
  color: #475569;
}
</style>
