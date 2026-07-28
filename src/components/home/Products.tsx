import { useEffect, useRef, useState } from 'react'
import {
  filterDefs,
  products,
  type FilterDef,
  type Product,
} from '../../data/home'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'

function StarRow({ rating }: { rating: number }) {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{ opacity: i < Math.round(rating) ? 1 : 0.25 }}
        >
          <Icon name="star" />
        </span>
      ))}
    </>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (added) return
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="product-card">
      <div className="product-media">
        {product.tag ? <span className="product-tag">{product.tag}</span> : null}
        <Icon name={product.icon} />
      </div>
      <div className="product-body">
        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.desc}</div>
        <div className="product-rating">
          <span className="stars">
            <StarRow rating={product.rating} />
          </span>
          <span className="rate-num">{product.rating}</span>
          <span className="rate-count">({product.count.toLocaleString()})</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">₹{product.price}</span>
          {product.old ? (
            <span className="product-price-old">₹{product.old}</span>
          ) : null}
        </div>
        <button
          type="button"
          className={`btn-add-cart${added ? ' added' : ''}`}
          onClick={handleAdd}
        >
          <Icon name="cart" />
          <span>{added ? 'Added ✓' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  )
}

export function Products() {
  const [activeFilter, setActiveFilter] = useState<FilterDef['key']>('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  const list =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter)

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 })
  }, [activeFilter])

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="bg-cream" id="products">
      <div className="wrap">
        <Reveal className="products-head-row">
          <div className="section-head">
            <span className="eyebrow">Shop The Range</span>
            <h2>Built for your scalp</h2>
            <p>
              Every product is doctor-formulated and matched to what your
              assessment finds — browse the full range here.
            </p>
          </div>
          <div className="scroll-arrows">
            <button
              type="button"
              className="scroll-arrow"
              aria-label="Scroll left"
              onClick={() => scrollBy(-280)}
            >
              <Icon name="chevronLeft" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="scroll-arrow"
              aria-label="Scroll right"
              onClick={() => scrollBy(280)}
            >
              <Icon name="chevronRight" strokeWidth={2} />
            </button>
          </div>
        </Reveal>

        <Reveal className="product-filters">
          {filterDefs.map((filter) => {
            const count =
              filter.key === 'all'
                ? products.length
                : products.filter((p) => p.category === filter.key).length
            return (
              <button
                type="button"
                key={filter.key}
                className={`pf-tab${activeFilter === filter.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
                <span className="pf-count">{count}</span>
              </button>
            )
          })}
        </Reveal>

        <Reveal>
          <div className="products-scroll" ref={scrollRef}>
            {list.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
