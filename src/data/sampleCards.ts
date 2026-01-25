import type { DiscriminatingCard, BiasedCard, BaselineCard, FidelityCard, Card, EvidenceCategory } from '@/types'

// ============================================
// 1. NON-DISCRIMINATING (6 cards)
// Key Question: "Would I see this if the claim were false?"
// Users judge: Discriminates or Doesn't Discriminate
// ============================================

const nonDiscriminatingCards: DiscriminatingCard[] = [
  {
    id: 'nd-1',
    category: 'non-discriminating',
    domain: 'psychology',
    claim: 'Mindful Awareness Therapy (MAT) is effective for treating depression.',
    evidence: 'Patients who completed the 8-week MAT program reported significant improvements in mood and daily functioning.',
    alternatives: [
      'MAT works as claimed',
      'Patients improved due to placebo effect or natural recovery',
    ],
    observationShort: 'patients improve',
    claimShort: 'MAT works',
    notClaimShort: 'MAT is placebo',
    probIfTrue: 'likely',
    probIfFalse: 'also likely',
    discriminatingAlt: 'MAT patients improve significantly MORE than a control group receiving placebo therapy',
    correctClassification: 'non-discriminating',
    explanation:
      'We might see this evidence either way. Patients could report improvement whether MAT actually works or not—placebo effects and natural recovery over 8 weeks can produce the same observation.',
    tag: 'Confirmatory but non-discriminating',
    difficulty: 1,
  },
  {
    id: 'nd-2',
    category: 'non-discriminating',
    domain: 'business',
    claim: 'TechCorp\'s hiring algorithm is free from gender bias.',
    evidence: 'Researchers submitted 500 identical resumes with randomly assigned male and female names. The algorithm recommended candidates at the same rate regardless of the name on the resume.',
    alternatives: [
      'The algorithm is unbiased',
      'The algorithm is biased against women',
    ],
    observationShort: 'equal rates',
    claimShort: 'unbiased',
    notClaimShort: 'biased',
    probIfTrue: 'expected',
    probIfFalse: 'unlikely',
    correctClassification: 'discriminating',
    explanation:
      'These probabilities differ. Equal rates are expected if unbiased, but unlikely if biased. The observation helps rule out the "biased" hypothesis.',
    tag: 'Genuinely discriminating',
    difficulty: 2,
  },
  {
    id: 'nd-3',
    category: 'non-discriminating',
    domain: 'AI',
    claim: 'NexusLM demonstrates genuine semantic understanding, not just statistical pattern matching.',
    evidence: 'In a double-blind evaluation, linguistics experts were unable to distinguish NexusLM\'s responses from human responses 87% of the time.',
    alternatives: [
      'NexusLM genuinely understands language',
      'NexusLM is a sophisticated pattern matcher',
    ],
    observationShort: 'human-like responses',
    claimShort: 'genuine understanding',
    notClaimShort: 'pattern matching',
    probIfTrue: 'likely',
    probIfFalse: 'also likely',
    discriminatingAlt: 'NexusLM correctly answers novel questions that require reasoning about concepts never seen in training data',
    correctClassification: 'non-discriminating',
    explanation:
      'We might see this evidence either way. A genuine understander and a sophisticated pattern matcher could both produce human-like responses. The test measures output quality, not the underlying mechanism.',
    tag: 'Confirmatory but non-discriminating',
    difficulty: 2,
  },
  {
    id: 'nd-4',
    category: 'non-discriminating',
    domain: 'psychology',
    claim: 'Playing violent video games causes aggressive behavior in teenagers.',
    evidence: 'A study found that teenagers who play violent video games for more than 3 hours daily show higher levels of aggressive thoughts and behaviors compared to those who don\'t play.',
    alternatives: [
      'Violent games cause aggression',
      'Aggressive teens are drawn to violent games',
    ],
    observationShort: 'gamers more aggressive',
    claimShort: 'games cause aggression',
    notClaimShort: 'aggressive teens choose games',
    probIfTrue: 'likely',
    probIfFalse: 'also likely',
    discriminatingAlt: 'Randomly assigning teens to play violent vs. non-violent games shows the violent game group becomes MORE aggressive',
    correctClassification: 'non-discriminating',
    explanation:
      'We might see this correlation either way. Whether games cause aggression OR aggressive people simply prefer violent games, both could produce the same observation.',
    tag: 'Confounded correlation',
    difficulty: 2,
  },
]

