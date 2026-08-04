import { useState } from 'react'

const bottleImg = '/zylk-bottle.png'

const CYCLE_NODES = [
  {
    id: 'dht',
    side: 'anagen',
    icon: 'shield',
    title: 'Manage DHT Sensitivity',
    angle: 305,
    radius: 46,
  },
  {
    id: 'blood',
    side: 'anagen',
    icon: 'refresh',
    title: 'Increase Blood Flow',
    angle: 335,
    radius: 46,
  },
  {
    id: 'chemical',
    side: 'telogen',
    icon: 'flask',
    title: 'Chemical',
    angle: 25,
    radius: 46,
  },
  {
    id: 'stim',
    side: 'anagen',
    icon: 'growth',
    title: 'Direct Stimulation',
    angle: 55,
    radius: 46,
  },
  {
    id: 'inflam',
    side: 'telogen',
    icon: 'dandruff',
    title: 'Inflammation',
    angle: 85,
    radius: 46,
  },
  {
    id: 'factors',
    side: 'anagen',
    icon: 'flask',
    title: 'Local Growth Factors',
    angle: 115,
    radius: 46,
  },
  {
    id: 'hormones',
    side: 'telogen',
    icon: 'dna',
    title: 'Hormones',
    sub: 'Thyroid · DHT',
    angle: 145,
    radius: 46,
  },
  {
    id: 'stress',
    side: 'telogen',
    icon: 'stress',
    title: 'Increased Stress',
    angle: 175,
    radius: 46,
  },
  {
    id: 'nutrition',
    side: 'telogen',
    icon: 'nutrition',
    title: 'Poor Nutrition',
    angle: 205,
    radius: 46,
  },
  {
    id: 'meds',
    side: 'telogen',
    icon: 'capsule',
    title: 'Medication Induced',
    angle: 235,
    radius: 46,
  },
]

const ICONS = {
  shield:
    '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/><path d="M9.5 12l1.8 1.8L15 10"/>',
  refresh:
    '<polyline points="23 4 23 10 17 10"/><path d="M20.5 15a8 8 0 1 1-1.7-7.5L23 10"/>',
  flask:
    '<path d="M9 3h6"/><path d="M10 3v6l-5.2 8.3A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.7L14 9V3"/>',
  growth:
    '<path d="M12 20V10"/><path d="M8 14c2-6 4-8 4-8s2 2 4 8"/><path d="M7 20h10"/>',
  dandruff:
    '<path d="M12 2c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z"/><circle cx="6" cy="19" r="1"/><circle cx="17" cy="18" r=".7"/>',
  dna: '<path d="M6 3c0 6 12 12 12 18M18 3c0 6-12 12-12 18M7 8h10M7 16h10"/>',
  stress:
    '<circle cx="12" cy="10" r="6"/><path d="M9 21c0-2 1.5-3 3-3s3 1 3 3"/><path d="M9 9c.5-1.5 2-1.5 3-.5 1-1 2.5-1 3 .5"/>',
  nutrition:
    '<path d="M12 21c-5-2-8-6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5-3 9-8 11z"/><path d="M12 10V4"/>',
  capsule:
    '<rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-30 12 12)"/><line x1="10" y1="8" x2="14" y2="16"/>',
}

function CycleIcon({ paths }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  )
}

function nodePosition(angle, radius) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    left: `${50 + radius * Math.cos(rad)}%`,
    top: `${50 + radius * Math.sin(rad)}%`,
  }
}

export default function HairGrowthCycle() {
  const [activeId, setActiveId] = useState('dht')
  const active = CYCLE_NODES.find((n) => n.id === activeId) ?? CYCLE_NODES[0]

  return (
    <div className="cycle-flow">
      <div className="cycle-flow-diagram" aria-label="Hair growth cycle diagram">
        <svg className="cycle-flow-arrows" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <marker
              id="cycleArrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--emerald)" />
            </marker>
          </defs>
          <path
            d="M 58 58 A 42 42 0 0 1 142 58"
            fill="none"
            stroke="var(--emerald)"
            strokeWidth="2"
            markerEnd="url(#cycleArrow)"
            opacity="0.55"
          />
          <path
            d="M 142 142 A 42 42 0 0 1 58 142"
            fill="none"
            stroke="#c45c3e"
            strokeWidth="2"
            markerEnd="url(#cycleArrow)"
            opacity="0.55"
          />
        </svg>

        <div className="cycle-flow-ring">
          <span className="cycle-flow-phase anagen">Anagen</span>
          <span className="cycle-flow-phase telogen">Telogen</span>
        </div>

        <div className="cycle-flow-center">
          <img src={bottleImg} alt="Zylk Health hair serum" />
        </div>

        {CYCLE_NODES.map((node) => {
          const pos = nodePosition(node.angle, node.radius)
          return (
            <button
              key={node.id}
              type="button"
              className={`cycle-flow-node ${node.side}${activeId === node.id ? ' active' : ''}`}
              style={pos}
              onClick={() => setActiveId(node.id)}
              aria-pressed={activeId === node.id}
            >
              <span className="cycle-flow-node-icon">
                <CycleIcon paths={ICONS[node.icon]} />
              </span>
              <span className="cycle-flow-node-label">
                {node.title}
                {node.sub ? <small>{node.sub}</small> : null}
              </span>
            </button>
          )
        })}
      </div>

      <div className={`cycle-active-card${active.side === 'telogen' ? ' telogen' : ''}`}>
        <span className="cycle-active-kicker">
          {active.side === 'anagen'
            ? 'Keep follicles growing'
            : 'Reduce shedding triggers'}
        </span>
        <h3>{active.title}</h3>
        <p>
          {active.side === 'anagen'
            ? 'This growth lever helps move more follicles into anagen and keep them active longer.'
            : 'This trigger can push follicles into telogen early — your plan works to calm or correct it.'}
        </p>
      </div>
    </div>
  )
}
