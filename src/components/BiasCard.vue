<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BiasedCard, BiasClassification, CategoryInfo } from '@/types'

const props = defineProps<{
  card: BiasedCard
  category: CategoryInfo
}>()

const emit = defineEmits<{
  swipe: [classification: BiasClassification]
}>()

// Simple drag state
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
  return offsetX.value > 0 ? 'legitimate' : 'biased'
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
    const classification: BiasClassification = offsetX.value > 0 ? 'legitimate' : 'biased'
    emit('swipe', classification)
  }
  offsetX.value = 0
}

const handleButtonClick = (classification: BiasClassification) => {
  emit('swipe', classification)
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto px-4">
    <!-- Swipeable Card -->
    <div
      class="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none"
      :class="{
        'ring-4 ring-green-400': swipeIndicator === 'legitimate',
        'ring-4 ring-amber-400': swipeIndicator === 'biased',
      }"
      :style="cardStyle"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerUp"
    >
      <!-- Swipe indicators -->
      <div
        v-if="swipeIndicator === 'legitimate'"
        class="absolute top-6 right-6 text-green-600 font-bold text-sm uppercase tracking-wide rotate-12 bg-green-50 px-3 py-1 rounded-lg"
      >
        Legitimate
      </div>
      <div
        v-if="swipeIndicator === 'biased'"
        class="absolute top-6 left-6 text-amber-600 font-bold text-sm uppercase tracking-wide -rotate-12 bg-amber-50 px-3 py-1 rounded-lg"
      >
        Biased
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
        <!-- Scenario context -->
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
        <div class="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <p class="text-amber-800 text-sm text-center font-medium">
            Is this evidence filtered or biased in some way?
          </p>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex gap-3 mt-6">
      <button
        @click="handleButtonClick('biased')"
        class="flex-1 py-4 px-4 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-700 font-semibold rounded-xl transition-all active:scale-[0.98]"
      >
        <span class="text-xl block mb-1">&#9888;</span>
        <span class="text-sm">Biased / Filtered</span>
      </button>
      <button
        @click="handleButtonClick('legitimate')"
        class="flex-1 py-4 px-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 text-green-700 font-semibold rounded-xl transition-all active:scale-[0.98]"
      >
        <span class="text-xl block mb-1">&#10003;</span>
        <span class="text-sm">Legitimate</span>
      </button>
    </div>

    <!-- Hint -->
    <p class="text-center text-xs text-gray-400 mt-4">
      Swipe left for biased, right for legitimate — or use buttons
    </p>
  </div>
</template>
