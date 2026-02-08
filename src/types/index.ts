export type SwipeClassification = 'discriminating' | 'non-discriminating'
export type BiasClassification = 'biased' | 'legitimate'
export type BaselineClassification = 'baseline-missing' | 'baseline-considered'
export type FidelityClassification = 'low-fidelity' | 'high-fidelity'

export type EvidenceCategory =
  | 'non-discriminating'
  | 'filtered-biased'
  | 'buried-baseline'
  | 'low-fidelity'

// All categories now use swipe/button judgment
export type AnyClassification = SwipeClassification | BiasClassification | BaselineClassification | FidelityClassification

export interface CategoryInfo {
  id: EvidenceCategory
  name: string
  shortName: string
  keyQuestion: string
  weakness: string
  color: string
  bgColor: string
}

export const CATEGORIES: Record<EvidenceCategory, CategoryInfo> = {
  'non-discriminating': {
    id: 'non-discriminating',
    name: 'Non-Discriminating',
    shortName: 'Non-Discriminating',
    keyQuestion: 'Would I see this if the claim were false?',
    weakness: "It doesn't move the needle.",
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  'filtered-biased': {
    id: 'filtered-biased',
    name: 'Filtered / Biased',
    shortName: 'Filtered/Biased',
    keyQuestion: 'What am I not seeing?',
    weakness: 'The data is "cherry-picked" by the environment.',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
  },
  'buried-baseline': {
    id: 'buried-baseline',
    name: 'Buried Baseline',
    shortName: 'Buried Baseline',
    keyQuestion: 'How common is this anyway?',
    weakness: 'The evidence is "cheap" or common.',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
  },
  'low-fidelity': {
    id: 'low-fidelity',
    name: 'Low Fidelity',
    shortName: 'Low Fidelity',
    keyQuestion: 'How many people "translated" this?',
    weakness: 'The signal is distorted or second-hand.',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
  },
}

export type Domain = 'psychology' | 'AI' | 'policy' | 'everyday' | 'science' | 'medicine' | 'business' | 'health'

// Base card interface
export interface BaseCard {
  id: string
  category: EvidenceCategory
  domain: Domain
  claim: string
  evidence: string
  difficulty?: 1 | 2 | 3
}

// Card for non-discriminating category (swipe-based)
export interface DiscriminatingCard extends BaseCard {
  category: 'non-discriminating'
  alternatives: string[]
  // Compact labels for equation display on reveal
  observationShort: string // Short version of observation for equation
  claimShort: string // Short version of claim for equation
  notClaimShort: string // Short version of ¬claim for equation
  probIfTrue: string // e.g., "HIGH", "LOW"
  probIfFalse: string // e.g., "HIGH", "LOW"
  // For non-discriminating: what observation WOULD discriminate
  discriminatingAlt?: string // e.g., "MAT patients improve MORE than control group"
  correctClassification: SwipeClassification
  explanation: string
  tag: string
}

// Card for filtered-biased category (swipe-based)
export interface BiasedCard extends BaseCard {
  category: 'filtered-biased'
  scenario: string
  correctClassification: BiasClassification
  whatsMissing: string
  explanation: string
  tag: string
}

// Card for buried-baseline category (swipe-based)
export interface BaselineCard extends BaseCard {
  category: 'buried-baseline'
  scenario: string
  correctClassification: BaselineClassification
  theBaseline: string // Legacy field
  // Structured baseline fields for explicit display
  baselineQuestion?: string // e.g., "What percentage of ALL children receive the MMR vaccine?"
  actualBaseline?: string // e.g., "91% of children are vaccinated"
  comparisonInsight?: string // e.g., "87% is actually LOWER than 91%"
  comparisonText?: string // Flowing comparison paragraph for the new reveal format
  frameworkSee?: string // "When you see" part of the generalized framework
  frameworkAsk?: string // "Ask" part of the generalized framework
  explanation: string
  tag: string
}

// Card for low-fidelity category (swipe-based)
export interface FidelityCard extends BaseCard {
  category: 'low-fidelity'
  scenario: string
  correctClassification: FidelityClassification
  sourceAnalysis: string // Analysis of the source quality
  explanation: string
  tag: string
}

// All cards are now swipe-based
export type Card = DiscriminatingCard | BiasedCard | BaselineCard | FidelityCard

// Type guards
export function isDiscriminatingCard(card: Card): card is DiscriminatingCard {
  return card.category === 'non-discriminating'
}

export function isBiasedCard(card: Card): card is BiasedCard {
  return card.category === 'filtered-biased'
}

export function isBaselineCard(card: Card): card is BaselineCard {
  return card.category === 'buried-baseline'
}

export function isFidelityCard(card: Card): card is FidelityCard {
  return card.category === 'low-fidelity'
}

// User response for all swipe-based cards
export interface SwipeResponse {
  cardId: string
  userClassification: AnyClassification
  justification?: string
  wasCorrect: boolean
  timestamp: number
}

export type UserResponse = SwipeResponse

export interface GameSession {
  category: EvidenceCategory
  cards: Card[]
  responses: UserResponse[]
  currentCardIndex: number
  isComplete: boolean
}

export type CardPhase = 'showing' | 'swiped' | 'justifying' | 'answered' | 'revealed'
