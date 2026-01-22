<script setup lang="ts">
import { useRouter } from 'vue-router'
import { CATEGORIES, type EvidenceCategory } from '@/types'
import { getCardsByCategory } from '@/data/sampleCards'

const router = useRouter()

// Hide low-fidelity for now (may add later)
const categories = Object.values(CATEGORIES).filter(c => c.id !== 'low-fidelity')

const getCategoryIcon = (id: EvidenceCategory): string => {
  const icons: Record<EvidenceCategory, string> = {
    'non-discriminating': '&#8596;', // ↔ bidirectional arrow
    'filtered-biased': '&#128065;', // 👁 eye
    'buried-baseline': '&#128200;', // 📈 chart
    'low-fidelity': '&#128266;', // 🔊 speaker (signal)
  }
  return icons[id]
}

const getCategoryNumber = (id: EvidenceCategory): number => {
  const numbers: Record<EvidenceCategory, number> = {
    'non-discriminating': 1,
    'filtered-biased': 2,
    'buried-baseline': 3,
    'low-fidelity': 4,
  }
  return numbers[id]
}

const getCardCount = (id: EvidenceCategory): number => {
  return getCardsByCategory(id).length
}

const selectCategory = (categoryId: EvidenceCategory) => {
  router.push(`/category/${categoryId}`)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-2xl mx-auto px-4 py-5">
        <h1 class="text-2xl font-bold text-gray-900">Evidence Gym</h1>
        <p class="text-gray-500 mt-1">Learn to spot weak evidence</p>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-2xl mx-auto px-4 py-8">
      <!-- Introduction -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">Three Types of Weak Evidence</h2>
        <p class="text-gray-600 leading-relaxed">
          Not all evidence is created equal. Learn to recognize three common ways evidence can mislead you —
          even when it <em>feels</em> convincing.
        </p>
      </div>

      <!-- Category cards -->
      <div class="space-y-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category.id)"
          class="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md hover:border-gray-200 active:scale-[0.99]"
        >
          <div class="flex items-stretch">
            <!-- Number badge -->
            <div
              class="flex items-center justify-center w-16 text-2xl font-bold"
              :class="[category.bgColor, category.color]"
            >
              {{ getCategoryNumber(category.id) }}
            </div>

            <!-- Content -->
            <div class="flex-1 p-5">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ category.name }}</h3>
                <span class="text-xs text-gray-400">{{ getCardCount(category.id) }} cards</span>
              </div>

              <p class="text-sm text-gray-500 mb-3 italic">
                "{{ category.keyQuestion }}"
              </p>

              <p class="text-sm text-gray-600">
                {{ category.weakness }}
              </p>
            </div>

            <!-- Arrow -->
            <div class="flex items-center pr-4 text-gray-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      <!-- Footer hint -->
      <div class="mt-8 text-center">
        <p class="text-sm text-gray-400">
          Select a category to start practicing
        </p>
      </div>
    </main>
  </div>
</template>
