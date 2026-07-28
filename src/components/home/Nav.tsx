import { Icon } from '../Icon'

export function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="logo">
          Zylk<span className="dot" /> Health
        </a>
        <div className="nav-icons">
          <button type="button" aria-label="WhatsApp">
            <Icon name="whatsapp" />
          </button>
          <button type="button" aria-label="Cart">
            <Icon name="cart" />
          </button>
          <button type="button" aria-label="Menu">
            <Icon name="menu" />
          </button>
        </div>
      </div>
    </header>
  )
}
