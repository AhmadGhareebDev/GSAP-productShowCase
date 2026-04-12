import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const tiers = [
  {
    name: 'Single Season',
    price: '€24',
    desc: 'Choose one scent that speaks to you.',
    features: ['1 x 100ml bottle', 'Signature scent', 'Matte finish', 'Gift box included'],
    accent: '#888',
    cta: 'Choose Your Season',
  },
  {
    name: 'Full Collection',
    price: '€89',
    desc: 'All four seasons. One complete story.',
    features: ['4 x 100ml bottles', 'All four scents', 'Premium gift set', 'Free engraving'],
    accent: '#6abf8a',
    cta: 'Get the Collection',
    featured: true,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.pricing-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section="pricing"
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#0d0d0d',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px',
      }}
    >
      {/* Header */}
      <div className="pricing-header" style={{ textAlign: 'center', marginBottom: '72px' }}>
        <p className="section-kicker" style={{
          color: '#6abf8a',
          marginBottom: '16px',
        }}>
          Simple Pricing
        </p>

        <h2 className="font-display" style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 400,
          color: '#e8e0d4',
          margin: 0,
          lineHeight: 1.1,
        }}>
          Your Scent.<br />
          <em style={{ color: '#555' }}>Your Price.</em>
        </h2>
      </div>

      {/* Cards */}
      <div className="pricing-cards" style={{
        display: 'flex',
        gap: '20px',
        width: '100%',
        maxWidth: '860px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="pricing-card"
            style={{
              flex: '1 1 320px',
              background: tier.featured ? '#111' : '#0a0a0a',
              border: `1px solid ${tier.featured ? '#6abf8a33' : '#1a1a1a'}`,
              borderRadius: '8px',
              padding: '48px 40px',
              position: 'relative',
              outline: tier.featured ? '1px solid #6abf8a22' : 'none',
              outlineOffset: '4px',
            }}
          >

            {tier.featured && (
              <span style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#6abf8a',
                color: '#080808',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                padding: '4px 16px',
                borderRadius: '99px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>
                Most Popular
              </span>
            )}

            <p style={{
              color: tier.accent,
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              {tier.name}
            </p>

            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              color: '#e8e0d4',
              fontWeight: 400,
              margin: '0 0 8px',
              lineHeight: 1,
            }}>
              {tier.price}
            </p>

            <p style={{
              color: '#444',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              marginBottom: '36px',
            }}>
              {tier.desc}
            </p>

            <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: '28px', marginBottom: '36px' }}>
              {tier.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ color: tier.accent, fontSize: '0.8rem' }}>—</span>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>{f}</span>
                </div>
              ))}
            </div>

            <button
              className="ui-pill-btn"
              style={{
                width: '100%',
                padding: '14px',
                background: tier.featured ? '#6abf8a' : 'transparent',
                color: tier.featured ? '#080808' : '#6abf8a',
                border: `1px solid #6abf8a`,
                borderRadius: '999px',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 700,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#6abf8a'
                e.currentTarget.style.color = '#080808'
              }}
              onMouseLeave={e => {
                if (!tier.featured) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#6abf8a'
                }
              }}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      <p style={{
        color: '#2a2a2a',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        marginTop: '48px',
        textTransform: 'uppercase',
      }}>
        Free shipping on orders over €50
      </p>

      <style>{`
        @media (max-width: 768px) {
          [data-section="pricing"] {
            padding: 88px 24px !important;
            min-height: auto !important;
          }

          .pricing-header {
            margin-bottom: 48px !important;
          }

          .pricing-cards {
            gap: 16px !important;
          }

          .pricing-card {
            flex: 1 1 100% !important;
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}