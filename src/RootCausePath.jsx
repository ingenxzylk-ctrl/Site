import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const PATH_ICONS = {
  genetics: '<path d="M6 3c0 6 12 12 12 18M18 3c0 6-12 12-12 18M7 8h10M7 16h10"/>',
  nutrition:
    '<path d="M12 21c-5-2-8-6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5-3 9-8 11z"/><path d="M12 10V4"/>',
  stress:
    '<circle cx="12" cy="10" r="6"/><path d="M9 21c0-2 1.5-3 3-3s3 1 3 3"/><path d="M9 9c.5-1.5 2-1.5 3-.5 1-1 2.5-1 3 .5"/>',
  postpartum:
    '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/><path d="M12 12v3"/>',
  dandruff:
    '<path d="M12 2c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z"/><circle cx="6" cy="19" r="1"/><circle cx="17" cy="18" r=".7"/>',
  hardwater:
    '<path d="M12 3c-4 5-7 8-7 12a7 7 0 0 0 14 0c0-4-3-7-7-12z"/><path d="M9 15c0 1.5 1.3 2.5 3 2.5"/>',
  crossdiet:
    '<path d="M4 4h16v4H4z"/><path d="M6 8v12h12V8"/><path d="M9 12h6M9 16h6"/>',
  aging: '<path d="M6 3h12v3l-5 6 5 6v3H6v-3l5-6-5-6z"/>',
  menopause:
    '<path d="M12 3v6"/><circle cx="12" cy="14" r="6"/><path d="M9.5 14a2.5 2.5 0 0 1 5 0"/>',
  meds: '<rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-30 12 12)"/><line x1="10" y1="8" x2="14" y2="16"/>',
  healthy:
    '<path d="M12 21c-5-2-8-6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5-3 9-8 11z"/><path d="M12 15V8"/><path d="M9 10l3-2 3 2"/>',
  hairloss:
    '<path d="M12 3c-4 5-7 8-7 12a7 7 0 0 0 14 0c0-4-3-7-7-12z"/><path d="M9 15c0 1.5 1.3 2.5 3 2.5"/>',
}

const NODES = [
  { id: 'genetics', label: 'Genetics', side: 'L', row: 1, tip: 'Inherited sensitivity',
    reason: 'Inherited DHT sensitivity can gradually miniaturize follicles at the crown and hairline.',
    help: 'Early assessment helps tailor treatment before density loss becomes harder to reverse.' },
  { id: 'nutrition', label: 'Nutrition Deficiency', side: 'R', row: 1, tip: 'Missing iron, protein, zinc',
    reason: 'Low protein, iron, or micronutrient intake shows up on the scalp before other body signs.',
    help: 'A nutrition plan aligned to your labs helps refill what follicles are missing.' },
  { id: 'stress', label: 'Stress', side: 'L', row: 2, tip: 'Cortisol forces early rest',
    reason: 'Physical or emotional stress elevates cortisol and can force healthy strands into telogen early.',
    help: 'Sleep, recovery, and routine coaching help calm stress-linked shedding cycles.' },
  { id: 'postpartum', label: 'Postpartum', side: 'R', row: 2, tip: 'Hormones shift after birth',
    reason: 'Hormonal shifts after childbirth can trigger widespread shedding as follicles reset their cycle.',
    help: 'A postpartum-aware plan supports recovery while hormones stabilise.' },
  { id: 'dandruff', label: 'Dandruff', side: 'L', row: 3, tip: 'Scalp inflammation',
    reason: 'Dandruff and scalp irritation create inflammation that disrupts normal follicle growth.',
    help: 'Calming the scalp environment first makes regrowth treatments more effective.' },
  { id: 'hardwater', label: 'Hardwater', side: 'R', row: 3, tip: 'Mineral buildup',
    reason: 'Hard water leaves mineral deposits that dry the scalp and weaken strand strength over time.',
    help: 'Gentler cleansing and scalp care help counter daily hard-water exposure.' },
  { id: 'crossdiet', label: 'Cross Diet', side: 'L', row: 4, tip: 'Restrictive eating',
    reason: 'Crash diets and restrictive eating deprive follicles of the protein and calories they need.',
    help: 'Balanced nutrition support keeps follicles fuelled while you work toward your goals.' },
  { id: 'aging', label: 'Aging', side: 'R', row: 4, tip: 'Collagen loosens grip',
    reason: 'With age, scalp collagen and elastin decline, so follicles lose grip and growth slows.',
    help: 'Targeted actives and consistent care help support follicle strength as you age.' },
  { id: 'menopause', label: 'Menopause', side: 'L', row: 5, tip: 'Hormones shift',
    reason: 'Hormonal shifts around menopause can tip the balance toward thinning and wider parting.',
    help: 'A hormone-aware plan helps stabilize shedding and support thicker-looking density.' },
  { id: 'meds', label: 'Certain Medication', side: 'R', row: 5, tip: 'Some meds shed hair',
    reason: 'Certain medications can push follicles into a resting phase and trigger temporary shedding.',
    help: 'Review prescriptions with a clinician so your hair plan accounts for medication effects.' },
]

