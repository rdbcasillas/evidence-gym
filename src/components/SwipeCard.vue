<script setup lang="ts">
import type { DiscriminatingCard, SwipeClassification, CategoryInfo } from '@/types'

const props = defineProps<{
  card: DiscriminatingCard
  category: CategoryInfo
}>()

const emit = defineEmits<{
  swipe: [classification: SwipeClassification]
}>()

const handleButtonClick = (classification: SwipeClassification) => {
  emit('swipe', classification)
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto px-4">
    <!-- Card -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p class="text-gray-600 text-sm text-center">
            Would you expect this evidence even if the claim were false?
          </p>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex gap-3 mt-6">
      <button
        @click="handleButtonClick('non-discriminating')"
        class="flex-1 py-4 px-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-700 font-semibold rounded-xl transition-all active:scale-[0.98]"
      >
        <span class="text-xl block mb-1">&#10052;</span>
        <span class="text-sm">Doesn't Discriminate</span>
      </button>
      <button
        @click="handleButtonClick('discriminating')"
        class="flex-1 py-4 px-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 text-green-700 font-semibold rounded-xl transition-all active:scale-[0.98]"
      >
        <span class="text-xl block mb-1">&#128293;</span>
        <span class="text-sm">Discriminates</span>
      </button>
    </div>
  </div>
</template>
