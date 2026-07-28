import { useState } from 'react'
import { timelineFemale, timelineMale } from '../../data/home'
import { Reveal } from '../Reveal'

export function Timeline() {
  const [mode, setMode] = useState<'male' | 'female'>('male')
  const data = mode === 'male' ? timelineMale : timelineFemale

  return (
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
              className={`tl-tab${mode === 'male' ? ' active' : ''}`}
              onClick={() => setMode('male')}
            >
              Male timeline
            </button>
            <button
              type="button"
              className={`tl-tab${mode === 'female' ? ' active' : ''}`}
              onClick={() => setMode('female')}
            >
              Female timeline
            </button>
          </div>
        </Reveal>

        <Reveal className="timeline-desktop">
          <div className="timeline-line" />
          <div className="timeline-line-fill" />
          <div className="tl-row">
            {data.map((item, i) => (
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
          {data.map((item) => (
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
  )
}
