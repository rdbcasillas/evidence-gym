<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BaselineCard, BaselineClassification, CategoryInfo } from '@/types'

const props = defineProps<{
  card: BaselineCard
  category: CategoryInfo
}>()

const emit = defineEmits<{
  swipe: [classification: BaselineClassification]
}>()

const isDragging = ref(false)
const startX = ref(0)
const offsetX = ref(0)

const cardStyle = computed(() => {
  if (!isDragging.value && offsetX.value === 0) return {}
  return {
    transform: `translateX(${offsetX.value}px) rotate(${offsetX.value * 0.03}deg)`,
    transition: isDragging.value ? 'none' : 'transform 0.3s ease-out',
  }
})

const swipeIndicator = computed(() => {
  if (Math.abs(offsetX.value) < 50) return null
  return offsetX.value > 0 ? 'baseline-considered' : 'baseline-missing'
})

const handlePointerDown = (e: PointerEvent) => {
  isDragging.value = true
  startX.value = e.clientX
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}

const handlePointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return
  offsetX.value = e.clientX - startX.value
}

const handlePointerUp = () => {
  if (!isDragging.value) return
  isDragging.value = false

  if (Math.abs(offsetX.value) >= 100) {
    const classification: BaselineClassification = offsetX.value > 0 ? 'baseline-considered' : 'baseline-missing'
    emit('swipe', classification)
  }
  offsetX.value = 0
}

const handleButtonClick = (classification: BaselineClassification) => {
  emit('swipe', classification)
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto px-4">
    <div
      class="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none"
      :class="{
        'ring-4 ring-green-400': swipeIndicator === 'baseline-considered',
        'ring-4 ring-emerald-400': swipeIndicator === 'baseline-missing',
      }"
      :style="cardStyle"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerUp"
    >
      <!-- Swipe indicators -->
      <div
        v-if="swipeIndicator === 'baseline-considered'"
        class="absolute top-6 right-6 text-green-600 font-bold text-sm uppercase tracking-wide rotate-12 bg-green-50 px-3 py-1 rounded-lg"
      >
        Has Baseline
      </div>
      <div
        v-if="swipeIndicator === 'baseline-missing'"
        class="absolute top-6 left-6 text-emerald-600 font-bold text-sm uppercase tracking-wide -rotate-12 bg-emerald-50 px-3 py-1 rounded-lg"
      >
        Missing
      </div>

      <!-- Category header -->
      <div
        class="px-6 py-3 border-b border-gray-100"
        :class="props.category.bgColor"
      >
        <p class="text-sm font-medium" :class="props.category.color">
          {{ props.category.name }}
        </p>
      </div>

      <div class="p-6 space-y-5">
        <!-- Scenario -->
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Scenario</h3>
          <p class="text-gray-700 text-sm leading-relaxed">{{ props.card.scenario }}</p>
        </div>

        <!-- Domain tag -->
        <div>
          <span class="text-xs font-medium uppercase tracking-wide text-gray-400 bg-gray-100 px-2 py-1 rounded">
            {{ props.card.domain }}
          </span>
        </div>

        <!-- Claim -->
        <div>
          <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Claim</h3>
          <p class="text-lg font-semibold text-gray-900 leading-snug">{{ props.card.claim }}</p>
        </div>

        <!-- Evidence -->
        <div>
          <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Evidence</h3>
          <p class="text-gray-700 leading-relaxed">{{ props.card.evidence }}</p>
        </div>

        <!-- Question prompt -->
        <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <p class="text-emerald-800 text-sm text-center font-medium">
            Does this evidence account for the base rate?
          </p>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex gap-3 mt-6">
      <button
        @click="handleButtonClick('baseline-missing')"
        class="flex-1 py-4 px-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-700 font-semibold rounded-xl transition-all active:scale-[0.98]"
      >
        <span class="text-xl block mb-1">?</span>
        <span class="text-sm">Baseline Missing</span>
      </button>
      <button
        @click="handleButtonClick('baseline-considered')"
        class="flex-1 py-4 px-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 text-green-700 font-semibold rounded-xl transition-all active:scale-[0.98]"
      >
        <span class="text-xl block mb-1">&#10003;</span>
        <span class="text-sm">Baseline Considered</span>
      </button>
    </div>

    <p class="text-center text-xs text-gray-400 mt-4">
      Swipe left if baseline is missing, right if it's considered
    </p>
  </div>
</template>
