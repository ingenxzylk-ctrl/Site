import { Icon } from '../Icon'
import { Reveal } from '../Reveal'

export function ChatBand() {
  return (
    <section className="chat-band">
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
  )
}
