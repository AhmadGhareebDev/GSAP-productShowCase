import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const images = [
  { id: 1,  src: '/images/Gallery-1.webp',  alt: '', span: 'wide' },
  { id: 2,  src: '/images/Gallery-2.webp',  alt: '', span: 'tall' },
  { id: 3,  src: '/images/Gallery-3.webp',  alt: '', span: 'tall' },
  { id: 4,  src: '/images/Gallery-4.webp',  alt: '', span: 'tall' },
  { id: 5,  src: '/images/Gallery-5.webp',  alt: '', span: 'tall' },
  { id: 6,  src: '/images/hero-background-img.webp',  alt: '', span: 'wide' },

]

export default function GallerySection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
        }
    })

    tl.from('.gallery-item' , {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
    })

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section="gallery"
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#0a0a0a',
        padding: '100px 24px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '64px', textAlign: 'center' }}>
        <p className="section-kicker" style={{
          color: '#555',
          marginBottom: '16px',
        }}>
          The Collection
        </p>
        <h2 className="font-display" style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 400,
          color: '#e8e0d4',
          lineHeight: 1,
          margin: 0,
        }}>
          Four Seasons.<br />
          <em style={{ color: '#6abf8a' }}>One Bottle.</em>
        </h2>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridAutoRows: '220px',
        gap: '12px',
      }}>
        {images.map((img) => {
          const colSpan = img.span === 'wide' ? 4 : img.span === 'tall' ? 2 : 2
          const rowSpan = img.span === 'tall' ? 2 : 1

          return (
            <div
              key={img.id}
              className="gallery-item"
              style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
                overflow: 'hidden',
                borderRadius: '14px',
                position: 'relative',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget.querySelector('img'), {
                  scale: 1.08,
                  duration: 0.6,
                  ease: 'power2.out',
                })
                gsap.to(e.currentTarget.querySelector('.overlay'), {
                  opacity: 1,
                  duration: 0.4,
                })
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget.querySelector('img'), {
                  scale: 1,
                  duration: 0.6,
                  ease: 'power2.out',
                })
                gsap.to(e.currentTarget.querySelector('.overlay'), {
                  opacity: 0,
                  duration: 0.4,
                })
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.75) saturate(0.8)',
                  willChange: 'transform',
                }}
              />
              <div
                className="overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                }}
              >
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#e8e0d4',
                }}>
                  {img.alt}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 768px) {
          .gallery-item {
            grid-column: span 6 !important;
            grid-row: span 1 !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .gallery-item {
            grid-column: span 3 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}