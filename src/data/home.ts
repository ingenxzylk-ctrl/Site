export type Cause = {
  icon: string
  title: string
  desc: string
}

export type Offer = {
  icon: string
  title: string
  desc: string
}

export type Stage = {
  n: string
  ok: boolean
}

export type TimelineItem = {
  m: string
  h: string
  d: string
}

export type Product = {
  icon: string
  tag: string | null
  name: string
  desc: string
  rating: number
  count: number
  price: number
  old: number | null
  category: 'growth' | 'loss' | 'dandruff'
}

export type FilterDef = {
  key: 'all' | Product['category']
  label: string
}

export const causes: Cause[] = [
  {
    icon: 'dna',
    title: 'Genetics',
    desc: 'Androgenetic patterns inherited from either side of the family can shrink follicles over time.',
  },
  {
    icon: 'metabolism',
    title: 'Metabolism',
    desc: "Thyroid and hormonal shifts change how nutrients travel from your body to your scalp.",
  },
  {
    icon: 'stress',
    title: 'Stress',
    desc: 'Cortisol spikes can push healthy follicles into a resting phase, prematurely.',
  },
  {
    icon: 'dandruff',
    title: 'Dandruff',
    desc: 'An inflamed scalp struggles to hold onto hair long enough for it to fully grow.',
  },
  {
    icon: 'gut',
    title: 'Gut Issues',
    desc: 'Poor nutrient absorption starves follicles of the building blocks they need most.',
  },
  {
    icon: 'nutrition',
    title: 'Nutrition',
    desc: 'Iron, protein and biotin gaps often show up on your scalp before anywhere else.',
  },
]

export const offers: Offer[] = [
  {
    icon: 'kit',
    title: 'Customized Kit',
    desc: 'Formulated around your exact scalp profile — never a generic bottle off the shelf.',
  },
  {
    icon: 'doctor',
    title: 'Doctor Review',
    desc: 'A registered dermatologist reviews your assessment before anything ships to you.',
  },
  {
    icon: 'coach',
    title: 'Free Wellness Coach',
    desc: 'Ongoing check-ins that keep your routine on track, at no extra cost.',
  },
  {
    icon: 'nutplan',
    title: 'Free Nutrition Plan',
    desc: 'Diet guidance built around what your gut-hair axis actually needs to recover.',
  },
  {
    icon: 'genomic',
    title: 'Free Advanced Genomic Guidance',
    desc: 'Understand your inherited hair-loss pattern and what it means for your plan.',
  },
  {
    icon: 'consult',
    title: 'Consultation',
    desc: 'A one-on-one call to walk through your results and next steps, in plain language.',
  },
]

export const stagesMale: Stage[] = [
  { n: '1', ok: true },
  { n: '2', ok: true },
  { n: '3', ok: true },
  { n: '4', ok: true },
  { n: '5', ok: false },
  { n: '6', ok: false },
]

export const stagesFemale: Stage[] = [
  { n: 'I', ok: true },
  { n: 'I–II', ok: true },
  { n: 'II', ok: true },
  { n: 'III', ok: false },
]

export const timelineMale: TimelineItem[] = [
  {
    m: 'Month 1–3',
    h: 'Shedding slows',
    d: 'Scalp inflammation reduces and early activity begins deep in the follicle bulbs.',
  },
  {
    m: 'Month 4–6',
    h: 'Baby hairs appear',
    d: 'Visible fine regrowth along the hairline; strand diameter thickens under the lab lens.',
  },
  {
    m: 'Month 7+',
    h: 'Density returns',
    d: 'New growth blends with existing hair as visible density returns to earlier levels.',
  },
]

export const timelineFemale: TimelineItem[] = [
  {
    m: 'Month 1–3',
    h: 'Fall reduces',
    d: 'Daily shedding noticeably drops as the scalp environment starts to stabilize.',
  },
  {
    m: 'Month 4–6',
    h: 'Volume builds',
    d: 'Part-line coverage improves and strands feel visibly thicker to the touch.',
  },
  {
    m: 'Month 7+',
    h: 'Fullness restored',
    d: 'Overall volume and part-line density return closer to pre-hair-fall levels.',
  },
]

export const products: Product[] = [
  {
    icon: 'bottle',
    tag: 'Bestseller',
    name: 'Regrowth Hair Oil',
    desc: 'Lightweight daily oil with redensyl and rosemary to wake up dormant follicles.',
    rating: 4.7,
    count: 2140,
    price: 899,
    old: 1199,
    category: 'growth',
  },
  {
    icon: 'dropper',
    tag: null,
    name: 'Density Serum',
    desc: 'Leave-in serum targeting thinning zones with peptides and caffeine complex.',
    rating: 4.6,
    count: 1580,
    price: 1249,
    old: null,
    category: 'growth',
  },
  {
    icon: 'capsule',
    tag: 'Doctor Pick',
    name: 'Hair Growth Supplements',
    desc: 'Biotin, iron and zinc formulated to support growth from the inside out.',
    rating: 4.8,
    count: 3020,
    price: 749,
    old: 999,
    category: 'growth',
  },
  {
    icon: 'jar',
    tag: null,
    name: 'Anti-Dandruff Scalp Mask',
    desc: 'Weekly clay mask that calms flaking and rebalances an inflamed scalp.',
    rating: 4.5,
    count: 960,
    price: 649,
    old: null,
    category: 'dandruff',
  },
  {
    icon: 'spray',
    tag: null,
    name: 'Scalp Cooling Spray',
    desc: 'Instant-relief spray for itch and tightness caused by stress and heat.',
    rating: 4.4,
    count: 540,
    price: 449,
    old: 599,
    category: 'dandruff',
  },
  {
    icon: 'roller',
    tag: null,
    name: 'Micro Derma Roller',
    desc: '0.25mm titanium roller to boost absorption of your serum and oil.',
    rating: 4.6,
    count: 1210,
    price: 599,
    old: null,
    category: 'loss',
  },
  {
    icon: 'comb',
    tag: 'New',
    name: 'Scalp Massage Comb',
    desc: 'Ergonomic silicone comb that improves circulation during oil application.',
    rating: 4.3,
    count: 410,
    price: 349,
    old: null,
    category: 'loss',
  },
  {
    icon: 'gummy',
    tag: null,
    name: 'Biotin Gummies',
    desc: 'Great-tasting daily gummies with biotin, folic acid and vitamin E.',
    rating: 4.7,
    count: 1870,
    price: 699,
    old: 899,
    category: 'loss',
  },
]

export const filterDefs: FilterDef[] = [
  { key: 'all', label: 'All Products' },
  { key: 'growth', label: 'Hair Growth' },
  { key: 'loss', label: 'Hair Loss' },
  { key: 'dandruff', label: 'Dandruff' },
]
