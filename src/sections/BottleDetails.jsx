import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const leftSpecs = [
  { label: 'Capacity', value: '100 ml' },
  { label: 'Height',   value: '14.5 cm' },
  { label: 'Weight',   value: '185 g' },
]

const rightSpecs = [
  { label: 'Material', value: 'Recycled Glass' },
  { label: 'Finish',   value: 'Matte Coat' },
  { label: 'Cap',      value: 'Zinc Alloy' },
]

export default function BottleDetails() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.bd-left',
      { opacity: 0, x: -80 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      }
    )
    gsap.fromTo('.bd-right',
      { opacity: 0, x: 80 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      }
    )
    gsap.fromTo('.bd-label',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section="bottle-details"
      style={{
        position: 'relative',
        zIndex: 8,
        background: '#080808',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px',
        overflow: 'hidden',
      }}
    >
      {/* Top label */}
      <div className="bd-label" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <p className="section-kicker" style={{
          color: '#6abf8a',
          marginBottom: '12px',
        }}>
          Built Different
        </p>
        <h2 className="font-display" style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 400,
          color: '#e8e0d4',
          margin: 0,
          lineHeight: 1.1,
        }}>
          Engineered for<br />
          <em style={{ color: '#6abf8a' }}>Every Season.</em>
        </h2>
      </div>

      {/* Specs row */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
      }}>
        {/* Left specs */}
        <div className="bd-left" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {leftSpecs.map(spec => (
            <div key={spec.label}>
              <p style={{
                color: '#3a3a3a',
                fontSize: '0.65rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {spec.label}
              </p>
              <p className="font-display" style={{
                color: '#e8e0d4',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                fontWeight: 400,
                margin: 0,
              }}>
                {spec.value}
              </p>
              <div style={{ width: '32px', height: '1px', background: '#222', marginTop: '14px' }} />
            </div>
          ))}
        </div>

        {/* Center — bottle renders here via canvas */}
        <div style={{ flex: 1.2 }} />

        {/* Right specs */}
        <div className="bd-right" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'flex-end', textAlign: 'right' }}>
          {rightSpecs.map(spec => (
            <div key={spec.label}>
              <p style={{
                color: '#3a3a3a',
                fontSize: '0.65rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {spec.label}
              </p>
              <p className="font-display" style={{
                color: '#e8e0d4',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                fontWeight: 400,
                margin: 0,
              }}>
                {spec.value}
              </p>
              <div style={{ width: '32px', height: '1px', background: '#222', marginTop: '14px', marginLeft: 'auto' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <p className="bd-tagline" style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#2a2a2a',
        fontSize: '0.65rem',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        Crafted with purpose. Worn with intention.
      </p>

      {/* Mobile */}
      <style>{`
        @media (max-width: 768px) {
          [data-section="bottle-details"] {
            padding: 88px 24px !important;
            min-height: auto !important;
          }

          .bd-label {
            margin-bottom: 48px !important;
          }

          .bd-left, .bd-right {
            display: none !important;
          }

          .bd-tagline {
            position: static !important;
            transform: none !important;
            margin-top: 40px !important;
            text-align: center !important;
            white-space: normal !important;
            letter-spacing: 0.25em !important;
            padding: 0 8px !important;
          }
        }
      `}</style>
    </section>
  )
}