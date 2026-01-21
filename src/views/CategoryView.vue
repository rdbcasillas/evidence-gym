<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CATEGORIES, type EvidenceCategory } from '@/types'
import { useGameStore } from '@/stores/gameStore'
import { getCardsByCategory } from '@/data/sampleCards'

const router = useRouter()
const route = useRoute()
const gameStore = useGameStore()

const categoryId = computed(() => route.params.id as EvidenceCategory)
const category = computed(() => CATEGORIES[categoryId.value])
const cardCount = computed(() => getCardsByCategory(categoryId.value).length)

const getCategoryNumber = (id: EvidenceCategory): number => {
  const numbers: Record<EvidenceCategory, number> = {
    'non-discriminating': 1,
    'filtered-biased': 2,
    'buried-baseline': 3,
    'low-fidelity': 4,
  }
  return numbers[id]
}

const startPractice = () => {
  gameStore.startSession(categoryId.value)
  router.push('/play')
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" v-if="category">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div class="max-w-2xl mx-auto px-4 py-4 flex items-center">
        <button
          @click="goBack"
          class="p-2 -ml-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="ml-2 text-gray-400 text-sm">Back to categories</span>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-2xl mx-auto px-4 py-8">
      <!-- Category header -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl font-bold mb-4"
          :class="[category.bgColor, category.color]"
        >
          {{ getCategoryNumber(categoryId) }}
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ category.name }}</h1>
        <p class="text-gray-500">{{ cardCount }} practice cards</p>
      </div>

      <!-- Key question card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Key Question</h2>
        <p class="text-xl font-medium text-gray-900 italic">
          "{{ category.keyQuestion }}"
        </p>
      </div>

      <!-- Weakness explanation -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">The Weakness</h2>
        <p class="text-gray-700 leading-relaxed">
          {{ category.weakness }}
        </p>
      </div>

      <!-- How it works -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">How This Works</h2>
        <ol class="space-y-4">
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">1</span>
            <span class="text-gray-700">You'll see a claim and some evidence supporting it</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">2</span>
            <span class="text-gray-700">Think about the key question: <em class="text-gray-900">"{{ category.keyQuestion }}"</em></span>
          </li>
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">3</span>
            <span class="text-gray-700">Write your answer, then see the explanation</span>
          </li>
        </ol>
      </div>

      <!-- Start button -->
      <button
        @click="startPractice"
        class="w-full py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-2xl transition-colors active:scale-[0.99] shadow-sm"
      >
        Start Practice
      </button>
    </main>
  </div>
</template>
