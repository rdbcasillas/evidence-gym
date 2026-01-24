<script setup lang="ts">
import type { BaselineCard, BaselineClassification, CategoryInfo } from '@/types'

const props = defineProps<{
  card: BaselineCard
  category: CategoryInfo
}>()

const emit = defineEmits<{
  swipe: [classification: BaselineClassification]
}>()

const handleButtonClick = (classification: BaselineClassification) => {
  emit('swipe', classification)
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto px-4">
    <!-- Card -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
  </div>
</template>
