import { useEffect, useRef, useState } from 'react'
import './styles/home.css'

const bottleImg = '/zylk-bottle.png'
const progressImgs = [
  { src: '/progress-1mo.png', label: '1 mo.' },
  { src: '/progress-2-4mo.png', label: '2–4 mo.' },
  { src: '/progress-4-6mo.png', label: '4–6 mo.' },
  { src: '/progress-6mo.png', label: '6+ mo.' },
]

/* ---------- ICONS ---------- */
const icons = {
  dna: '<path d="M6 3c0 6 12 12 12 18M18 3c0 6-12 12-12 18M7 8h10M7 16h10"/>',
  metabolism: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  stress:
    '<circle cx="12" cy="10" r="6"/><path d="M9 21c0-2 1.5-3 3-3s3 1 3 3"/><path d="M9 9c.5-1.5 2-1.5 3-.5 1-1 2.5-1 3 .5"/>',
  dandruff:
    '<path d="M12 2c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z"/><circle cx="6" cy="19" r="1"/><circle cx="17" cy="18" r=".7"/>',
  gut: '<path d="M6 4c0 3 3 3 3 6s-3 3-3 6 3 3 3 5M12 4c0 3 3 3 3 6s-3 3-3 6 3 3 3 5"/>',
  nutrition:
    '<path d="M12 21c-5-2-8-6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5-3 9-8 11z"/><path d="M12 10V4"/>',
  kit: '<path d="M4 8h16l-1 12H5L4 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  doctor:
    '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/><path d="M12 12v4M10 14h4"/>',
  coach:
    '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 6-5"/><path d="M16 4l1.5 1.5L21 2"/><circle cx="17" cy="15" r="4"/>',
  nutplan:
    '<path d="M4 4h16v4H4z"/><path d="M6 8v12h12V8"/><path d="M9 12h6M9 16h6"/>',
  genomic:
    '<path d="M4 6c4 2 4 4 8 4s4-2 8-4M4 12c4 2 4 4 8 4s4-2 8-4M4 18c4 2 4 4 8 4s4-2 8-4" transform="translate(0,-6)"/>',
  consult:
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  cross:
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  bottle:
    '<path d="M10 2h4v3l2 2v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7l2-2z"/><path d="M8 12h8"/>',
  dropper:
    '<path d="M9 2h6l-1 6-3 3-3-3-1-6z"/><path d="M12 11v9"/><circle cx="12" cy="21" r="1.4"/>',
  jar: '<path d="M6 9h12v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z"/><path d="M5 6h14v3H5z"/>',
  capsule:
    '<rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-30 12 12)"/><line x1="10" y1="8" x2="14" y2="16"/>',
  comb: '<path d="M4 4h16v4H4z"/><path d="M6 8v12M9 8v12M12 8v12M15 8v12M18 8v12"/>',
  roller: '<circle cx="12" cy="9" r="3"/><path d="M12 12v8M9 16h6"/>',
  gummy:
    '<path d="M12 3c4 0 6 3 6 7s-2 8-6 8-6-4-6-8 2-7 6-7z"/><path d="M9 10c1 1 5 1 6 0"/>',
  spray: '<path d="M9 6h4v3h4l1 2v11H8V11l1-2z" /><path d="M9 6V3h4v3"/>',
  cart: '<path d="M4 4h2l1.4 11.2A2 2 0 0 0 9.4 17h7.2a2 2 0 0 0 2-1.6L20 8H6"/><circle cx="10" cy="21" r="1.2" fill="currentColor" stroke="none"/><circle cx="17" cy="21" r="1.2" fill="currentColor" stroke="none"/>',
  bag: '<path d="M6 8h12l-.8 12.2A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.8L6 8z"/><path d="M9 8V6.5A3 3 0 0 1 12 3.5 3 3 0 0 1 15 6.5V8"/>',
  star: '<polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2" fill="currentColor" stroke="none"/>',
  headM:
    '<path d="M12 3C7 3 5 7 5 11c0 5 2 8 2 10h10c0-2 2-5 2-10 0-4-2-8-7-8z"/>',
  headF:
    '<path d="M12 3c-5 0-7 4-7 9 0 5 2 8 2 9h10c0-1 2-4 2-9 0-5-2-9-7-9z"/><path d="M5 10c0 3 1 3 1 6M19 10c0 3-1 3-1 6"/>',
  users:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  checkCircle:
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  starOutline:
    '<polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2"/>',
  whatsapp:
    '<path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L3 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5z"/><path d="M9.2 8.4c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .55.4.2.55.7 1.7.75 1.85.05.15.1.3 0 .5-.1.2-.15.35-.3.5l-.4.45c-.15.15-.3.35-.1.65.2.3.8 1.25 1.7 2.05 1.15 1 2.05 1.3 2.35 1.45.3.15.5.1.65-.1.2-.2.8-.9 1-1.2.2-.3.4-.25.7-.15.25.1 1.65.8 1.95.95.3.15.5.2.55.35.1.2.1 1.1-.25 1.55-.35.45-1.4 1.1-2.4 1.1-1 0-2.55-.35-4.6-2.25-2.45-2.2-3.95-4.6-4.15-4.95-.2-.35-1.1-1.6-1.1-2.95 0-1.35.7-2 .95-2.25z"/>',
  menu: '<path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h10"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  person:
    '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  youtube:
    '<rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><line x1="8" y1="10" x2="8" y2="16"/><circle cx="8" cy="7" r=".5" fill="currentColor"/><path d="M12 16v-3.5a2 2 0 0 1 4 0V16"/>',
  close:
    '<path d="M6.5 6.5l11 11"/><path d="M17.5 6.5l-11 11"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/>',
  pencil:
    '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
  flask:
    '<path d="M9 3h6"/><path d="M10 3v6l-5.2 8.3A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.7L14 9V3"/>',
  heartChat:
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 8.2c-.8-1-2.5-.7-2.5.8 0 1.4 2.5 2.8 2.5 2.8s2.5-1.4 2.5-2.8c0-1.5-1.7-1.8-2.5-.8z"/>',
  device:
    '<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/>',
  money:
    '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 10v4M18 10v4"/>',
  refresh:
    '<polyline points="23 4 23 10 17 10"/><path d="M20.5 15a8 8 0 1 1-1.7-7.5L23 10"/>',
  mail:
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>',
  facebook:
    '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  caret:
    '<polyline points="6 9 12 15 18 9"/>',
  growth:
    '<path d="M12 20V10"/><path d="M8 14c2-6 4-8 4-8s2 2 4 8"/><path d="M7 20h10"/>',
  shield:
    '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/><path d="M9.5 12l1.8 1.8L15 10"/>',
}

