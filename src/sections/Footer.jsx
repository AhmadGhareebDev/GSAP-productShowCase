import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Footer() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.footer-left',
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    )
    gsap.fromTo('.footer-right',
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    )
  }, { scope: sectionRef })

  return (
    <footer
      ref={sectionRef}
      data-section="footer"
      style={{
        position: 'relative',
        zIndex: 8,
        background: '#060606',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '120px 40px 48px',
        overflow: 'hidden',
      }}
    >
      {/* Main content */}
      <div className="footer-main" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '40px',
      }}>
        {/* Left — brand + links */}
        <div className="footer-left" style={{ flex: 1 }}>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            color: '#e8e0d4',
            fontWeight: 400,
            margin: '0 0 40px',
            lineHeight: 1.1,
          }}>
            Born of Nature.<br />
            <em style={{ color: '#6abf8a' }}>Built for You.</em>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {['Instagram', 'Twitter / X', 'Pinterest', 'TikTok'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  color: '#333',
                  fontSize: '0.75rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  display: 'inline-block',
                  width: 'fit-content',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#6abf8a'}
                onMouseLeave={e => e.currentTarget.style.color = '#333'}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Center — bottle lives here */}
        <div className="footer-bottle-spacer" style={{ flex: 1.2 }} />

        {/* Right — contact form */}
        <div className="footer-right" style={{ flex: 1 }}>
          <p style={{
            color: '#6abf8a',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            Get in Touch
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { placeholder: 'Your name', type: 'text' },
              { placeholder: 'Your email', type: 'email' },
            ].map(field => (
              <input
                key={field.placeholder}
                type={field.type}
                placeholder={field.placeholder}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #1e1e1e',
                  padding: '12px 0',
                  color: '#e8e0d4',
                  fontSize: '0.85rem',
                  outline: 'none',
                  width: '100%',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.3s',
                }}
                onFocus={e => e.currentTarget.style.borderBottomColor = '#6abf8a'}
                onBlur={e => e.currentTarget.style.borderBottomColor = '#1e1e1e'}
              />
            ))}
            <textarea
              placeholder="Your message"
              rows={4}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #1e1e1e',
                padding: '12px 0',
                color: '#e8e0d4',
                fontSize: '0.85rem',
                outline: 'none',
                width: '100%',
                resize: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s',
              }}
              onFocus={e => e.currentTarget.style.borderBottomColor = '#6abf8a'}
              onBlur={e => e.currentTarget.style.borderBottomColor = '#1e1e1e'}
            />
            <button
              style={{
                alignSelf: 'flex-start',
                background: 'transparent',
                border: '1px solid #6abf8a',
                color: '#6abf8a',
                padding: '12px 32px',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.3s',
                marginTop: '8px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#6abf8a'
                e.currentTarget.style.color = '#080808'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#6abf8a'
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid #111',
        paddingTop: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <p style={{ color: '#2a2a2a', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {new Date().getFullYear()} The Seasons. All rights reserved.
        </p>
        <p style={{ color: '#2a2a2a', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Privacy — Terms — Shipping
        </p>
      </div>

      {/* Mobile */}
      <style>{`
        @media (max-width: 768px) {
          [data-section="footer"] {
            padding: 80px 24px 32px !important;
            min-height: auto !important;
          }

          .footer-main {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 56px !important;
          }

          .footer-bottle-spacer {
            display: none !important;
          }

          .footer-left, .footer-right {
            flex: 1 1 100% !important;
          }

          .footer-bottom {
            padding-top: 24px !important;
          }
        }
      `}</style>
    </footer>
  )
}