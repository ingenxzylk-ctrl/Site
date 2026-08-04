import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const PATH_ICONS = {
  genetic: '<path d="M6 3c0 6 12 12 12 18M18 3c0 6-12 12-12 18M7 8h10M7 16h10"/>',
  chemical:
    '<path d="M9 3h6"/><path d="M10 3v6l-5.2 8.3A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.7L14 9V3"/>',
  drug: '<rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-30 12 12)"/><line x1="10" y1="8" x2="14" y2="16"/>',
  stress:
    '<circle cx="12" cy="10" r="6"/><path d="M9 21c0-2 1.5-3 3-3s3 1 3 3"/><path d="M9 9c.5-1.5 2-1.5 3-.5 1-1 2.5-1 3 .5"/>',
  diet: '<path d="M12 21c-5-2-8-6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5-3 9-8 11z"/><path d="M12 10V4"/>',
  smoking:
    '<path d="M3 16h14v3H3z"/><path d="M17 16v3h2v-3z"/><path d="M6 12c1-1.5 0-2.5-.5-3.5S5 6 6 5"/><path d="M10 12c1-1.5 0-2.5-.5-3.5S9 6 10 5"/>',
  aging: '<path d="M6 3h12v3l-5 6 5 6v3H6v-3l5-6-5-6z"/>',
  lifestyle:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  menopause:
    '<path d="M12 3v6"/><circle cx="12" cy="14" r="6"/><path d="M9.5 14a2.5 2.5 0 0 1 5 0"/>',
  infection:
    '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/><path d="M9.5 12l1.8 1.8L15 10"/>',
  healthy:
    '<path d="M12 21c-5-2-8-6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5-3 9-8 11z"/><path d="M12 15V8"/><path d="M9 10l3-2 3 2"/>',
}

const NODES = [
  {
    id: 'genetic',
    label: 'Genetic',
    side: 'L',
    row: 5,
    tip: 'Inherited, not inevitable',
    reason:
      'Inherited DHT sensitivity can gradually miniaturize follicles, especially at the crown and hairline.',
    help: 'Early assessment helps tailor treatment before density loss becomes harder to reverse.',
  },
  {
    id: 'chemical',
    label: 'Chemical',
    side: 'R',
    row: 5,
    tip: 'Dyes & straighteners',
    reason:
      'Harsh dyes, straighteners, and pollution irritate the scalp and weaken the follicle barrier over time.',
    help: 'Switch to gentler formulas and protect your scalp from daily chemical exposure.',
  },
  {
    id: 'drug',
    label: 'Drug',
    side: 'R',
    row: 4,
    tip: 'Some meds shed hair',
    reason:
      'Certain medications can push follicles into a resting phase and trigger temporary shedding.',
    help: 'Review prescriptions with a clinician so your hair plan accounts for medication effects.',
  },
  {
    id: 'stress',
    label: 'Stress',
    side: 'L',
    row: 4,
    tip: 'Cortisol forces early rest',
    reason:
      'Physical or emotional stress elevates cortisol and can force healthy strands into telogen early.',
    help: 'Sleep, recovery, and routine coaching help calm stress-linked shedding cycles.',
  },
  {
    id: 'diet',
    label: 'Diet',
    side: 'L',
    row: 3,
    tip: 'Missing iron, protein, zinc',
    reason:
      'Low protein, iron, or micronutrient intake shows up on the scalp before other body signs appear.',
    help: 'A nutrition plan aligned to your labs helps refill what follicles are missing.',
  },
  {
    id: 'smoking',
    label: 'Smoking',
    side: 'R',
    row: 3,
    tip: 'Cuts scalp blood flow',
    reason:
      'Nicotine reduces scalp blood flow and starves follicles of oxygen and nutrients they need to grow.',
    help: 'Improving circulation support is a key part of rebuilding healthier growth conditions.',
  },
  {
    id: 'aging',
    label: 'Aging',
    side: 'R',
    row: 2,
    tip: 'Collagen loosens the grip',
    reason:
      'With age, scalp collagen and elastin decline, so follicles lose grip and growth slows.',
    help: 'Targeted actives and consistent care help support follicle strength as you age.',
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    side: 'L',
    row: 2,
    tip: 'Heat, buildup, poor sleep',
    reason:
      'Heat styling, tight hairstyles, poor sleep, and product buildup all add mechanical and chemical stress.',
    help: 'Small daily habit shifts protect strands while your treatment works underneath.',
  },
  {
    id: 'menopause',
    label: 'Menopause',
    side: 'L',
    row: 1,
    tip: 'Hormones shift the balance',
    reason:
      'Hormonal shifts around menopause can tip the balance toward thinning and wider parting.',
    help: 'A hormone-aware plan helps stabilize shedding and support thicker-looking density.',
  },
  {
    id: 'infection',
    label: 'Infection',
    side: 'R',
    row: 1,
    tip: 'Inflames the follicle',
    reason:
      'Fungal or bacterial scalp issues create inflammation that interrupts the normal growth cycle.',
    help: 'Calming the scalp environment first makes regrowth treatments more effective.',
  },
]

