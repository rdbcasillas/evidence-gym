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
    domain: 'business',
    claim: 'TechCorp\'s hiring algorithm is free from gender bias.',
    evidence: 'Researchers submitted 500 identical resumes with randomly assigned male and female names. The algorithm recommended candidates at the same rate regardless of the name on the resume.',
    alternatives: [
      'The algorithm is unbiased',
      'The algorithm is biased but the test didn\'t detect it',
    ],
    correctClassification: 'discriminating',
    explanation:
      'This is a well-designed audit. If the algorithm were biased against women, we would expect lower recommendation rates for female names. Equal rates with identical qualifications is what we\'d see only if the algorithm treats genders equally.',
    tag: 'Genuinely discriminating',
    difficulty: 2,
  },
  {
    id: 'nd-3',
    category: 'non-discriminating',
    domain: 'AI',
    claim: 'NexusLM demonstrates genuine semantic understanding, not just statistical pattern matching.',
    evidence: 'In a double-blind evaluation, a panel of linguistics experts were unable to distinguish NexusLM\'s responses from human responses 87% of the time—well above the 70% threshold typically used to establish human-equivalent performance.',
    alternatives: [
      'NexusLM genuinely understands language',
      'NexusLM uses sophisticated pattern matching without understanding',
      'NexusLM memorized responses that humans find convincing',
    ],
    correctClassification: 'non-discriminating',
    explanation:
      'Impressive performance on behavioral tests doesn\'t distinguish genuine understanding from sophisticated mimicry. A very good pattern matcher and a genuine understander would both produce human-like responses. The test measures output quality, not the underlying cognitive mechanism.',
    tag: 'Confirmatory but non-discriminating',
    difficulty: 2,
  },
  {
    id: 'nd-4',
    category: 'non-discriminating',
    domain: 'everyday',
    claim: 'Expensive wines taste better than cheap wines.',
    evidence: 'A survey of 1,200 wine drinkers found that those who regularly buy wines over $50 report significantly higher satisfaction with their wine experiences than those who buy wines under $15.',
    alternatives: [
      'Expensive wines genuinely taste better',
      'Expensive wine buyers have different expectations or contexts',
    ],
    correctClassification: 'non-discriminating',
    explanation:
      'This evidence doesn\'t discriminate. People who spend more on wine might have higher expectations, more knowledge about pairing, drink in nicer settings, or simply feel satisfied because they spent more. We\'d see this same pattern even if the wine itself tasted identical.',
    tag: 'Confounded correlation',
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
    domain: 'science',
    claim: 'Einstein\'s general relativity models gravitational effects more accurately than Newtonian mechanics.',
    evidence: 'Einstein\'s theory predicted light would bend 1.75 arcseconds around the sun; Newton\'s theory predicted only 0.87 arcseconds. During the 1919 solar eclipse, astronomers measured 1.61 arcseconds—much closer to Einstein\'s prediction.',
    alternatives: [
      'General relativity is correct',
      'Newtonian gravity is sufficient',
    ],
    correctClassification: 'discriminating',
    explanation:
      'This is textbook discriminating evidence. Einstein\'s theory predicted a specific, measurable value that differed from the competing theory. The observation matched one prediction and ruled out the other—exactly what good evidence should do.',
    tag: 'Genuinely discriminating',
    difficulty: 2,
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
    id: 'fb-4',
    category: 'filtered-biased',
    domain: 'medicine',
    scenario: 'You\'re deciding whether to get a new vaccine. A health authority presents data from the initial rollout.',
    claim: 'The Novavex vaccine is effective against severe illness.',
    evidence: 'Data from 30,000 people during the vaccine rollout showed severe illness in 5 of 15,000 who got vaccinated vs. 87 of 15,000 who remained unvaccinated.',
    correctClassification: 'biased',
    whatsMissing: 'Who chose to get vaccinated first? Early adopters tend to be younger, healthier, more health-conscious, and have better healthcare access. The groups aren\'t comparable.',
    explanation: 'This is observational data with severe selection bias. People who rush to get vaccinated differ systematically from those who don\'t. The vaccinated group\'s better outcomes might reflect their baseline health, not the vaccine\'s effect.',
    tag: 'Selection bias',
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
