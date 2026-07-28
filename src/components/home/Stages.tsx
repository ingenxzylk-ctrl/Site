import { useState } from 'react'
import { stagesFemale, stagesMale, type Stage } from '../../data/home'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'

function StageCell({ stage }: { stage: Stage }) {
  return (
    <div className="stage-cell">
      <div className="stage-thumb">
        <Icon name="headM" />
        <div className={`stage-badge ${stage.ok ? 'ok' : 'no'}`}>
          <Icon name={stage.ok ? 'check' : 'cross'} />
        </div>
      </div>
      <div className="lbl">Stage {stage.n}</div>
      <div className="sub">{stage.ok ? 'Preventable' : 'Limited options'}</div>
    </div>
  )
}

function LadderStep({ stage }: { stage: Stage }) {
  return (
    <div className="ladder-step">
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
  )
}

export function Stages() {
  const [gender, setGender] = useState<'male' | 'female'>('male')

  return (
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
              <StageCell key={stage.n} stage={stage} />
            ))}
          </div>
          <div className="stage-row-label">Female pattern (Ludwig scale)</div>
          <div className="stage-row female">
            {stagesFemale.map((stage) => (
              <StageCell key={stage.n} stage={stage} />
            ))}
          </div>
        </Reveal>

        <Reveal className="stage-mobile">
          <div className="stage-tabs">
            <button
              type="button"
              className={`stage-tab${gender === 'male' ? ' active' : ''}`}
              onClick={() => setGender('male')}
            >
              Male
            </button>
            <button
              type="button"
              className={`stage-tab${gender === 'female' ? ' active' : ''}`}
              onClick={() => setGender('female')}
            >
              Female
            </button>
          </div>
          <div className="ladder">
            {(gender === 'male' ? stagesMale : stagesFemale).map((stage) => (
              <LadderStep key={stage.n} stage={stage} />
            ))}
          </div>
          <div className="zone-note">
            <span>
              <span className="zone-dot" style={{ background: '#5EA985' }} />
              Still preventable
            </span>
            <span>
              <span
                className="zone-dot"
                style={{ background: 'var(--muted-red)' }}
              />
              Limited options
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
