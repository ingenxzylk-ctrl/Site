import { useState } from 'react'
import { causes } from '../../data/home'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'

export function Causes() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="causes">
      <div className="wrap">
        <Reveal className="section-head center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            The Six Root Causes
          </span>
          <h2>Hair health starts from within</h2>
          <p>
            Hair fall rarely has one cause. Our assessment scores you across all
            six — so your plan treats what&apos;s actually happening, in the
            order it matters.
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
                className={`diag-step${openIndex === i ? ' open' : ''}`}
                key={cause.title}
              >
                <div className="diag-dot">
                  <Icon name={cause.icon} />
                </div>
                <button
                  type="button"
                  className="diag-step-head"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
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
  )
}