function Icon({ name, className, strokeWidth = 1.6 }) {
  const path = icons[name]
  if (!path) return null
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  )
}

/* ---------- DATA ---------- */
/* Displayed top → bottom (path climbs from Healthy hair up to Hair loss) */
const lossPathLeft = [
  {
    icon: 'dandruff',
    title: 'Infections',
    reason:
      'Fungal or bacterial scalp issues create inflammation that interrupts the normal growth cycle.',
    tip: 'Calming the scalp environment first makes regrowth treatments more effective.',
  },
  {
    icon: 'users',
    title: 'Lifestyle',
    reason:
      'Heat styling, tight hairstyles, poor sleep, and product buildup all add mechanical and chemical stress.',
    tip: 'Small daily habit shifts protect strands while your treatment works underneath.',
  },
  {
    icon: 'spray',
    title: 'Smoking',
    reason:
      'Nicotine reduces scalp blood flow and starves follicles of oxygen and nutrients they need to grow.',
    tip: 'Improving circulation support is a key part of rebuilding healthier growth conditions.',
  },
  {
    icon: 'stress',
    title: 'Stress',
    reason:
      'Physical or emotional stress elevates cortisol and can force healthy strands into telogen early.',
    tip: 'Sleep, recovery, and routine coaching help calm stress-linked shedding cycles.',
  },
  {
    icon: 'dna',
    title: 'Genetics',
    reason:
      'Inherited DHT sensitivity can gradually miniaturize follicles, especially at the crown and hairline.',
    tip: 'Early assessment helps tailor treatment before density loss becomes harder to reverse.',
  },
]

