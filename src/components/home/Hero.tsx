import { Icon } from '../Icon'

const trustItems = [
  { icon: 'users', num: '50,000+', label: ' assessed' },
  { icon: 'checkCircle', num: '92%', label: ' visible regrowth*' },
  { icon: 'starOutline', num: '4.8/5', label: ' from 12,000+ users' },
] as const

export function Hero() {
  return (
    <section className="hero" style={{ paddingTop: 64 }}>
      <div className="wrap">
        <div className="hero-art">
          <svg viewBox="0 0 320 220" fill="none" aria-hidden="true">
            <ellipse cx="160" cy="196" rx="120" ry="10" fill="#DCE7DD" opacity=".5" />
            <g stroke="#0B3D2E" strokeWidth="1.3" strokeLinecap="round" opacity=".85">
              <path d="M110 180 C 100 120, 118 70, 108 30" />
              <path d="M132 184 C 126 130, 140 78, 132 26" />
              <path d="M156 186 C 154 132, 162 74, 158 22" />
              <path d="M180 184 C 184 130, 176 78, 184 26" />
              <path d="M204 180 C 212 120, 196 70, 208 30" />
            </g>
            <g stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round">
              <path d="M120 40 C 122 34, 128 32, 132 36" />
              <path d="M186 38 C 188 32, 194 32, 196 38" />
              <path d="M156 20 C 158 14, 164 14, 165 20" />
            </g>
            <circle cx="160" cy="190" r="3" fill="#146B4A" />
            <circle cx="118" cy="182" r="2.2" fill="#146B4A" />
            <circle cx="202" cy="182" r="2.2" fill="#146B4A" />
          </svg>
        </div>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>
          AI Scalp Assessment
        </span>
        <h1 className="hero-headline">
          Why are you losing hair? <em>Find out</em> in 2 minutes.
        </h1>
        <p className="hero-sub">
          Answer a few questions, upload a scalp photo, and our AI maps the real
          cause behind your hair fall — before a doctor ever writes your plan.
        </p>
        <div className="hero-cta-row">
          <a href="#assessment" className="btn btn-primary">
            Take the Free Assessment
          </a>
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
  )
}
