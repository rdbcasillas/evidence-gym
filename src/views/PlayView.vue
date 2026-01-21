<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import {
  isDiscriminatingCard,
  isBiasedCard,
  isBaselineCard,
  isFidelityCard,
  type SwipeClassification,
  type BiasClassification,
  type BaselineClassification,
  type FidelityClassification,
} from '@/types'

// Discriminating flow components
import SwipeCardComponent from '@/components/SwipeCard.vue'
import SwipeJustification from '@/components/SwipeJustification.vue'
import SwipeReveal from '@/components/SwipeReveal.vue'

// Bias flow components
import BiasCard from '@/components/BiasCard.vue'
import BiasJustification from '@/components/BiasJustification.vue'
import BiasReveal from '@/components/BiasReveal.vue'

// Baseline flow components
import BaselineCard from '@/components/BaselineCard.vue'
import BaselineJustification from '@/components/BaselineJustification.vue'
import BaselineReveal from '@/components/BaselineReveal.vue'

// Fidelity flow components
import FidelityCard from '@/components/FidelityCard.vue'
import FidelityJustification from '@/components/FidelityJustification.vue'
import FidelityReveal from '@/components/FidelityReveal.vue'

// Shared
import SessionComplete from '@/components/SessionComplete.vue'

const router = useRouter()
const gameStore = useGameStore()

// Redirect to home if no active session
watch(
  () => gameStore.session,
  (session) => {
    if (!session) {
      router.push('/')
    }
  },
  { immediate: true }
)

// Type-safe card getters
const currentDiscriminatingCard = computed(() => {
  const card = gameStore.currentCard
  return card && isDiscriminatingCard(card) ? card : null
})

const currentBiasCard = computed(() => {
  const card = gameStore.currentCard
  return card && isBiasedCard(card) ? card : null
})

const currentBaselineCard = computed(() => {
  const card = gameStore.currentCard
  return card && isBaselineCard(card) ? card : null
})

const currentFidelityCard = computed(() => {
  const card = gameStore.currentCard
  return card && isFidelityCard(card) ? card : null
})

// Swipe handlers for each category
const handleDiscriminatingSwipe = (classification: SwipeClassification) => {
  gameStore.recordSwipe(classification)
}

const handleBiasSwipe = (classification: BiasClassification) => {
  gameStore.recordSwipe(classification)
}

const handleBaselineSwipe = (classification: BaselineClassification) => {
  gameStore.recordSwipe(classification)
}

const handleFidelitySwipe = (classification: FidelityClassification) => {
  gameStore.recordSwipe(classification)
}

// Shared handlers
const handleSwipeJustification = (justification: string) => {
  gameStore.recordSwipeJustification(justification)
}

const handleSkipJustification = () => {
  gameStore.skipJustification()
}

const handleNext = () => {
  gameStore.nextCard()
}

const handleRestart = () => {
  gameStore.restartCategory()
}

const handleHome = () => {
  gameStore.resetSession()
  router.push('/')
}

