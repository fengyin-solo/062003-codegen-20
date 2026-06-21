<template>
  <div class="diary-panel card">
    <div class="panel-header">
      <h3>📔 练习生日记</h3>
      <div class="filter-row">
        <select v-model="filterTrainee" class="filter-select">
          <option value="all">全部练习生</option>
          <option v-for="t in trainees" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
        <select v-model="filterType" class="filter-select">
          <option value="all">全部类型</option>
          <option value="training">训练</option>
          <option value="relationship">关系</option>
          <option value="emotion">情绪</option>
          <option value="event">事件</option>
        </select>
      </div>
    </div>

    <div v-if="pinnedDiaries.length > 0" class="pinned-section">
      <div class="section-title">📌 置顶</div>
      <div
        v-for="diary in pinnedDiaries"
        :key="diary.id"
        class="diary-item pinned"
      >
        <div class="diary-header">
          <span class="diary-name">{{ diary.traineeName }}</span>
          <span class="diary-mood" :title="moodLabel(diary.mood)">
            {{ moodIcon(diary.mood) }}
          </span>
          <span class="diary-type" :class="diary.type">
            {{ typeLabel(diary.type) }}
          </span>
          <span class="diary-day">D{{ diary.day }}</span>
          <button class="pin-btn active" @click="$emit('toggle-pin', diary.id)" title="取消置顶">
            📌
          </button>
        </div>
        <div class="diary-text">{{ diary.text }}</div>
      </div>
    </div>

    <div class="diary-list" ref="listRef">
      <div
        v-for="diary in filteredDiaries"
        :key="diary.id"
        class="diary-item"
        :class="{ 'new-item': isNew(diary) }"
      >
        <div class="diary-header">
          <span class="diary-name">{{ diary.traineeName }}</span>
          <span class="diary-mood" :title="moodLabel(diary.mood)">
            {{ moodIcon(diary.mood) }}
          </span>
          <span class="diary-type" :class="diary.type">
            {{ typeLabel(diary.type) }}
          </span>
          <span class="diary-day">D{{ diary.day }}</span>
          <button class="pin-btn" @click="$emit('toggle-pin', diary.id)" title="置顶">
            📌
          </button>
        </div>
        <div class="diary-text">{{ diary.text }}</div>
        <div v-if="diary.statGain > 0" class="diary-stats">
          <span class="stat-gain">能力 +{{ diary.statGain }}</span>
        </div>
      </div>
      <div v-if="filteredDiaries.length === 0" class="empty">
        暂无日记记录
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  diaries: Array,
  trainees: Array,
  currentDay: Number,
})

defineEmits(['toggle-pin'])

const filterTrainee = ref('all')
const filterType = ref('all')
const listRef = ref(null)
const lastCount = ref(0)

const moods = GAME_CONFIG.diary.moods

const typeLabels = {
  training: '训练',
  relationship: '关系',
  emotion: '情绪',
  event: '事件',
}

function moodIcon(mood) {
  return moods[mood]?.icon || '😐'
}

function moodLabel(mood) {
  return moods[mood]?.label || '平静'
}

function typeLabel(type) {
  return typeLabels[type] || type
}

function isNew(diary) {
  return diary.day === props.currentDay - 1
}

const sortedDiaries = computed(() => {
  if (!props.diaries) return []
  return [...props.diaries].sort((a, b) => b.day - a.day || b.id.localeCompare(a.id))
})

const pinnedDiaries = computed(() => {
  return sortedDiaries.value.filter((d) => {
    if (!d.pinned) return false
    if (filterTrainee.value !== 'all' && d.traineeId !== filterTrainee.value) return false
    if (filterType.value !== 'all' && d.type !== filterType.value) return false
    return true
  })
})

const filteredDiaries = computed(() => {
  return sortedDiaries.value.filter((d) => {
    if (d.pinned) return false
    if (filterTrainee.value !== 'all' && d.traineeId !== filterTrainee.value) return false
    if (filterType.value !== 'all' && d.type !== filterType.value) return false
    return true
  })
})

watch(
  () => props.diaries?.length,
  async (newCount) => {
    if (newCount && newCount > lastCount.value) {
      await nextTick()
      if (listRef.value) listRef.value.scrollTop = 0
    }
    lastCount.value = newCount || 0
  }
)
</script>

<style scoped>
.diary-panel {
  display: flex;
  flex-direction: column;
  max-height: 420px;
}

.panel-header {
  margin-bottom: 0.75rem;
}

.panel-header h3 {
  margin-bottom: 0.5rem;
}

.filter-row {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  flex: 1;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.8rem;
  font-family: inherit;
  cursor: pointer;
}

.pinned-section {
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed var(--border);
}

.section-title {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.diary-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.diary-item {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  transition: all 0.2s;
}

.diary-item.pinned {
  background: var(--accent-soft);
  border: 1px solid var(--accent);
}

.diary-item.new-item {
  animation: highlight 1.5s ease-out;
}

@keyframes highlight {
  0% { background: var(--accent-soft); }
  100% { background: var(--bg-secondary); }
}

.diary-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.25rem;
  flex-wrap: wrap;
}

.diary-name {
  font-weight: 600;
  font-size: 0.85rem;
}

.diary-mood {
  font-size: 1rem;
}

.diary-type {
  font-size: 0.65rem;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-muted);
}

.diary-type.training { background: #e3f2fd; color: #1565c0; }
[data-theme='dark'] .diary-type.training { background: #1a2332; color: #64b5f6; }

.diary-type.relationship { background: #fce4ec; color: #c2185b; }
[data-theme='dark'] .diary-type.relationship { background: #2d1a25; color: #f48fb1; }

.diary-type.emotion { background: #fff3e0; color: #e65100; }
[data-theme='dark'] .diary-type.emotion { background: #2a1f10; color: #ffb74d; }

.diary-type.event { background: #f3e5f5; color: #7b1fa2; }
[data-theme='dark'] .diary-type.event { background: #2a1a30; color: #ce93d8; }

.diary-day {
  margin-left: auto;
  font-size: 0.7rem;
  color: var(--text-muted);
}

.pin-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  opacity: 0.4;
  transition: opacity 0.2s;
  padding: 0 0.2rem;
}

.pin-btn:hover,
.pin-btn.active {
  opacity: 1;
}

.diary-text {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.diary-stats {
  margin-top: 0.3rem;
}

.stat-gain {
  font-size: 0.7rem;
  color: var(--success);
  font-weight: 600;
}

.empty {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  padding: 2rem 0;
}
</style>
