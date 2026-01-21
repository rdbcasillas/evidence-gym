<script setup lang="ts">
import { computed } from 'vue'
import type { FidelityCard, FidelityClassification, CategoryInfo } from '@/types'

const props = defineProps<{
  card: FidelityCard
  category: CategoryInfo
  userClassification: FidelityClassification
  userJustification?: string
  isLastCard: boolean
}>()

const emit = defineEmits<{
  next: []
}>()

const wasCorrect = computed(() => props.userClassification === props.card.correctClassification)
</script>

<template>
  <div class="w-full max-w-lg mx-auto px-4">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Result indicator -->
      <div
        class="px-6 py-4 border-b"
        :class="{
          'bg-green-50 border-green-100': wasCorrect,
          'bg-red-50 border-red-100': !wasCorrect,
        }"
      >
        <div class="flex items-center gap-2">
          <span v-if="wasCorrect" class="text-green-600 text-lg">&#10003;</span>
          <span v-else class="text-red-600 text-lg">&#10005;</span>
          <span
            class="font-medium"
            :class="{
              'text-green-700': wasCorrect,
              'text-red-700': !wasCorrect,
            }"
          >
            <template v-if="wasCorrect">Correct!</template>
            <template v-else>
              This is actually
              <strong>{{ props.card.correctClassification === 'low-fidelity' ? 'low fidelity' : 'high fidelity' }}</strong>
            </template>
          </span>
        </div>
      </div>

      <div class="p-6 space-y-5">
        <!-- User's justification if provided -->
        <div v-if="props.userJustification">
          <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Your Reasoning</h3>
          <p class="text-gray-700 italic bg-gray-50 rounded-lg p-3">"{{ props.userJustification }}"</p>
        </div>

        <!-- Source analysis -->
        <div
          class="rounded-xl p-4"
          :class="{
            'bg-purple-50 border border-purple-100': props.card.correctClassification === 'low-fidelity',
            'bg-green-50 border border-green-100': props.card.correctClassification === 'high-fidelity',
          }"
        >
          <h3
            class="text-xs font-medium uppercase tracking-wide mb-2"
            :class="{
              'text-purple-700': props.card.correctClassification === 'low-fidelity',
              'text-green-700': props.card.correctClassification === 'high-fidelity',
            }"
          >
            Source Analysis
          </h3>
          <p
            class="leading-relaxed"
            :class="{
              'text-purple-900': props.card.correctClassification === 'low-fidelity',
              'text-green-900': props.card.correctClassification === 'high-fidelity',
            }"
          >
            {{ props.card.sourceAnalysis }}
          </p>
        </div>

        <!-- Explanation -->
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Explanation</h3>
          <p class="text-gray-700 leading-relaxed">{{ props.card.explanation }}</p>
        </div>

        <!-- Tag -->
        <div class="text-center">
          <span
            class="inline-block px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-purple-100 text-purple-700': props.card.correctClassification === 'low-fidelity',
              'bg-green-100 text-green-700': props.card.correctClassification === 'high-fidelity',
            }"
          >
            {{ props.card.tag }}
          </span>
        </div>
      </div>

      <!-- Next button -->
      <div class="px-6 pb-6">
        <button
          @click="emit('next')"
          class="w-full py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors active:scale-[0.99]"
        >
          {{ props.isLastCard ? 'View Summary' : 'Next Card' }}
        </button>
      </div>
    </div>
  </div>
</template>
