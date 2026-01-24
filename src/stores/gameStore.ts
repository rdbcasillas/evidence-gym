import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Card,
  CardPhase,
  EvidenceCategory,
  GameSession,
  AnyClassification,
  SwipeResponse,
} from '@/types'
import { CATEGORIES } from '@/types'
import { getCardsByCategory } from '@/data/sampleCards'

export const useGameStore = defineStore('game', () => {
  // State
  const session = ref<GameSession | null>(null)
  const currentPhase = ref<CardPhase>('showing')
  const pendingClassification = ref<AnyClassification | null>(null)

  // Getters
  const currentCard = computed<Card | null>(() => {
    if (!session.value) return null
    return session.value.cards[session.value.currentCardIndex] ?? null
  })

  const currentCategory = computed(() => {
    if (!session.value) return null
    return CATEGORIES[session.value.category]
  })

  // Category type checks
  const isDiscriminatingCategory = computed(() => {
    return session.value?.category === 'non-discriminating'
  })

  const isBiasCategory = computed(() => {
    return session.value?.category === 'filtered-biased'
  })

  const isBaselineCategory = computed(() => {
    return session.value?.category === 'buried-baseline'
  })

  const isFidelityCategory = computed(() => {
    return session.value?.category === 'low-fidelity'
  })

  const progress = computed(() => {
    if (!session.value) return { current: 0, total: 0 }
    return {
      current: session.value.currentCardIndex + 1,
      total: session.value.cards.length,
    }
  })

  const isLastCard = computed(() => {
    if (!session.value) return false
    return session.value.currentCardIndex >= session.value.cards.length - 1
  })

  const sessionSummary = computed(() => {
    if (!session.value) return null

    const responses = session.value.responses as SwipeResponse[]
    const correct = responses.filter((r) => r.wasCorrect).length

    return {
      category: CATEGORIES[session.value.category],
      totalCards: session.value.cards.length,
      responses,
      correct,
      incorrect: responses.length - correct,
    }
  })

  // Actions
  function startSession(category: EvidenceCategory, cardCount?: number) {
    const categoryCards = getCardsByCategory(category)
    let cards = [...categoryCards] // Fixed order for workshop consistency

    if (cardCount && cardCount < cards.length) {
      cards = cards.slice(0, cardCount)
    }

    session.value = {
      category,
      cards,
      responses: [],
      currentCardIndex: 0,
      isComplete: false,
    }
    currentPhase.value = 'showing'
    pendingClassification.value = null
  }

  // For all swipe-based cards
  function recordSwipe(classification: AnyClassification) {
    pendingClassification.value = classification
    currentPhase.value = 'justifying'
  }

  function recordSwipeJustification(justification: string) {
    if (!session.value || !currentCard.value || !pendingClassification.value) return

    const response: SwipeResponse = {
      cardId: currentCard.value.id,
      userClassification: pendingClassification.value,
      justification: justification || undefined,
      wasCorrect: pendingClassification.value === currentCard.value.correctClassification,
      timestamp: Date.now(),
    }

    session.value.responses.push(response)
    currentPhase.value = 'revealed'
  }

  function skipJustification() {
    recordSwipeJustification('')
  }

  function nextCard() {
    if (!session.value) return

    if (isLastCard.value) {
      session.value.isComplete = true
    } else {
      session.value.currentCardIndex++
      currentPhase.value = 'showing'
      pendingClassification.value = null
    }
  }

  function resetSession() {
    session.value = null
    currentPhase.value = 'showing'
    pendingClassification.value = null
  }

  function restartCategory() {
    if (!session.value) return
    const category = session.value.category
    const cardCount = session.value.cards.length
    startSession(category, cardCount)
  }

  return {
    // State
    session,
    currentPhase,
    pendingClassification,
    // Getters
    currentCard,
    currentCategory,
    isDiscriminatingCategory,
    isBiasCategory,
    isBaselineCategory,
    isFidelityCategory,
    progress,
    isLastCard,
    sessionSummary,
    // Actions
    startSession,
    recordSwipe,
    recordSwipeJustification,
    skipJustification,
    nextCard,
    resetSession,
    restartCategory,
  }
})
