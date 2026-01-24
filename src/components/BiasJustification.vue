<script setup lang="ts">
import { ref } from 'vue'
import type { BiasedCard, BiasClassification, CategoryInfo } from '@/types'

const props = defineProps<{
  card: BiasedCard
  category: CategoryInfo
  classification: BiasClassification
}>()

const emit = defineEmits<{
  submit: [justification: string]
  skip: []
}>()

const justification = ref('')

const handleSubmit = () => {
  emit('submit', justification.value.trim())
}

const handleSkip = () => {
  emit('skip')
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto px-4">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header showing their choice -->
      <div
        class="px-6 py-4 border-b border-gray-100"
        :class="{
          'bg-green-50': props.classification === 'legitimate',
          'bg-amber-50': props.classification === 'biased',
        }"
      >
        <div class="flex items-center gap-2">
          <span v-if="props.classification === 'legitimate'" class="text-xl">&#10003;</span>
          <span v-else class="text-xl">&#9888;</span>
          <span
            class="font-medium"
            :class="{
              'text-green-700': props.classification === 'legitimate',
              'text-amber-700': props.classification === 'biased',
            }"
          >
            You said: {{ props.classification === 'legitimate' ? 'Legitimate' : 'Biased / Filtered' }}
          </span>
        </div>
      </div>

      <div class="p-6 space-y-5">
        <!-- Reminder of claim and evidence -->
        <div class="bg-gray-50 rounded-xl p-4 text-sm space-y-3">
          <div>
            <p class="text-gray-500 mb-1">Claim:</p>
            <p class="text-gray-800 font-medium">{{ props.card.claim }}</p>
          </div>
          <div>
            <p class="text-gray-500 mb-1">Evidence:</p>
            <p class="text-gray-800">{{ props.card.evidence }}</p>
          </div>
        </div>

        <!-- Question -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ props.classification === 'biased' ? 'What might be missing from this evidence?' : 'Why do you think this evidence is reliable?' }}
          </h3>
          <p class="text-sm text-gray-500">
            Optional: explain your reasoning
          </p>
        </div>

        <!-- Text input -->
        <textarea
          v-model="justification"
          class="w-full h-24 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
          :placeholder="props.classification === 'biased' ? 'I think this is biased because...' : 'This seems legitimate because...'"
        />

        <!-- Buttons -->
        <div class="flex gap-3">
          <button
            @click="handleSkip"
            class="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            Skip
          </button>
          <button
            @click="handleSubmit"
            class="flex-1 py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
