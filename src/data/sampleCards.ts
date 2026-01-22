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
      'Patients improved due to placebo effect',
      'Patients improved due to natural recovery over time',
    ],
    correctClassification: 'non-discriminating',
    explanation:
      'Patients would report improvement whether MAT actually works, whether it\'s a placebo effect, or whether they recovered naturally over time. Without a control group, we cannot distinguish which explanation is correct.',
    tag: 'Confirmatory but non-discriminating',
    difficulty: 1,
  },
  {
    id: 'nd-2',
    category: 'non-discriminating',
    domain: 'science',
    claim: 'Veloximab is effective for treating rheumatoid arthritis.',
    evidence: 'In a randomized controlled trial, 70% of patients on Veloximab achieved remission, compared to 22% on placebo.',
    alternatives: [
      'Veloximab is effective',
      'Veloximab is ineffective and results are due to chance',
    ],
    correctClassification: 'discriminating',
    explanation:
      'This evidence genuinely discriminates. If Veloximab were ineffective, we would expect similar remission rates in both groups. The large difference (70% vs 22%) makes the "ineffective" explanation much less likely.',
    tag: 'Genuinely discriminating',
    difficulty: 2,
  },
  {
    id: 'nd-3',
    category: 'non-discriminating',
    domain: 'AI',
    claim: 'NexusLM understands language like humans do.',
    evidence: 'NexusLM passed a rigorous Turing test, with evaluators unable to distinguish its responses from human responses 60% of the time.',
    alternatives: [
      'NexusLM genuinely understands language',
      'NexusLM uses sophisticated pattern matching without understanding',
      'NexusLM memorized responses that humans find convincing',
    ],
    correctClassification: 'non-discriminating',
    explanation:
      'Passing a Turing test doesn\'t distinguish between genuine understanding, sophisticated pattern matching, or memorized responses—all three would produce human-like output. The test measures output quality, not the underlying mechanism.',
    tag: 'Confirmatory but non-discriminating',
    difficulty: 2,
  },
  {
    id: 'nd-4',
    category: 'non-discriminating',
    domain: 'psychology',
    claim: 'Power posing increases confidence and improves performance.',
    evidence: 'Multiple large-scale replication attempts found no consistent effect of power posing on hormone levels, risk-taking behavior, or self-reported confidence.',
    alternatives: [
      'Power posing has real effects',
      'Power posing has no meaningful effect',
    ],
    correctClassification: 'discriminating',
    explanation:
      'Failed replications are discriminating evidence. If power posing worked reliably, we would expect replications to succeed. Consistent failure across multiple studies makes the "real effect" hypothesis much less likely.',
    tag: 'Genuinely discriminating',
    difficulty: 2,
  },
  {
    id: 'nd-5',
    category: 'non-discriminating',
    domain: 'health',
    claim: 'The Mediterranean diet reduces heart disease risk.',
    evidence: 'People who follow a Mediterranean diet have 30% lower rates of heart attacks than those who eat a typical Western diet.',
    alternatives: [
      'The Mediterranean diet directly protects heart health',
      'People who choose this diet are generally more health-conscious',
      'Cultural and lifestyle factors in Mediterranean regions explain the difference',
    ],
    correctClassification: 'non-discriminating',
    explanation:
      'This observational finding can\'t distinguish whether the diet itself protects the heart, whether health-conscious people simply choose better diets, or whether other lifestyle factors explain the difference. People who eat well often exercise more and smoke less too.',
    tag: 'Confounded correlation',
    difficulty: 2,
  },
  {
    id: 'nd-6',
    category: 'non-discriminating',
    domain: 'policy',
    claim: 'Minimum wage increases cause unemployment.',
    evidence: 'Researchers compared employment in adjacent counties across state borders before and after one state raised its minimum wage. Employment trends were nearly identical in both areas.',
    alternatives: [
      'Minimum wage increases cause significant unemployment',
      'Minimum wage increases have little effect on employment',
    ],
    correctClassification: 'discriminating',
    explanation:
      'This difference-in-differences design cleverly controls for regional economic conditions. If minimum wage caused unemployment, we\'d expect diverging trends. Similar trends in adjacent counties make "causes unemployment" less likely.',
    tag: 'Genuinely discriminating',
    difficulty: 3,
  },
]