// ============================================
// 2. FILTERED / BIASED (4 cards)
// Key Question: "What am I not seeing?"
// Users judge: Biased/Filtered or Legitimate
// ============================================

const filteredBiasedCards: BiasedCard[] = [
  {
    id: 'fb-1',
    category: 'filtered-biased',
    domain: 'business',
    scenario: 'You\'re considering dropping out of college to start a company. A friend shares evidence to support this decision.',
    claim: 'Dropping out of college leads to entrepreneurial success.',
    evidence: 'Bill Gates, Mark Zuckerberg, Steve Jobs, and Michael Dell all dropped out and became tech billionaires.',
    correctClassification: 'biased',
    whatsMissing: 'The millions of college dropouts who didn\'t become billionaires. You only hear about the rare, spectacular successes.',
    explanation: 'Classic survivorship bias. We only see dropouts who succeeded spectacularly. For every Gates, there are thousands of dropouts struggling financially—they just don\'t make the news.',
    tag: 'Survivorship bias',
    difficulty: 1,
  },
  {
    id: 'fb-2',
    category: 'filtered-biased',
    domain: 'medicine',
    scenario: 'You\'re choosing a hospital for your father\'s heart surgery. While researching, you discover Mercy Heart Center\'s outcome data.',
    claim: 'Mercy Heart Center is among the best cardiac surgery programs.',
    evidence: 'Mercy Heart Center reports a 97% survival rate for bypass surgery, significantly above the national average of 92%.',
    correctClassification: 'biased',
    whatsMissing: 'Which patients Mercy accepts vs. refers elsewhere. Elite hospitals often decline high-risk cases that would hurt their statistics.',
    explanation: 'Selection bias. Prestigious hospitals can choose their patients, referring complex cases to academic medical centers. Their excellent stats may reflect patient selection, not surgical skill.',
    tag: 'Selection bias',
    difficulty: 2,
  },
  {
    id: 'fb-3',
    category: 'filtered-biased',
    domain: 'AI',
    scenario: 'Your company is evaluating an AI resume screening tool. The vendor presents their evidence.',
    claim: 'TalentAI identifies high-performing candidates.',
    evidence: 'Companies using TalentAI report that 82% of candidates it recommends receive strong performance reviews after one year.',
    correctClassification: 'biased',
    whatsMissing: 'How the candidates TalentAI rejected would have performed. They were never hired, so there\'s no data.',
    explanation: 'We can\'t evaluate the road not taken. Maybe TalentAI rejects equally qualified candidates. Without hiring some rejected candidates as a control, this evidence proves nothing about the AI\'s accuracy.',
    tag: 'Missing counterfactual',
    difficulty: 2,
  },
  {
    id: 'fb-6',
    category: 'filtered-biased',
    domain: 'business',
    scenario: 'A language learning app promotes its effectiveness with data from their platform.',
    claim: 'LingoMaster is highly effective for language learning.',
    evidence: 'Users who completed our 90-day program improved their proficiency test scores by an average of 52% compared to when they started.',
    correctClassification: 'biased',
    whatsMissing: 'What happened to users who didn\'t complete the program? Most users drop out. The 52% improvement only reflects the motivated few who stuck with it.',
    explanation: 'This is completion bias. The people who finish a 90-day program are not typical users—they\'re the most motivated, disciplined, or talented. The app might be useless for the 85% who dropped out after week two.',
    tag: 'Completion bias',
    difficulty: 2,
  },
]