const PATH_ORDER = [
  'healthy', 'genetics', 'nutrition', 'stress', 'postpartum', 'dandruff',
  'hardwater', 'crossdiet', 'aging', 'menopause', 'meds', 'hairloss',
]

function PathIcon({ paths }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: paths }} />
  )
}

function centerOf(el, boardRect) {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2 - boardRect.left, y: r.top + r.height / 2 - boardRect.top }
}

function buildSmoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i], p1 = pts[i + 1]
    d += ` Q ${p0.x} ${p0.y} ${(p0.x + p1.x) / 2} ${(p0.y + p1.y) / 2}`
  }
  const last = pts[pts.length - 1]
  d += ` T ${last.x} ${last.y}`
  return d
}

const gridNodes = []
for (let r = 1; r <= 5; r++) {
  gridNodes.push(...NODES.filter((n) => n.row === r).sort((a) => (a.side === 'L' ? -1 : 1)))
}

export default function RootCausePath() {
  const boardRef = useRef(null)
  const pathFgRef = useRef(null)
  const pillGoodRef = useRef(null)
  const pillBadRef = useRef(null)
  const nodeRefs = useRef({})
  const animatedRef = useRef(false)

  const [pathD, setPathD] = useState('')
  const [viewBox, setViewBox] = useState('0 0 0 0')
  const [dashLen, setDashLen] = useState(0)
  const [dashOffset, setDashOffset] = useState(0)
  const [flowOn, setFlowOn] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [modalNode, setModalNode] = useState(null)
  const [modalStep, setModalStep] = useState(0)
  const [particles, setParticles] = useState([])

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const redraw = useCallback(() => {
    const board = boardRef.current, pathFg = pathFgRef.current
    const pillGood = pillGoodRef.current, pillBad = pillBadRef.current
    if (!board || !pathFg || !pillGood || !pillBad) return
    const boardRect = board.getBoundingClientRect()
    setViewBox(`0 0 ${boardRect.width} ${boardRect.height}`)
    const pts = PATH_ORDER.map((id) => {
      let el
      if (id === 'healthy') el = pillGood.closest('.path-endpoint')
      else if (id === 'hairloss') el = pillBad.closest('.path-endpoint')
      else el = nodeRefs.current[id]
      return centerOf(el, boardRect)
    })
    setPathD(buildSmoothPath(pts))
    const len = pathFg.getTotalLength()
    setDashLen(len)
    if (!animatedRef.current) setDashOffset(len)
  }, [])

  useLayoutEffect(() => { redraw() }, [redraw, revealed])
  useEffect(() => {
    let raf
    const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(redraw) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [redraw])

  useEffect(() => {
    const board = boardRef.current
    if (!board) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animatedRef.current) {
        animatedRef.current = true
        setRevealed(true)
        requestAnimationFrame(() => setDashOffset(0))
        if (!reduceMotion) setTimeout(() => setFlowOn(true), 1900)
        io.disconnect()
      }
    }, { threshold: 0.2 })
    io.observe(board)
    return () => io.disconnect()
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    setParticles(Array.from({ length: window.innerWidth < 480 ? 4 : 7 }, (_, i) => ({
      id: i, size: 3 + Math.random() * 3, coral: Math.random() > 0.5,
      left: 8 + Math.random() * 84, bottom: Math.random() * 90,
      duration: 8 + Math.random() * 7, delay: -Math.random() * 10,
    })))
  }, [reduceMotion])

  useEffect(() => {
    document.body.classList.toggle('path-locked', Boolean(modalNode))
    return () => document.body.classList.remove('path-locked')
  }, [modalNode])

  useEffect(() => {
    if (!modalNode) return
    const onKey = (e) => { if (e.key === 'Escape') { setModalNode(null); setActiveId(null) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalNode])

  const openModal = (node) => {
    setActiveId(node.id)
    setModalNode(node)
    setModalStep(PATH_ORDER.indexOf(node.id))
  }

  return (
    <>
      <section className="path-section" id="loss-path">
        <div className="wrap">
          <div className="path-head">
            <span className="path-eyebrow">Why Hair Falls</span>
            <h2>One strand, <em>ten turning points</em></h2>
            <p>From healthy hair, trace how each root cause compounds — ending in visible hair loss. Tap any point for the full story.</p>
          </div>
          <div className="path-board" ref={boardRef}>
            <svg className="path-svg" viewBox={viewBox} aria-hidden="true">
              <defs>
                <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0" stopColor="#5F7F5E" />
                  <stop offset="1" stopColor="#B54E3C" />
                </linearGradient>
              </defs>
              <path className="path-shadow" d={pathD} />
              <path className="path-bg" d={pathD} />
              <path ref={pathFgRef} className="path-fg" d={pathD} style={{ strokeDasharray: dashLen, strokeDashoffset: dashOffset }} />
              <path className={`path-flow${flowOn ? ' on' : ''}`} d={pathD} />
            </svg>
            <div className="path-board-grid">
              <div className="path-endpoint">
                <span ref={pillGoodRef} className={`path-endpoint-pill good${revealed ? ' in' : ''}`} style={{ transitionDelay: '0ms' }}>
                  <PathIcon paths={PATH_ICONS.healthy} /> Healthy hair
                </span>
              </div>
              {gridNodes.map((node) => {
                const stepNum = PATH_ORDER.indexOf(node.id)
                return (
                  <button key={node.id} type="button" ref={(el) => { nodeRefs.current[node.id] = el }}
                    className={`path-node${revealed ? ' in' : ''}${activeId === node.id ? ' active' : ''}`}
                    style={{ transitionDelay: reduceMotion ? '0ms' : `${stepNum * 90}ms` }}
                    onClick={() => openModal(node)}>
                    <span className="path-node-circle">
                      <PathIcon paths={PATH_ICONS[node.id]} />
                      <span className="path-node-badge">{stepNum}</span>
                      <span className="path-node-tip">{node.tip}</span>
                    </span>
                    <span className="path-node-label">{node.label}</span>
                  </button>
                )
              })}
              <div className="path-endpoint">
                <span ref={pillBadRef} className={`path-endpoint-pill bad${revealed ? ' in' : ''}`}
                  style={{ transitionDelay: reduceMotion ? '0ms' : '990ms' }}>
                  <PathIcon paths={PATH_ICONS.hairloss} /> Hair loss
                </span>
              </div>
            </div>
            {particles.map((p) => (
              <span key={p.id} className="path-particle" style={{
                width: p.size, height: p.size,
                background: p.coral ? 'rgba(181,78,60,.5)' : 'rgba(95,127,94,.5)',
                left: `${p.left}%`, bottom: `${p.bottom}%`,
                animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
              }} />
            ))}
          </div>
          <p className="path-hint">Tap any point on the path</p>
        </div>
      </section>
      <div className={`path-modal-overlay${modalNode ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) { setModalNode(null); setActiveId(null) } }} role="presentation">
        {modalNode ? (
          <div className="path-modal-card" role="dialog" aria-modal="true" aria-labelledby="pathModalTitle">
            <div className="path-modal-drag" />
            <button type="button" className="path-modal-close" aria-label="Close" onClick={() => { setModalNode(null); setActiveId(null) }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className="path-modal-icon"><PathIcon paths={PATH_ICONS[modalNode.id]} /></div>
            <p className="path-modal-kicker"><span className="step">Step {modalStep} of 10</span><span>·</span><span>Why it matters</span></p>
            <h3 id="pathModalTitle">{modalNode.label}</h3>
            <p className="path-modal-reason">{modalNode.reason}</p>
            <p className="path-modal-tip"><strong>What helps —</strong> {modalNode.help}</p>
          </div>
        ) : null}
      </div>
    </>
  )
}