// ============================================
// 2. FILTERED / BIASED (6 cards)
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
    scenario: 'You\'re choosing a hospital for your father\'s heart surgery. Hospital A proudly shares their outcomes data.',
    claim: 'Mercy Heart Center is among the best cardiac surgery programs.',
    evidence: 'Mercy Heart Center reports a 97% survival rate for bypass surgery, significantly above the national average of 95%.',
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
    id: 'fb-4',
    category: 'filtered-biased',
    domain: 'medicine',
    scenario: 'You\'re deciding whether to get a new vaccine. A health authority presents clinical trial data.',
    claim: 'The Novavex vaccine is effective against severe illness.',
    evidence: 'In a randomized trial of 30,000 participants, severe illness occurred in 5 of 15,000 vaccinated vs. 87 of 15,000 who received placebo.',
    correctClassification: 'legitimate',
    whatsMissing: 'Nothing significant. Randomization ensures comparable groups, and all participants are tracked regardless of outcome.',
    explanation: 'This is legitimate evidence. Randomized controlled trials track everyone enrolled—both successes and failures. The random assignment prevents the selection bias that plagues observational data.',
    tag: 'Unbiased sample',
    difficulty: 2,
  },
  {
    id: 'fb-5',
    category: 'filtered-biased',
    domain: 'everyday',
    scenario: 'Your friend claims a local car dealership is dishonest. She presents evidence.',
    claim: 'AutoMax deceives customers about vehicle conditions.',
    evidence: 'Consumer Reports sent 40 cars with known issues to AutoMax locations. Mechanics were given a checklist to verify. 32 of 40 were diagnosed incorrectly, with inflated repair estimates.',
    correctClassification: 'legitimate',
    whatsMissing: 'Nothing significant. This is a controlled test where investigators knew the true condition of the cars beforehand.',
    explanation: 'Strong evidence. By knowing the ground truth, Consumer Reports could objectively measure deception. This isn\'t relying on complaints (which would be biased toward unhappy customers).',
    tag: 'Controlled test',
    difficulty: 2,
  },
  {
    id: 'fb-6',
    category: 'filtered-biased',
    domain: 'health',
    scenario: 'A wellness influencer promotes their morning routine, showing evidence it leads to success.',
    claim: 'Waking up at 5am makes you more productive and successful.',
    evidence: 'A survey of 200 Fortune 500 executives found that 89% wake up before 6am and credit early rising for their success.',
    correctClassification: 'biased',
    whatsMissing: 'All the early risers who aren\'t executives, and the executives who sleep in. We\'re only surveying people who already succeeded.',
    explanation: 'Survivorship bias plus reverse causation. Successful executives can structure their schedules however they want. The early rising might be an effect of success (control over schedule), not its cause.',
    tag: 'Survivorship bias',
    difficulty: 1,
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
    domain: 'medicine',
    scenario: 'You receive results from a screening test for a rare disease.',
    claim: 'You likely have Syndrome X based on this positive test result.',
    evidence: 'The screening test for Syndrome X is 95% accurate, and your result came back positive.',
    correctClassification: 'baseline-missing',
    theBaseline: 'How common is Syndrome X? If only 1 in 10,000 people have it, even with a 95% accurate test, most positive results are false positives.',
    explanation: 'This is the classic base rate fallacy. If the disease affects 1 in 10,000 people, testing 10,000 people produces ~500 false positives but only 1 true positive. Your positive result is probably wrong, despite the "95% accurate" test.',
    tag: 'Base rate neglect',
    difficulty: 3,
  },
  {
    id: 'bb-2',
    category: 'buried-baseline',
    domain: 'health',
    scenario: 'Employees at a tech company are concerned about a potential cancer cluster.',
    claim: 'Working at this office building increases cancer risk.',
    evidence: 'Five employees in this 300-person office have been diagnosed with cancer over the past three years.',
    correctClassification: 'baseline-missing',
    theBaseline: 'What\'s the expected cancer rate for 300 adults over three years? About 1 in 100 adults are diagnosed with cancer annually, so 9 cases would be expected—making 5 cases actually lower than average.',
    explanation: 'Cancer is surprisingly common in the general population. Before panicking about a "cluster," you need to know the baseline rate. Five cases among 300 people over three years might sound scary but is actually below statistical expectation.',
    tag: 'Base rate neglect',
    difficulty: 2,
  },
  {
    id: 'bb-3',
    category: 'buried-baseline',
    domain: 'business',
    scenario: 'A startup accelerator promotes its track record to attract applicants.',
    claim: 'TechLaunch Accelerator dramatically increases your odds of startup success.',
    evidence: 'Companies that complete our program have a 34% success rate—that\'s triple the typical startup success rate of around 10%.',
    correctClassification: 'baseline-considered',
    theBaseline: 'The comparison to the 10% typical success rate provides meaningful context. We can see the accelerator claims 3x improvement over the baseline.',
    explanation: 'This evidence actually does consider the baseline by comparing to typical startup outcomes. However, you might still question whether their graduates would have succeeded anyway (selection bias)—but that\'s a different flaw than missing baselines.',
    tag: 'Baseline considered',
    difficulty: 2,
  },
  {
    id: 'bb-4',
    category: 'buried-baseline',
    domain: 'AI',
    scenario: 'Your company\'s HR department is evaluating an AI resume screening tool.',
    claim: 'ResumeAI accurately identifies high-performing candidates.',
    evidence: 'Our AI correctly predicted "strong performer" status for 78% of candidates who later received high performance ratings.',
    correctClassification: 'baseline-missing',
    theBaseline: 'What percentage of hires typically become strong performers anyway? If 70% of all hires perform well regardless of how they\'re selected, 78% is barely an improvement.',
    explanation: 'A 78% accuracy sounds impressive in isolation. But if your hiring bar is already decent and 70% of hires perform well anyway, the AI adds only marginal value. The key question: how much better is 78% than what you\'d get without the AI?',
    tag: 'Missing comparison',
    difficulty: 2,
  },
  {
    id: 'bb-5',
    category: 'buried-baseline',
    domain: 'policy',
    scenario: 'A city official presents data on a new traffic safety initiative.',
    claim: 'Vision Zero has made our streets safer for pedestrians.',
    evidence: 'Pedestrian fatalities dropped from 127 last year to 98 this year—a 23% reduction since implementing Vision Zero.',
    correctClassification: 'baseline-considered',
    theBaseline: 'The comparison to last year\'s figure provides a relevant baseline. We can see a before/after comparison that shows actual change.',
    explanation: 'This is properly contextualized. The year-over-year comparison lets us evaluate whether things improved. While you could still ask about other factors (weather, gas prices, economic changes), the baseline question is addressed.',
    tag: 'Baseline considered',
    difficulty: 2,
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