const PATH_ORDER = [
  'healthy',
  'genetic',
  'chemical',
  'drug',
  'stress',
  'diet',
  'smoking',
  'aging',
  'lifestyle',
  'menopause',
  'infection',
  'hairloss',
]

function PathIcon({ paths }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  )
}

function centerOf(el, boardRect) {
  const r = el.getBoundingClientRect()
  return {
    x: r.left + r.width / 2 - boardRect.left,
    y: r.top + r.height / 2 - boardRect.top,
  }
}

function buildSmoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i]
    const p1 = pts[i + 1]
    const mx = (p0.x + p1.x) / 2
    const my = (p0.y + p1.y) / 2
    d += ` Q ${p0.x} ${p0.y} ${mx} ${my}`
  }
  const last = pts[pts.length - 1]
  d += ` T ${last.x} ${last.y}`
  return d
}

const gridNodes = []
for (let r = 1; r <= 5; r++) {
  const rowNodes = NODES.filter((n) => n.row === r).sort((a, b) =>
    a.side === 'L' ? -1 : 1,
  )
  gridNodes.push(...rowNodes)
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

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const redraw = useCallback(() => {
    const board = boardRef.current
    const pathFg = pathFgRef.current
    const pillGood = pillGoodRef.current
    const pillBad = pillBadRef.current
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

    const d = buildSmoothPath(pts)
    setPathD(d)

    const len = pathFg.getTotalLength()
    setDashLen(len)
    if (!animatedRef.current) {
      setDashOffset(len)
    }
  }, [])

  useLayoutEffect(() => {
    redraw()
  }, [redraw, revealed])

  useEffect(() => {
    let resizeRaf
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(redraw)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(resizeRaf)
      window.removeEventListener('resize', onResize)
    }
  }, [redraw])

  useEffect(() => {
    const board = boardRef.current
    if (!board) return undefined

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true
            setRevealed(true)
            requestAnimationFrame(() => setDashOffset(0))
            if (!reduceMotion) {
              setTimeout(() => setFlowOn(true), 1900)
            }
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(board)
    return () => io.disconnect()
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const count = window.innerWidth < 480 ? 4 : 7
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 3 + Math.random() * 3,
        coral: Math.random() > 0.5,
        left: 8 + Math.random() * 84,
        bottom: Math.random() * 90,
        duration: 8 + Math.random() * 7,
        delay: -Math.random() * 10,
      })),
    )
  }, [reduceMotion])

  useEffect(() => {
    document.body.classList.toggle('path-locked', Boolean(modalNode))
    return () => document.body.classList.remove('path-locked')
  }, [modalNode])

  useEffect(() => {
    if (!modalNode) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setModalNode(null)
        setActiveId(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalNode])

  const openModal = (node) => {
    const stepNum = PATH_ORDER.indexOf(node.id)
    setActiveId(node.id)
    setModalNode(node)
    setModalStep(stepNum)
  }

  const closeModal = () => {
    setModalNode(null)
    setActiveId(null)
  }

  return (
    <>
      <section className="path-section" id="loss-path">
        <div className="wrap">
          <div className="path-head">
            <span className="path-eyebrow">Why Hair Falls</span>
            <h2>
              One strand, <em>ten turning points</em>
            </h2>
            <p>
              Every trigger below pulls a follicle further from Anagen. Trace the
              line — it&apos;s the exact order things compound, from the first
              hormonal nudge to visible loss. Tap a point for the full story.
            </p>
          </div>

          <div className="path-board" ref={boardRef}>
            <svg className="path-svg" viewBox={viewBox} aria-hidden="true">
              <defs>
                <linearGradient
                  id="pathGrad"
                  x1="0"
                  y1="1"
                  x2="0"
                  y2="0"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#5F7F5E" />
                  <stop offset="1" stopColor="#B54E3C" />
                </linearGradient>
              </defs>
              <path className="path-shadow" d={pathD} />
              <path className="path-bg" d={pathD} />
              <path
                ref={pathFgRef}
                className="path-fg"
                d={pathD}
                style={{
                  strokeDasharray: dashLen,
                  strokeDashoffset: dashOffset,
                }}
              />
              <path className={`path-flow${flowOn ? ' on' : ''}`} d={pathD} />
            </svg>

            <div className="path-board-grid">
              <div className="path-endpoint">
                <span
                  ref={pillBadRef}
                  className={`path-endpoint-pill bad${revealed ? ' in' : ''}`}
                  style={{
                    transitionDelay: reduceMotion ? '0ms' : '990ms',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3c-4 5-7 8-7 12a7 7 0 0 0 14 0c0-4-3-7-7-12z" />
                    <path d="M9 15c0 1.5 1.3 2.5 3 2.5" />
                  </svg>
                  Hair loss
                </span>
              </div>

              {gridNodes.map((node) => {
                const stepNum = PATH_ORDER.indexOf(node.id)
                return (
                  <button
                    key={node.id}
                    type="button"
                    ref={(el) => {
                      nodeRefs.current[node.id] = el
                    }}
                    className={`path-node${revealed ? ' in' : ''}${activeId === node.id ? ' active' : ''}`}
                    style={{
                      transitionDelay: reduceMotion
                        ? '0ms'
                        : `${stepNum * 90}ms`,
                    }}
                    onClick={() => openModal(node)}
                  >
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
                <span
                  ref={pillGoodRef}
                  className={`path-endpoint-pill good${revealed ? ' in' : ''}`}
                  style={{ transitionDelay: '0ms' }}
                >
                  <PathIcon paths={PATH_ICONS.healthy} />
                  Healthy hair
                </span>
              </div>
            </div>

            {particles.map((p) => (
              <span
                key={p.id}
                className="path-particle"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.coral
                    ? 'rgba(181,78,60,.5)'
                    : 'rgba(95,127,94,.5)',
                  left: `${p.left}%`,
                  bottom: `${p.bottom}%`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>

          <p className="path-hint">Tap any point on the path</p>
        </div>
      </section>

      <div
        className={`path-modal-overlay${modalNode ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal()
        }}
        role="presentation"
      >
        {modalNode ? (
          <div
            className="path-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pathModalTitle"
          >
            <div className="path-modal-drag" />
            <button
              type="button"
              className="path-modal-close"
              aria-label="Close"
              onClick={closeModal}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="path-modal-icon">
              <PathIcon paths={PATH_ICONS[modalNode.id]} />
            </div>
            <p className="path-modal-kicker">
              <span className="step">Step {modalStep} of 10</span>
              <span>·</span>
              <span>Why it matters</span>
            </p>
            <h3 id="pathModalTitle">{modalNode.label}</h3>
            <p className="path-modal-reason">{modalNode.reason}</p>
            <p className="path-modal-tip">
              <strong>What helps —</strong> {modalNode.help}
            </p>
          </div>
        ) : null}
      </div>
    </>
  )
}
