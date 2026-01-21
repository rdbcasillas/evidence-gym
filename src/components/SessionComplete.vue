<script setup lang="ts">
import { computed } from 'vue'
import type { CategoryInfo, UserResponse } from '@/types'

interface Summary {
  category: CategoryInfo
  totalCards: number
  responses: UserResponse[]
  correct?: number
  incorrect?: number
}

const props = defineProps<{
  summary: Summary
}>()

const emit = defineEmits<{
  restart: []
  home: []
}>()

// Calculate percentage score
const percentage = computed(() => {
  if (props.summary.correct === undefined || props.summary.totalCards === 0) return 0
  return Math.round((props.summary.correct / props.summary.totalCards) * 100)
})

// Get performance level for feedback
const performanceLevel = computed(() => {
  const pct = percentage.value
  if (pct >= 83) return { label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' }
  if (pct >= 67) return { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' }
  if (pct >= 50) return { label: 'Keep Practicing', color: 'text-amber-600', bgColor: 'bg-amber-50' }
  return { label: 'Room to Grow', color: 'text-gray-600', bgColor: 'bg-gray-50' }
})
</script>

<template>
  <div class="w-full max-w-lg mx-auto px-4">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Score -->
      <div class="bg-gray-900 text-white px-6 py-8 text-center">
        <!-- Large percentage display -->
        <div class="text-5xl font-bold mb-2">{{ percentage }}%</div>
        <div
          class="text-lg font-medium mb-1"
          :class="{
            'text-green-400': percentage >= 83,
            'text-blue-400': percentage >= 67 && percentage < 83,
            'text-amber-400': percentage >= 50 && percentage < 67,
            'text-gray-400': percentage < 50,
          }"
        >
          {{ performanceLevel.label }}
        </div>
        <p class="text-gray-400 text-sm">{{ props.summary.correct }} of {{ props.summary.totalCards }} correct</p>
      </div>

      <div class="p-6 space-y-6">
        <!-- Category badge -->
        <div class="text-center">
          <span
            class="inline-block px-4 py-2 rounded-full text-sm font-medium"
            :class="[props.summary.category.bgColor, props.summary.category.color]"
          >
            {{ props.summary.category.name }}
          </span>
        </div>

        <!-- Visual score breakdown -->
        <div v-if="props.summary.correct !== undefined" class="flex justify-center gap-2">
          <template v-for="i in props.summary.totalCards" :key="i">
            <div
              class="w-3 h-3 rounded-full"
              :class="i <= props.summary.correct ? 'bg-green-500' : 'bg-red-300'"
            ></div>
          </template>
        </div>

        <!-- Key takeaway -->
        <div class="bg-gray-50 rounded-xl p-5">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Remember to Ask</h3>
          <p class="text-lg font-medium text-gray-900 italic text-center">
            "{{ props.summary.category.keyQuestion }}"
          </p>
        </div>

        <!-- Encouragement -->
        <div class="text-center">
          <p class="text-gray-600 leading-relaxed">
            <template v-if="props.summary.category.id === 'non-discriminating'">
              The goal is to notice when evidence <em>confirms</em> without <em>discriminating</em>.
              Both can feel convincing — the skill is telling them apart.
            </template>
            <template v-else-if="props.summary.category.id === 'filtered-biased'">
              Survivorship bias and selection effects are everywhere. The key is asking:
              <em>"What am I not seeing?"</em>
            </template>
            <template v-else-if="props.summary.category.id === 'buried-baseline'">
              Raw numbers mean nothing without context. Always ask:
              <em>"How common is this anyway?"</em>
            </template>
            <template v-else-if="props.summary.category.id === 'low-fidelity'">
              Information degrades as it passes through more hands. Trace claims back to their source:
              <em>"How many people translated this?"</em>
            </template>
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="px-6 pb-6 flex gap-3">
        <button
          @click="emit('home')"
          class="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
        >
          All Categories
        </button>
        <button
          @click="emit('restart')"
          class="flex-1 py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
        >
          Practice Again
        </button>
      </div>
    </div>
  </div>
</template>
