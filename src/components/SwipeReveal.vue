<script setup lang="ts">
import { computed } from 'vue'
import type { DiscriminatingCard, SwipeClassification, CategoryInfo } from '@/types'

const props = defineProps<{
  card: DiscriminatingCard
  category: CategoryInfo
  userClassification: SwipeClassification
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
          'bg-amber-50 border-amber-100': !wasCorrect,
        }"
      >
        <div class="flex items-center gap-2">
          <span v-if="wasCorrect" class="text-green-600 text-lg">&#10003;</span>
          <span v-else class="text-amber-600 text-lg">&#10005;</span>
          <span
            class="font-medium"
            :class="{
              'text-green-700': wasCorrect,
              'text-amber-700': !wasCorrect,
            }"
          >
            <template v-if="wasCorrect">Correct!</template>
            <template v-else>
              This evidence is actually
              <strong>{{ props.card.correctClassification === 'discriminating' ? 'discriminating' : 'non-discriminating' }}</strong>
            </template>
          </span>
        </div>
      </div>

      <div class="p-6 space-y-5">
        <!-- Explanation -->
        <div
          class="rounded-xl p-4"
          :class="{
            'bg-green-50 border border-green-100': props.card.correctClassification === 'discriminating',
            'bg-blue-50 border border-blue-100': props.card.correctClassification === 'non-discriminating',
          }"
        >
          <h3
            class="text-xs font-medium uppercase tracking-wide mb-2"
            :class="{
              'text-green-700': props.card.correctClassification === 'discriminating',
              'text-blue-700': props.card.correctClassification === 'non-discriminating',
            }"
          >
            Explanation
          </h3>
          <p
            class="leading-relaxed"
            :class="{
              'text-green-900': props.card.correctClassification === 'discriminating',
              'text-blue-900': props.card.correctClassification === 'non-discriminating',
            }"
          >
            {{ props.card.explanation }}
          </p>
        </div>

        <!-- Tag -->
        <div class="text-center">
          <span
            class="inline-block px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-700': props.card.correctClassification === 'discriminating',
              'bg-gray-100 text-gray-600': props.card.correctClassification === 'non-discriminating',
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
