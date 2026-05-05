<template>
  <div class="stats-panel">
    <div class="stat-card grazing">
      <span class="stat-icon">🌿</span>
      <div class="stat-info">
        <span class="stat-value">{{ counts.Grazing }}</span>
        <span class="stat-label">Pastando</span>
      </div>
    </div>
    <div class="stat-card resting">
      <span class="stat-icon">💤</span>
      <div class="stat-info">
        <span class="stat-value">{{ counts.Resting }}</span>
        <span class="stat-label">Descansando</span>
      </div>
    </div>
    <div class="stat-card moving">
      <span class="stat-icon">🏃</span>
      <div class="stat-info">
        <span class="stat-value">{{ counts.Moving }}</span>
        <span class="stat-label">Em movimento</span>
      </div>
    </div>
    <div class="stat-card alert">
      <span class="stat-icon">⚠️</span>
      <div class="stat-info">
        <span class="stat-value">{{ counts.Alert }}</span>
        <span class="stat-label">Alerta</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  counts: {
    Grazing: number;
    Resting: number;
    Moving: number;
    Alert: number;
  };
}>();
</script>

<style scoped>
.stats-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  font-size: 1.6rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 2px;
}

.grazing .stat-value {
  color: #16a34a;
}
.resting .stat-value {
  color: #2563eb;
}
.moving .stat-value {
  color: #d97706;
}
.alert .stat-value {
  color: #dc2626;
}
</style>
