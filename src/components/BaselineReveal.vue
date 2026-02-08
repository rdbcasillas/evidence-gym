<script setup lang="ts">
import { computed } from 'vue'
import type { BaselineCard, BaselineClassification, CategoryInfo } from '@/types'

const props = defineProps<{
  card: BaselineCard
  category: CategoryInfo
  userClassification: BaselineClassification
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
              The baseline is actually
              <strong>{{ props.card.correctClassification === 'baseline-missing' ? 'missing' : 'considered' }}</strong>
            </template>
          </span>
        </div>
      </div>

      <div class="p-6 space-y-5">
        <!-- Claim & evidence reminder -->
        <div class="space-y-2">
          <div>
            <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">The Claim</h3>
            <p class="text-gray-900 font-medium">{{ props.card.claim }}</p>
          </div>
          <div>
            <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">The Evidence</h3>
            <p class="text-gray-700">{{ props.card.evidence }}</p>
          </div>
        </div>

        <!-- User's justification if provided -->
        <div v-if="props.userJustification">
          <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Your Reasoning</h3>
          <p class="text-gray-700 italic bg-gray-50 rounded-lg p-3">"{{ props.userJustification }}"</p>
        </div>

        <!-- New format: right question + framework -->
        <template v-if="props.card.comparisonText && props.card.frameworkSee">
          <div class="bg-stone-50 rounded-xl p-5 space-y-4 border border-stone-200">
            <div class="space-y-3">
              <h3 class="font-bold text-stone-900">The right question:</h3>
              <p class="text-stone-800 italic">"{{ props.card.baselineQuestion }}"</p>
              <p class="text-stone-700 leading-relaxed">{{ props.card.comparisonText }}</p>
            </div>

            <hr class="border-stone-300" />

            <div class="space-y-3">
              <h3 class="font-bold text-stone-900">Simple framework:</h3>
              <p class="text-stone-700">When you see: {{ props.card.frameworkSee }}</p>
              <p class="text-stone-700">Ask: {{ props.card.frameworkAsk }}</p>
            </div>
          </div>
        </template>

        <!-- Legacy structured display -->
        <template v-else>
          <div
            class="rounded-xl p-4 space-y-3"
            :class="{
              'bg-emerald-50 border border-emerald-100': props.card.correctClassification === 'baseline-missing',
              'bg-green-50 border border-green-100': props.card.correctClassification === 'baseline-considered',
            }"
          >
            <h3
              class="text-xs font-medium uppercase tracking-wide"
              :class="{
                'text-emerald-700': props.card.correctClassification === 'baseline-missing',
                'text-green-700': props.card.correctClassification === 'baseline-considered',
              }"
            >
              {{ props.card.correctClassification === 'baseline-missing' ? 'The Buried Base Rate' : 'The Base Rate Is Considered' }}
            </h3>

            <template v-if="props.card.baselineQuestion">
              <div class="space-y-2">
                <p
                  class="text-sm"
                  :class="{
                    'text-emerald-800': props.card.correctClassification === 'baseline-missing',
                    'text-green-800': props.card.correctClassification === 'baseline-considered',
                  }"
                >
                  <span class="font-semibold">Question to ask:</span> {{ props.card.baselineQuestion }}
                </p>
                <p
                  class="text-sm"
                  :class="{
                    'text-emerald-800': props.card.correctClassification === 'baseline-missing',
                    'text-green-800': props.card.correctClassification === 'baseline-considered',
                  }"
                >
                  <span class="font-semibold">The base rate:</span> {{ props.card.actualBaseline }}
                </p>
                <p
                  class="font-semibold"
                  :class="{
                    'text-emerald-900': props.card.correctClassification === 'baseline-missing',
                    'text-green-900': props.card.correctClassification === 'baseline-considered',
                  }"
                >
                  {{ props.card.comparisonInsight }}
                </p>
              </div>
            </template>

            <p
              v-else
              class="leading-relaxed"
              :class="{
                'text-emerald-900': props.card.correctClassification === 'baseline-missing',
                'text-green-900': props.card.correctClassification === 'baseline-considered',
              }"
            >
              {{ props.card.theBaseline }}
            </p>
          </div>

          <!-- Why this matters -->
          <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h3 class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Why This Matters</h3>
            <p class="text-gray-700 leading-relaxed">{{ props.card.explanation }}</p>
          </div>
        </template>

        <!-- Tag -->
        <div class="text-center">
          <span
            class="inline-block px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-emerald-100 text-emerald-700': props.card.correctClassification === 'baseline-missing',
              'bg-green-100 text-green-700': props.card.correctClassification === 'baseline-considered',
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