const handleBackToCategory = () => {
  if (gameStore.session) {
    const categoryId = gameStore.session.category
    gameStore.resetSession()
    router.push(`/category/${categoryId}`)
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
    <!-- Header with progress -->
    <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          @click="handleBackToCategory"
          class="p-2 -ml-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex items-center gap-3" v-if="gameStore.session && !gameStore.session.isComplete">
          <!-- Category badge -->
          <span
            v-if="gameStore.currentCategory"
            class="text-xs font-medium px-2 py-1 rounded-full"
            :class="[gameStore.currentCategory.bgColor, gameStore.currentCategory.color]"
          >
            {{ gameStore.currentCategory.shortName }}
          </span>
          <!-- Progress -->
          <span class="text-sm text-gray-500">
            {{ gameStore.progress.current }} / {{ gameStore.progress.total }}
          </span>
        </div>

        <div class="w-10"></div>
      </div>

      <!-- Progress bar -->
      <div class="h-1 bg-gray-100" v-if="gameStore.session && !gameStore.session.isComplete">
        <div
          class="h-full bg-gray-900 transition-all duration-300"
          :style="{ width: `${(gameStore.progress.current / gameStore.progress.total) * 100}%` }"
        ></div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 flex flex-col justify-center py-6">
      <!-- Session complete -->
      <SessionComplete
        v-if="gameStore.session?.isComplete && gameStore.sessionSummary"
        :summary="gameStore.sessionSummary"
        @restart="handleRestart"
        @home="handleHome"
      />

      <!-- DISCRIMINATING FLOW (Non-Discriminating category) -->
      <template v-else-if="gameStore.isDiscriminatingCategory && currentDiscriminatingCard && gameStore.currentCategory">
        <SwipeCardComponent
          v-if="gameStore.currentPhase === 'showing'"
          :card="currentDiscriminatingCard"
          :category="gameStore.currentCategory"
          @swipe="handleDiscriminatingSwipe"
        />

        <SwipeJustification
          v-else-if="gameStore.currentPhase === 'justifying' && gameStore.pendingClassification"
          :card="currentDiscriminatingCard"
          :category="gameStore.currentCategory"
          :classification="(gameStore.pendingClassification as SwipeClassification)"
          @submit="handleSwipeJustification"
          @skip="handleSkipJustification"
        />

        <SwipeReveal
          v-else-if="gameStore.currentPhase === 'revealed' && gameStore.pendingClassification"
          :card="currentDiscriminatingCard"
          :category="gameStore.currentCategory"
          :user-classification="(gameStore.pendingClassification as SwipeClassification)"
          :user-justification="(gameStore.session?.responses[gameStore.session.responses.length - 1] as any)?.justification"
          :is-last-card="gameStore.isLastCard"
          @next="handleNext"
        />
      </template>

      <!-- BIAS FLOW (Filtered/Biased category) -->
      <template v-else-if="gameStore.isBiasCategory && currentBiasCard && gameStore.currentCategory">
        <BiasCard
          v-if="gameStore.currentPhase === 'showing'"
          :card="currentBiasCard"
          :category="gameStore.currentCategory"
          @swipe="handleBiasSwipe"
        />

        <BiasJustification
          v-else-if="gameStore.currentPhase === 'justifying' && gameStore.pendingClassification"
          :card="currentBiasCard"
          :category="gameStore.currentCategory"
          :classification="(gameStore.pendingClassification as BiasClassification)"
          @submit="handleSwipeJustification"
          @skip="handleSkipJustification"
        />

        <BiasReveal
          v-else-if="gameStore.currentPhase === 'revealed' && gameStore.pendingClassification"
          :card="currentBiasCard"
          :category="gameStore.currentCategory"
          :user-classification="(gameStore.pendingClassification as BiasClassification)"
          :user-justification="(gameStore.session?.responses[gameStore.session.responses.length - 1] as any)?.justification"
          :is-last-card="gameStore.isLastCard"
          @next="handleNext"
        />
      </template>

      <!-- BASELINE FLOW (Buried Baseline category) -->
      <template v-else-if="gameStore.isBaselineCategory && currentBaselineCard && gameStore.currentCategory">
        <BaselineCard
          v-if="gameStore.currentPhase === 'showing'"
          :card="currentBaselineCard"
          :category="gameStore.currentCategory"
          @swipe="handleBaselineSwipe"
        />

        <BaselineJustification
          v-else-if="gameStore.currentPhase === 'justifying' && gameStore.pendingClassification"
          :card="currentBaselineCard"
          :category="gameStore.currentCategory"
          :classification="(gameStore.pendingClassification as BaselineClassification)"
          @submit="handleSwipeJustification"
          @skip="handleSkipJustification"
        />

        <BaselineReveal
          v-else-if="gameStore.currentPhase === 'revealed' && gameStore.pendingClassification"
          :card="currentBaselineCard"
          :category="gameStore.currentCategory"
          :user-classification="(gameStore.pendingClassification as BaselineClassification)"
          :user-justification="(gameStore.session?.responses[gameStore.session.responses.length - 1] as any)?.justification"
          :is-last-card="gameStore.isLastCard"
          @next="handleNext"
        />
      </template>

      <!-- FIDELITY FLOW (Low Fidelity category) -->
      <template v-else-if="gameStore.isFidelityCategory && currentFidelityCard && gameStore.currentCategory">
        <FidelityCard
          v-if="gameStore.currentPhase === 'showing'"
          :card="currentFidelityCard"
          :category="gameStore.currentCategory"
          @swipe="handleFidelitySwipe"
        />

        <FidelityJustification
          v-else-if="gameStore.currentPhase === 'justifying' && gameStore.pendingClassification"
          :card="currentFidelityCard"
          :category="gameStore.currentCategory"
          :classification="(gameStore.pendingClassification as FidelityClassification)"
          @submit="handleSwipeJustification"
          @skip="handleSkipJustification"
        />

        <FidelityReveal
          v-else-if="gameStore.currentPhase === 'revealed' && gameStore.pendingClassification"
          :card="currentFidelityCard"
          :category="gameStore.currentCategory"
          :user-classification="(gameStore.pendingClassification as FidelityClassification)"
          :user-justification="(gameStore.session?.responses[gameStore.session.responses.length - 1] as any)?.justification"
          :is-last-card="gameStore.isLastCard"
          @next="handleNext"
        />
      </template>
    </main>
  </div>
</template>