const lossPathRight = [
  {
    icon: 'heartChat',
    title: 'Menopause',
    reason:
      'Hormonal shifts around menopause can tip the balance toward thinning and wider parting.',
    tip: 'A hormone-aware plan helps stabilize shedding and support thicker-looking density.',
  },
  {
    icon: 'metabolism',
    title: 'Aging',
    reason:
      'With age, scalp collagen and elastin decline, so follicles lose grip and growth slows.',
    tip: 'Targeted actives and consistent care help support follicle strength as you age.',
  },
  {
    icon: 'nutrition',
    title: 'Diet',
    reason:
      'Low protein, iron, or micronutrient intake shows up on the scalp before other body signs appear.',
    tip: 'A nutrition plan aligned to your labs helps refill what follicles are missing.',
  },
  {
    icon: 'capsule',
    title: 'Drugs',
    reason:
      'Certain medications can push follicles into a resting phase and trigger temporary shedding.',
    tip: 'Review prescriptions with a clinician so your hair plan accounts for medication effects.',
  },
  {
    icon: 'flask',
    title: 'Chemicals',
    reason:
      'Harsh dyes, straighteners, and pollution irritate the scalp and weaken the follicle barrier over time.',
    tip: 'Switch to gentler formulas and protect your scalp from daily chemical exposure.',
  },
]

const anagenPoints = [
  { icon: 'refresh', title: 'Increase Blood Flow' },
  { icon: 'flask', title: 'Increase Local Growth Factors' },
  { icon: 'growth', title: 'Direct Stimulation of Hair Growth' },
  { icon: 'shield', title: 'Manage DHT Sensitivity' },
]

const telogenPoints = [
  { icon: 'dandruff', title: 'Inflammation' },
  { icon: 'dna', title: 'Hormones', sub: 'Thyroid · DHT' },
  { icon: 'stress', title: 'Increased Stress' },
  { icon: 'nutrition', title: 'Poor Nutrition' },
  { icon: 'capsule', title: 'Medication Induced' },
]

const causes = [
  {
    icon: 'dna',
    title: 'Hormones',
    desc: 'DHT sensitivity can be caused by genetics, stress, poor diet, and toxins.',
  },
  {
    icon: 'stress',
    title: 'Stress',
    desc: 'Physical or emotional stress like giving birth or a demanding job.',
  },
  {
    icon: 'nutrition',
    title: 'Nutrition',
    desc: 'Nutrient gaps that can result from a poor diet or a compromised gut microbiome.',
  },
  {
    icon: 'users',
    title: 'Lifestyle',
    desc: 'Refers to your surroundings, the products you use, and the foods you eat.',
  },
  {
    icon: 'metabolism',
    title: 'Metabolism',
    desc: 'Influences how hair follicles receive nutrients from the body.',
  },
  {
    icon: 'refresh',
    title: 'Aging',
    desc: "Aging reduces the scalp's collagen and elastin, weakening its grip on hair strands.",
  },
]

const offers = [
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

const stagesMale = [
  { n: '1', ok: true },
  { n: '2', ok: true },
  { n: '3', ok: true },
  { n: '4', ok: true },
  { n: '5', ok: false },
  { n: '6', ok: false },
]

const stagesFemale = [
  { n: 'I', ok: true },
  { n: 'I–II', ok: true },
  { n: 'II', ok: true },
  { n: 'III', ok: false },
]

const timelineMale = [
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

const timelineFemale = [
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

const products = [
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

const filterDefs = [
  { key: 'all', label: 'All Products' },
  { key: 'growth', label: 'Hair Growth' },
  { key: 'loss', label: 'Hair Loss' },
  { key: 'dandruff', label: 'Dandruff' },
]

const trustItems = [
  { icon: 'users', num: '1,000+', label: ' assessed' },
  { icon: 'checkCircle', num: '92%', label: ' visible regrowth*' },
  { icon: 'starOutline', num: '4.8/5', label: ' from 12,000+ users' },
]

const menuColumns = [
  [
    { icon: 'dna', label: 'Root Causes', href: '#causes' },
    { icon: 'kit', label: 'Inside Your Plan', href: '#offers' },
    { icon: 'checkCircle', label: 'What To Expect', href: '#timeline' },
    { icon: 'consult', label: 'Talk To A Human', href: '#chat' },
  ],
  [
    { icon: 'bottle', label: 'Shop All', href: '#products' },
    {
      icon: 'dandruff',
      label: 'Shop By Concern',
      accordion: true,
      children: [
        { label: 'Hair Growth', href: '#products' },
        { label: 'Hair Loss', href: '#products' },
        { label: 'Dandruff', href: '#products' },
      ],
    },
    {
      icon: 'dna',
      label: 'Shop By Root Cause',
      accordion: true,
      children: [
        { label: 'Genetics', href: '#causes' },
        { label: 'Stress', href: '#causes' },
        { label: 'Nutrition', href: '#causes' },
        { label: 'Gut Issues', href: '#causes' },
      ],
    },
    { icon: 'device', label: 'Blog', href: '#' },
  ],
]

/* ---------- HELPERS ---------- */
function Reveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  )
}

function StarRow({ rating }) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ opacity: i < Math.round(rating) ? 1 : 0.25 }}>
      <Icon name="star" />
    </span>
  ))
}

