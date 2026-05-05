<template>
  <main class="dashboard">
    <header class="dashboard-header">
      <div class="header-left">
        <h1 class="logo">🐄 PastoVivo</h1>
        <p class="subtitle">Rastreamento em tempo real de rebanho</p>
      </div>
      <div class="header-right">
        <span
          class="connection-badge"
          :class="{ connected: store.isConnected }"
        >
          {{ store.isConnected ? "● Ao vivo" : "○ Desconectado" }}
        </span>
      </div>
    </header>

    <div v-if="store.isLoading" class="loading">Carregando fazendas...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>

    <div v-else class="dashboard-body">
      <aside class="sidebar">
        <div class="sidebar-section">
          <h2 class="section-title">Fazendas</h2>
          <ul class="farm-list">
            <li
              v-for="farm in store.farms"
              :key="farm.id"
              class="farm-item"
              :class="{ active: store.selectedFarm?.id === farm.id }"
              @click="store.selectFarm(farm)"
            >
              <span class="farm-name">{{ farm.name }}</span>
              <span class="farm-owner">{{ farm.owner }}</span>
            </li>
          </ul>
        </div>

        <div v-if="store.selectedFarm" class="sidebar-section">
          <h2 class="section-title">
            Animais
            <span class="count-badge">{{ store.animalList.length }}</span>
          </h2>
          <AnimalList :animals="store.animalList" />
        </div>
      </aside>

      <section class="map-section">
        <div v-if="!store.selectedFarm" class="empty-state">
          <span class="empty-icon">🌾</span>
          <p>Selecione uma fazenda para visualizar o mapa</p>
        </div>
        <template v-else>
          <StatusPanel :counts="store.statusCounts" class="status-bar" />
          <FarmMap
            :farm="store.selectedFarm"
            :animals="store.animalList"
            class="map-container"
          />
        </template>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useLivestockStore } from "@/stores/livestock";
import FarmMap from "@/components/FarmMap.vue";
import StatusPanel from "@/components/StatusPanel.vue";
import AnimalList from "@/components/AnimalList.vue";

const store = useLivestockStore();

onMounted(() => store.loadFarms());
onUnmounted(() => store.disconnect());
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f1f5f9;
  font-family: "Inter", system-ui, sans-serif;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 1.4rem;
  font-weight: 700;
  color: #15803d;
  margin: 0;
}

.subtitle {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
}

.connection-badge {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  background: #fef2f2;
  color: #dc2626;
}

.connection-badge.connected {
  background: #f0fdf4;
  color: #16a34a;
}

.dashboard-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  background: #fff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
}

.sidebar-section {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.count-badge {
  background: #e2e8f0;
  color: #475569;
  border-radius: 999px;
  padding: 1px 7px;
  font-size: 0.7rem;
}

.farm-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.farm-item {
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.farm-item:hover {
  background: #f8fafc;
}

.farm-item.active {
  background: #f0fdf4;
  outline: 2px solid #16a34a;
}

.farm-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.farm-owner {
  font-size: 0.75rem;
  color: #94a3b8;
}

.map-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 14px;
  overflow: hidden;
}

.status-bar {
  flex-shrink: 0;
}

.map-container {
  flex: 1;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #94a3b8;
  gap: 12px;
}

.empty-icon {
  font-size: 4rem;
}

.loading,
.error {
  padding: 24px;
  text-align: center;
  color: #64748b;
}

.error {
  color: #dc2626;
}
</style>
