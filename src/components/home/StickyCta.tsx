import { useEffect, useState } from 'react'

export function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('.hero')
      const footer = document.querySelector('footer')
      if (!hero || !footer) return

      const heroBottom = hero.getBoundingClientRect().bottom
      const footerTop = footer.getBoundingClientRect().top
      const winH = window.innerHeight
      setShow(heroBottom < 0 && footerTop > winH * 0.5)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <a
      href="#assessment"
      className={`sticky-cta${show ? ' show' : ''}`}
      id="stickyCta"
    >
      Find your cause <span>→</span> Take the Free Assessment
    </a>
  )
}