/* ---------- HOME PAGE ---------- */
export default function HomePage() {
  const [openCause, setOpenCause] = useState(0)
  const [stageGender, setStageGender] = useState('male')
  const [timelineMode, setTimelineMode] = useState('male')
  const [activeFilter, setActiveFilter] = useState('all')
  const [addedProduct, setAddedProduct] = useState(null)
  const [showSticky, setShowSticky] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [openAccordions, setOpenAccordions] = useState({
    'Shop By Concern': false,
    'Shop By Root Cause': false,
  })
  const [factorPopup, setFactorPopup] = useState(null)
  const [activeCyclePoint, setActiveCyclePoint] = useState({
    side: 'anagen',
    index: 0,
  })
  const productsScrollRef = useRef(null)
  const selectedCyclePoint =
    activeCyclePoint.side === 'anagen'
      ? anagenPoints[activeCyclePoint.index]
      : telogenPoints[activeCyclePoint.index]

  const timelineData = timelineMode === 'male' ? timelineMale : timelineFemale
  const productList =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter)

  useEffect(() => {
    productsScrollRef.current?.scrollTo({ left: 0 })
  }, [activeFilter])

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('.hero')
      const footer = document.querySelector('footer')
      if (!hero || !footer) return
      const heroBottom = hero.getBoundingClientRect().bottom
      const footerTop = footer.getBoundingClientRect().top
      const winH = window.innerHeight
      setShowSticky(heroBottom < 0 && footerTop > winH * 0.5 && !menuOpen)
      setNavScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen || factorPopup ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, factorPopup])

  useEffect(() => {
    if (!factorPopup) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setFactorPopup(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [factorPopup])

  const scrollProducts = (delta) => {
    productsScrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const handleAddToCart = (name) => {
    if (addedProduct === name) return
    setAddedProduct(name)
    window.setTimeout(() => setAddedProduct(null), 1800)
  }

  const closeMenu = () => setMenuOpen(false)

  const toggleAccordion = (label) => {
    setOpenAccordions((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <>
      {/* NAV */}
      <header
        className={[
          'nav',
          navScrolled ? 'nav-scrolled' : '',
          menuOpen ? 'nav-menu-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="nav-inner">
          <a href="#" className="logo" onClick={closeMenu}>
            Zylk<span className="dot" /> Health
          </a>

          <div className="nav-actions">
            <button type="button" className="nav-icon-btn" aria-label="WhatsApp">
              <Icon name="whatsapp" />
            </button>
            <button type="button" className="nav-icon-btn nav-cart-btn" aria-label="Cart">
              <Icon name="bag" />
              <span className="cart-badge">2</span>
            </button>
            <button
              type="button"
              className={`nav-icon-btn nav-menu-btn${menuOpen ? ' is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* SLIDE-DOWN MENU WINDOW */}
      <div
        className={`menu-window${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="menu-window-inner">
          <div className="menu-grid">
            {menuColumns.map((column, colIndex) => (
              <div className="menu-col" key={colIndex}>
                {column.map((item) =>
                  item.accordion ? (
                    <div
                      className={`menu-item menu-accordion${openAccordions[item.label] ? ' open' : ''}`}
                      key={item.label}
                    >
                      <button
                        type="button"
                        className="menu-item-btn"
                        onClick={() => toggleAccordion(item.label)}
                        aria-expanded={!!openAccordions[item.label]}
                      >
                        <span className="menu-item-icon">
                          <Icon name={item.icon} />
                        </span>
                        <span className="menu-item-text">{item.label}</span>
                        <Icon
                          name="caret"
                          className="menu-accordion-caret"
                          strokeWidth={2}
                        />
                      </button>
                      {openAccordions[item.label]
                        ? item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              className="menu-sublink"
                              onClick={closeMenu}
                            >
                              {child.label}
                            </a>
                          ))
                        : null}
                    </div>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="menu-item"
                      onClick={closeMenu}
                    >
                      <span className="menu-item-icon">
                        <Icon name={item.icon} />
                      </span>
                      <span className="menu-item-text">{item.label}</span>
                      <Icon
                        name="chevronRight"
                        className="menu-arrow"
                        strokeWidth={2}
                      />
                    </a>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {menuOpen ? (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      {/* HERO */}
      <section className="hero">
        <div className="hero-shell">
          <div className="hero-curve">
            <div className="hero-copy">
              <p className="hero-brand">Zylk Health</p>
              <span className="hero-badge">AI Scalp Assessment</span>
              <h1 className="hero-headline">
                Why are you losing hair? <em>Find out</em> in 2 minutes.
              </h1>
              <p className="hero-sub">
                Answer a few questions, upload a scalp photo, and our AI maps the
                real cause behind your hair fall — before a doctor ever writes your
                plan.
              </p>
              <div className="hero-cta-row">
                <a href="#assessment" className="btn btn-primary">
                  Take the Free Assessment
                </a>
                <a href="#products" className="btn btn-secondary">
                  Explore Hair Plans
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-product">
                <div className="hero-regrow">
                  <p className="hero-regrow-title">Regrow hair</p>
                  <span className="hero-regrow-circle">in 3–6 months.*</span>
                </div>
                <div className="hero-product-stage">
                  <div className="hero-bottle-wrap">
                    <p className="hero-online">
                      100% online
                      <span className="hero-online-arrow" aria-hidden="true" />
                    </p>
                    <img
                      src={bottleImg}
                      alt="Zylk Health hair serum bottle"
                      className="hero-bottle"
                    />
                  </div>
                  <div className="hero-progress">
                    <div className="hero-progress-line" aria-hidden="true" />
                    {progressImgs.map((item) => (
                      <div className="hero-progress-item" key={item.label}>
                        <img src={item.src} alt={`Progress at ${item.label}`} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="trust-row">
            {trustItems.map((item) => (
              <div className="trust-chip" key={item.num}>
                <span className="icon-badge">
                  <Icon name={item.icon} strokeWidth={2} />
                </span>
                <span>
                  <span className="num">{item.num}</span>
                  <span className="label">{item.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOSS PATH */}
      <section className="loss-path" id="loss-path">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Why Hair Falls
            </span>
            <h2>From healthy hair to hair loss</h2>
            <p>
              Multiple triggers push hair from a healthy state toward thinning.
              Spotting them early is the first step to reversing the slide.
            </p>
          </Reveal>
          <Reveal className="loss-map">
            <div className="loss-map-end top">
              <span className="loss-path-pill bad">Hair loss</span>
            </div>

            <div className="loss-map-grid" aria-label="Hair fall triggers path">
              <div className="loss-map-col">
                {lossPathLeft.map((factor) => (
                  <button
                    type="button"
                    className={`loss-node${factorPopup?.title === factor.title ? ' active' : ''}`}
                    key={factor.title}
                    onClick={() => setFactorPopup(factor)}
                  >
                    <span className="loss-node-icon">
                      <Icon name={factor.icon} />
                    </span>
                    <span className="loss-node-label">{factor.title}</span>
                  </button>
                ))}
              </div>
              <div className="loss-map-col">
                {lossPathRight.map((factor) => (
                  <button
                    type="button"
                    className={`loss-node${factorPopup?.title === factor.title ? ' active' : ''}`}
                    key={factor.title}
                    onClick={() => setFactorPopup(factor)}
                  >
                    <span className="loss-node-icon">
                      <Icon name={factor.icon} />
                    </span>
                    <span className="loss-node-label">{factor.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="loss-map-end bottom">
              <span className="loss-path-pill good">Healthy hair</span>
            </div>
          </Reveal>
        </div>
      </section>

      {factorPopup ? (
        <div className="loss-modal" role="dialog" aria-modal="true" aria-label={factorPopup.title}>
          <button
            type="button"
            className="loss-modal-backdrop"
            aria-label="Close details"
            onClick={() => setFactorPopup(null)}
          />
          <div className="loss-modal-card">
            <button
              type="button"
              className="loss-modal-close"
              aria-label="Close"
              onClick={() => setFactorPopup(null)}
            >
              <Icon name="close" strokeWidth={2} />
            </button>
            <div className="loss-modal-icon">
              <Icon name={factorPopup.icon} />
            </div>
            <p className="loss-modal-kicker">Why it matters</p>
            <h3>{factorPopup.title}</h3>
            <p className="loss-modal-reason">{factorPopup.reason}</p>
            <p className="loss-modal-tip">
              <strong>What helps:</strong> {factorPopup.tip}
            </p>
          </div>
        </div>
      ) : null}

      {/* ANAGEN / TELOGEN */}
      <section className="cycle-section bg-cream" id="cycle">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Hair Growth Cycle
            </span>
            <h2>Anagen and Telogen</h2>
            <p>
              Healthy plans keep more follicles in the growth phase — and fewer
              slipping into the resting, shedding phase.
            </p>
          </Reveal>
          <Reveal className="cycle-orbit-wrap">
            <div className="cycle-orbit" aria-hidden="true">
              <div className="cycle-orbit-ring">
                <span className="cycle-orbit-label growth">Growth</span>
                <span className="cycle-orbit-label shedding">Shedding</span>
              </div>
              <div className="cycle-orbit-core">
                <div className="cycle-follicle growth-follicle">
                  <span className="follicle-shaft" />
                  <span className="follicle-bulb" />
                </div>
                <p>
                  {activeCyclePoint.side === 'anagen' ? 'Anagen' : 'Telogen'}
                </p>
              </div>
            </div>

            <div className="cycle-orbit-panels">
              <div className="cycle-side-panel anagen">
                <h3>Anagen</h3>
                <p className="cycle-col-sub">Growth phase · 4 levers</p>
                <ul className="cycle-points">
                  {anagenPoints.map((point, index) => (
                    <li key={point.title}>
                      <button
                        type="button"
                        className={`cycle-point-btn${
                          activeCyclePoint.side === 'anagen' &&
                          activeCyclePoint.index === index
                            ? ' active'
                            : ''
                        }`}
                        onClick={() =>
                          setActiveCyclePoint({ side: 'anagen', index })
                        }
                      >
                        <span className="cycle-point-icon">
                          <Icon name={point.icon} />
                        </span>
                        <span>{point.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cycle-side-panel telogen">
                <h3>Telogen</h3>
                <p className="cycle-col-sub">Resting / shedding phase</p>
                <ul className="cycle-points">
                  {telogenPoints.map((point, index) => (
                    <li key={point.title}>
                      <button
                        type="button"
                        className={`cycle-point-btn${
                          activeCyclePoint.side === 'telogen' &&
                          activeCyclePoint.index === index
                            ? ' active'
                            : ''
                        }`}
                        onClick={() =>
                          setActiveCyclePoint({ side: 'telogen', index })
                        }
                      >
                        <span className="cycle-point-icon">
                          <Icon name={point.icon} />
                        </span>
                        <span>
                          {point.title}
                          {point.sub ? <small>{point.sub}</small> : null}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="cycle-active-card">
              <span className="cycle-active-kicker">
                {activeCyclePoint.side === 'anagen'
                  ? 'Keep follicles growing'
                  : 'Reduce shedding triggers'}
              </span>
              <h3>{selectedCyclePoint.title}</h3>
              <p>
                {activeCyclePoint.side === 'anagen'
                  ? 'This growth lever helps move more follicles into anagen and keep them active longer.'
                  : 'This trigger can push follicles into telogen early — your plan works to calm or correct it.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAUSES */}
      <section id="causes">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Root Factors
            </span>
            <h2>What drives hair fall</h2>
            <p>
              Six interconnected factors decide whether follicles stay in growth
              or tip into shedding — your plan addresses the ones that matter for
              you.
            </p>
          </Reveal>

          <Reveal className="causes-desktop">
            {causes.map((cause, i) => (
              <div className="cause-card" key={cause.title}>
                <span className="cause-index">0{i + 1}</span>
                <div className="cause-icon">
                  <Icon name={cause.icon} />
                </div>
                <h3>{cause.title}</h3>
                <p>{cause.desc}</p>
              </div>
            ))}
          </Reveal>

          <div className="causes-mobile">
            <div className="diag-path">
              {causes.map((cause, i) => (
                <div
                  className={`diag-step${openCause === i ? ' open' : ''}`}
                  key={cause.title}
                >
                  <div className="diag-dot">
                    <Icon name={cause.icon} />
                  </div>
                  <button
                    type="button"
                    className="diag-step-head"
                    onClick={() => setOpenCause(openCause === i ? -1 : i)}
                  >
                    <h3>{cause.title}</h3>
                    <Icon name="chevronDown" className="diag-chevron" strokeWidth={2} />
                  </button>
                  <div className="diag-body">
                    <div className="diag-body-inner">{cause.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="bg-cream" id="offers">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Inside Your Plan
            </span>
            <h2>What you get</h2>
            <p>
              Every plan is built around your assessment — reviewed by a doctor,
              backed by a real person, at every step.
            </p>
          </Reveal>
          <Reveal className="offers-grid">
            {offers.map((offer, i) => (
              <div className="offer-card" key={offer.title}>
                <span className="offer-num">0{i + 1}</span>
                <div className="offer-icon">
                  <Icon name={offer.icon} />
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* STAGES */}
      <section className="stage-band" id="stages">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Know Your Window
            </span>
            <h2>How much time do you have?</h2>
            <p>
              Hair loss is most reversible in its earliest stages. Find where you
              sit — and how much runway is left.
            </p>
          </Reveal>

          <Reveal className="stage-desktop">
            <div className="stage-row-label">Male pattern (Norwood scale)</div>
            <div className="stage-row">
              {stagesMale.map((stage) => (
                <div className="stage-cell" key={stage.n}>
                  <div className="stage-thumb">
                    <Icon name="headM" />
                    <div className={`stage-badge ${stage.ok ? 'ok' : 'no'}`}>
                      <Icon name={stage.ok ? 'check' : 'cross'} />
                    </div>
                  </div>
                  <div className="lbl">Stage {stage.n}</div>
                  <div className="sub">
                    {stage.ok ? 'Preventable' : 'Limited options'}
                  </div>
                </div>
              ))}
            </div>
            <div className="stage-row-label">Female pattern (Ludwig scale)</div>
            <div className="stage-row female">
              {stagesFemale.map((stage) => (
                <div className="stage-cell" key={stage.n}>
                  <div className="stage-thumb">
                    <Icon name="headM" />
                    <div className={`stage-badge ${stage.ok ? 'ok' : 'no'}`}>
                      <Icon name={stage.ok ? 'check' : 'cross'} />
                    </div>
                  </div>
                  <div className="lbl">Stage {stage.n}</div>
                  <div className="sub">
                    {stage.ok ? 'Preventable' : 'Limited options'}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="stage-mobile">
            <div className="stage-tabs">
              <button
                type="button"
                className={`stage-tab${stageGender === 'male' ? ' active' : ''}`}
                onClick={() => setStageGender('male')}
              >
                Male
              </button>
              <button
                type="button"
                className={`stage-tab${stageGender === 'female' ? ' active' : ''}`}
                onClick={() => setStageGender('female')}
              >
                Female
              </button>
            </div>
            <div className="ladder">
              {(stageGender === 'male' ? stagesMale : stagesFemale).map((stage) => (
                <div className="ladder-step" key={stage.n}>
                  <div className="ladder-dot">
                    <Icon name="headM" />
                  </div>
                  <div className={`badge-sm ${stage.ok ? 'ok' : 'no'}`}>
                    <Icon name={stage.ok ? 'check' : 'cross'} />
                  </div>
                  <div className="ladder-text">
                    <div className="lbl">Stage {stage.n}</div>
                    <div className="sub">
                      {stage.ok ? 'Still preventable' : 'Limited options remain'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="zone-note">
              <span>
                <span className="zone-dot" style={{ background: '#5EA985' }} />
                Still preventable
              </span>
              <span>
                <span className="zone-dot" style={{ background: 'var(--muted-red)' }} />
                Limited options
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              What To Expect
            </span>
            <h2>Your regrowth timeline</h2>
            <p>
              Hair grows in cycles, not overnight. Here&apos;s what most people
              see, month by month.
            </p>
          </Reveal>

          <Reveal className="tl-toggle">
            <div className="tl-tabs">
              <button
                type="button"
                className={`tl-tab${timelineMode === 'male' ? ' active' : ''}`}
                onClick={() => setTimelineMode('male')}
              >
                Male timeline
              </button>
              <button
                type="button"
                className={`tl-tab${timelineMode === 'female' ? ' active' : ''}`}
                onClick={() => setTimelineMode('female')}
              >
                Female timeline
              </button>
            </div>
          </Reveal>

          <Reveal className="timeline-desktop">
            <div className="timeline-line" />
            <div className="timeline-line-fill" />
            <div className="tl-row">
              {timelineData.map((item, i) => (
                <div className="tl-item" key={item.m}>
                  <div className="tl-node">{i + 1}</div>
                  <h3>
                    {item.m} — {item.h}
                  </h3>
                  <p>{item.d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="timeline-mobile">
            {timelineData.map((item) => (
              <div className="tlm-item" key={item.m}>
                <div className="tlm-node" />
                <span className="month">{item.m}</span>
                <h3>{item.h}</h3>
                <p>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-cream" id="products">
        <div className="wrap">
          <Reveal className="products-head-row">
            <div className="section-head">
              <span className="eyebrow">Shop The Range</span>
              <h2>Built for your scalp</h2>
              <p>
                Every product is doctor-formulated and matched to what your
                assessment finds — browse the full range here.
              </p>
            </div>
            <div className="scroll-arrows">
              <button
                type="button"
                className="scroll-arrow"
                aria-label="Scroll left"
                onClick={() => scrollProducts(-280)}
              >
                <Icon name="chevronLeft" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="scroll-arrow"
                aria-label="Scroll right"
                onClick={() => scrollProducts(280)}
              >
                <Icon name="chevronRight" strokeWidth={2} />
              </button>
            </div>
          </Reveal>

          <Reveal className="product-filters">
            {filterDefs.map((filter) => {
              const count =
                filter.key === 'all'
                  ? products.length
                  : products.filter((p) => p.category === filter.key).length
              return (
                <button
                  type="button"
                  key={filter.key}
                  className={`pf-tab${activeFilter === filter.key ? ' active' : ''}`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                  <span className="pf-count">{count}</span>
                </button>
              )
            })}
          </Reveal>

          <Reveal>
            <div className="products-scroll" ref={productsScrollRef}>
              {productList.map((product) => (
                <div className="product-card" key={product.name}>
                  <div className="product-media">
                    {product.tag ? (
                      <span className="product-tag">{product.tag}</span>
                    ) : null}
                    <Icon name={product.icon} />
                  </div>
                  <div className="product-body">
                    <div className="product-name">{product.name}</div>
                    <div className="product-desc">{product.desc}</div>
                    <div className="product-rating">
                      <span className="stars">
                        <StarRow rating={product.rating} />
                      </span>
                      <span className="rate-num">{product.rating}</span>
                      <span className="rate-count">
                        ({product.count.toLocaleString()})
                      </span>
                    </div>
                    <div className="product-price-row">
                      <span className="product-price">₹{product.price}</span>
                      {product.old ? (
                        <span className="product-price-old">₹{product.old}</span>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      className={`btn-add-cart${addedProduct === product.name ? ' added' : ''}`}
                      onClick={() => handleAddToCart(product.name)}
                    >
                      <Icon name="cart" />
                      <span>
                        {addedProduct === product.name ? 'Added ✓' : 'Add to Cart'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHAT */}
      <section className="chat-band" id="chat">
        <Reveal className="wrap chat-inner">
          <div className="chat-avatar">
            <Icon name="person" strokeWidth={1.5} />
          </div>
          <div className="chat-text">
            <span className="eyebrow">Talk To A Human</span>
            <h2>Have questions? Talk to our hair experts.</h2>
            <p>
              No bots, no scripts — a real consultant walks you through your
              results and answers whatever&apos;s on your mind.
            </p>
            <a href="#" className="btn btn-whatsapp">
              <Icon name="whatsapp" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer id="assessment">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">Zylk Health</div>
              <p className="footer-desc">
                AI-powered scalp assessments and doctor-reviewed plans, built
                around what&apos;s actually causing your hair fall.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram">
                  <Icon name="instagram" />
                </a>
                <a href="#" aria-label="YouTube">
                  <Icon name="youtube" />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Icon name="linkedin" />
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About Zylk</a>
              <a href="#">Take Assessment</a>
              <a href="#">Shop</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Refund Policy</a>
            </div>
            <div className="footer-col">
              <h4>Get in touch</h4>
              <p>care@zylkhealth.com</p>
              <p>+91 98765 43210</p>
              <p>HSR Layout, Bengaluru</p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Zylk Health. All rights reserved.</span>
            <span>*Results vary by individual and adherence to plan.</span>
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      <a
        href="#assessment"
        className={`sticky-cta${showSticky ? ' show' : ''}`}
        id="stickyCta"
      >
        Find your cause <span>→</span> Take the Free Assessment
      </a>
    </>
  )
}