// ============================================
// 3. BURIED BASELINE (6 cards)
// Key Question: "How common is this anyway?"
// Users judge: Baseline Missing or Baseline Considered
// ============================================

const buriedBaselineCards: BaselineCard[] = [
  {
    id: 'bb-1',
    category: 'buried-baseline',
    domain: 'health',
    scenario: 'A parent shares concerns about vaccines at a school board meeting.',
    claim: 'Vaccines are linked to autism.',
    evidence: 'In a study of 1,000 children diagnosed with autism, 87% had received the MMR vaccine before their diagnosis.',
    correctClassification: 'baseline-missing',
    theBaseline: 'What percentage of ALL children receive the MMR vaccine? About 91% of children are vaccinated. So 87% among autistic children is actually slightly lower than the general population.',
    baselineQuestion: 'What percentage of ALL children receive the MMR vaccine?',
    actualBaseline: '91% of children are vaccinated',
    comparisonInsight: '87% among autistic children is actually LOWER than the 91% general population rate',
    explanation: 'The 87% sounds alarming until you realize it\'s actually lower than the vaccination rate in the general population. If vaccines caused autism, you\'d expect a higher rate among autistic children, not a lower one. This evidence, if anything, points the other direction.',
    tag: 'Base rate neglect',
    difficulty: 3,
  },
  {
    id: 'bb-2',
    category: 'buried-baseline',
    domain: 'business',
    scenario: 'A cognitive enhancement supplement shows customer testimonials.',
    claim: 'NeuroBoost significantly improves cognitive performance.',
    evidence: 'In our 90-day study, users who took NeuroBoost improved their scores on a standardized cognitive test by an average of 12 points.',
    correctClassification: 'baseline-missing',
    theBaseline: 'How much do people improve on the same test just from practice and familiarity? Test-retest effects often show 8-15 point improvements with no intervention at all.',
    baselineQuestion: 'How much do people improve just from practice and familiarity?',
    actualBaseline: '8-15 point improvements with no intervention at all',
    comparisonInsight: 'The 12-point improvement falls WITHIN the normal practice effect range',
    explanation: 'Cognitive tests have well-documented practice effects—people get better at them just by taking them repeatedly. Without a control group taking the same test on the same schedule, we can\'t know if NeuroBoost added anything beyond normal improvement.',
    tag: 'Missing control group',
    difficulty: 2,
  },
  {
    id: 'bb-3',
    category: 'buried-baseline',
    domain: 'medicine',
    scenario: 'A hospital advertises its cardiac surgery outcomes.',
    claim: 'Our cardiac surgery program delivers exceptional outcomes.',
    evidence: 'Our bypass surgery patients have a 97.2% survival rate, and 89% report improved quality of life at 6-month follow-up.',
    correctClassification: 'baseline-missing',
    theBaseline: 'What\'s the national average for bypass surgery survival? It\'s about 97-98%. And what percentage of bypass patients typically report improvement? Without these comparisons, we can\'t evaluate "exceptional."',
    baselineQuestion: 'What\'s the national average for bypass surgery survival?',
    actualBaseline: '97-98% survival rate nationally',
    comparisonInsight: '97.2% is actually AVERAGE, not exceptional—it\'s right at the national rate',
    explanation: 'The numbers sound impressive in isolation, but bypass surgery generally has high survival rates. This hospital might be average, below average, or above average—we simply can\'t tell without knowing what\'s typical. "97.2%" feels precise and therefore trustworthy, but precision isn\'t the same as comparison.',
    tag: 'Missing comparison',
    difficulty: 3,
  },
  {
    id: 'bb-4',
    category: 'buried-baseline',
    domain: 'science',
    scenario: 'A pharmaceutical company presents trial results to the FDA.',
    claim: 'Nexapril effectively treats moderate depression.',
    evidence: 'After 8 weeks, 52% of patients taking Nexapril showed clinically significant improvement, compared to 31% of patients taking placebo.',
    correctClassification: 'baseline-considered',
    theBaseline: 'The placebo group IS the baseline. The 31% placebo response tells us how many would improve anyway, letting us see that Nexapril adds about 21 percentage points of benefit.',
    baselineQuestion: 'How many patients would improve without the drug?',
    actualBaseline: '31% improve with placebo alone',
    comparisonInsight: 'The baseline IS provided—52% vs 31% shows a real 21 percentage point benefit',
    explanation: 'This is properly controlled evidence. Depression has high placebo response rates, so the comparison is essential. The drug shows a real effect (52% vs 31%), and we can quantify exactly how much it adds beyond spontaneous improvement and placebo effect.',
    tag: 'Baseline considered',
    difficulty: 2,
  },
  {
    id: 'bb-5',
    category: 'buried-baseline',
    domain: 'policy',
    scenario: 'A police department defends its use of a predictive policing algorithm.',
    claim: 'PredictCrime accurately identifies high-risk areas.',
    evidence: 'Last quarter, 73% of burglaries occurred in areas the algorithm had flagged as high-risk.',
    correctClassification: 'baseline-missing',
    theBaseline: 'What percentage of the city did the algorithm flag as "high-risk"? If it flagged 80% of neighborhoods, then 73% of crimes occurring there is actually worse than random.',
    baselineQuestion: 'What percentage of the city did the algorithm flag as "high-risk"?',
    actualBaseline: 'If it flagged 80% of neighborhoods...',
    comparisonInsight: '73% of crimes in 80% of areas is actually WORSE than random guessing',
    explanation: 'The algorithm sounds effective until you ask how much area it flagged. If it marked most of the city as high-risk, of course most crimes happen there. A useful prediction needs to be specific—flagging everywhere is the same as flagging nowhere.',
    tag: 'Base rate neglect',
    difficulty: 3,
  },
]

