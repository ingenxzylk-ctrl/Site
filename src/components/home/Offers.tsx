import { offers } from '../../data/home'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'

export function Offers() {
  return (
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
  )
}