// ============================================
// 4. LOW FIDELITY (6 cards)
// Key Question: "How many people 'translated' this?"
// Users judge: Low Fidelity or High Fidelity
// ============================================

const lowFidelityCards: FidelityCard[] = [
  {
    id: 'lf-1',
    category: 'low-fidelity',
    domain: 'science',
    scenario: 'You see an exciting health headline while scrolling through news.',
    claim: 'Drinking coffee prevents Alzheimer\'s disease.',
    evidence: 'A news headline reports: "Scientists Discover Coffee Could Be Key to Preventing Alzheimer\'s — New Study Reveals Breakthrough."',
    correctClassification: 'low-fidelity',
    sourceAnalysis: 'This has passed through multiple translations: original research → university press release → news editor → headline writer. Each step tends to amplify and sensationalize.',
    explanation: 'Headlines are optimized for clicks, not accuracy. The original study might have found a tiny correlation in mice, or been very preliminary. By the time it becomes a headline, nuance is gone and uncertainty is hidden.',
    tag: 'Multiple translations',
    difficulty: 1,
  },
  {
    id: 'lf-2',
    category: 'low-fidelity',
    domain: 'everyday',
    scenario: 'Your coworker tells you about an amazing investment opportunity.',
    claim: 'You can double your money with this crypto trading strategy.',
    evidence: 'My coworker says his brother-in-law made $200,000 last year using this trading method.',
    correctClassification: 'low-fidelity',
    sourceAnalysis: 'This is third-hand information: brother-in-law → coworker → you. No documentation, high potential for exaggeration at each step, and motivated reasoning (the coworker wants to believe it).',
    explanation: 'Each retelling adds embellishment. The $200K might have been $20K, the "strategy" might have been luck, and losses are conveniently forgotten. You\'re hearing the most optimistic version of an already-filtered story.',
    tag: 'Third-hand account',
    difficulty: 1,
  },
  {
    id: 'lf-3',
    category: 'low-fidelity',
    domain: 'policy',
    scenario: 'Your social media feed shows a clip of a politician that\'s generating outrage.',
    claim: 'Senator Williams said something deeply offensive about immigrants.',
    evidence: 'A 15-second video clip shared by a partisan account shows Senator Williams appearing to make a derogatory statement about immigrants.',
    correctClassification: 'low-fidelity',
    sourceAnalysis: 'A short clip from a partisan source is highly suspect. Editing, context removal, and selective framing can completely change the meaning of someone\'s words.',
    explanation: 'Viral clips are often misleadingly edited. The full context might show sarcasm, a quote being attributed to someone else, or a hypothetical being presented. Always seek the full, unedited source before judging.',
    tag: 'Edited/decontextualized',
    difficulty: 2,
  },
  {
    id: 'lf-4',
    category: 'low-fidelity',
    domain: 'health',
    scenario: 'A wellness blog promotes an ancient remedy.',
    claim: 'Ashwagandha has been used for 3,000 years to boost energy and reduce stress.',
    evidence: 'The blog states: "Ancient Ayurvedic practitioners discovered ashwagandha\'s powerful healing properties millennia ago, and modern science is finally catching up."',
    correctClassification: 'low-fidelity',
    sourceAnalysis: 'A wellness blog claiming "ancient wisdom" with no citations. The historical claim is unverified, and "modern science catching up" is vague. This is marketing, not evidence.',
    explanation: 'Wellness marketing often invents or exaggerates historical claims. "Used for thousands of years" sounds impressive but proves nothing about efficacy—bloodletting was used for millennia too. Demand actual studies.',
    tag: 'Unverified claims',
    difficulty: 2,
  },
  {
    id: 'lf-5',
    category: 'low-fidelity',
    domain: 'science',
    scenario: 'You want to know if a supplement actually works, so you look up the research.',
    claim: 'Omega-3 supplements reduce cardiovascular risk.',
    evidence: 'A 2019 meta-analysis in the Journal of the American College of Cardiology analyzed 13 randomized trials with 127,477 participants and found a statistically significant 8% reduction in heart attack risk.',
    correctClassification: 'high-fidelity',
    sourceAnalysis: 'This is primary source: a peer-reviewed meta-analysis in a major journal, combining multiple RCTs, with transparent methodology and specific numbers.',
    explanation: 'This is high-fidelity evidence. Meta-analyses of randomized trials are near the top of the evidence hierarchy. The source is clear, the methodology is rigorous, and you can verify the claims directly.',
    tag: 'Primary source',
    difficulty: 2,
  },
  {
    id: 'lf-6',
    category: 'low-fidelity',
    domain: 'business',
    scenario: 'You\'re researching whether to hire a particular contractor for home renovations.',
    claim: 'BuildRight Construction does quality work.',
    evidence: 'You visited three completed BuildRight projects in your neighborhood, spoke directly with the homeowners, and inspected the work yourself.',
    correctClassification: 'high-fidelity',
    sourceAnalysis: 'This is direct, first-hand observation. You saw the evidence yourself and spoke to primary sources (the actual customers) without intermediaries.',
    explanation: 'High fidelity. You\'re not relying on curated testimonials or online reviews—you verified directly. First-hand inspection with multiple data points is about as reliable as consumer research gets.',
    tag: 'First-hand verification',
    difficulty: 1,
  },
]

// ============================================
// Export all cards and helper functions
// ============================================

export const allCards: Card[] = [
  ...nonDiscriminatingCards,
  ...filteredBiasedCards,
  ...buriedBaselineCards,
  ...lowFidelityCards,
]

export function getCardsByCategory(category: EvidenceCategory): Card[] {
  return allCards.filter((card) => card.category === category)
}

export function shuffleCards<T extends Card>(cards: T[]): T[] {
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }
  return shuffled
}
