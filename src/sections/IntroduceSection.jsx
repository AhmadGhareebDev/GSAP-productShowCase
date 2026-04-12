import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'

const IntroduceSection = () => {
  const sectionRef = useRef(null)
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });

  useGSAP(() => {
    if (isDesktopOrTablet) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=700',
        pin: true,
        pinSpacing: true,
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'top top',
      }
    })

    tl
    .to('.left-leaf', {
      y: '100%',
      rotate: -20,
      x: -120,
      duration: 2,
    }, 0)
    .to('.right-leaf', {
      yPercent: 50,
      rotate: -100,
      x: 160,
      duration: 2,
    }, 0)
    .from('.seasons-text', {
      y: 100,
      opacity: 0,
      duration: 2,
    }, 0)
    .to('.go-right', {
      x: 40,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section="introduce"
      style={{
        backgroundImage: "url(images/noise.webp)"
      }}
      className='introduce-section'
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a]/35 via-transparent to-[#030303]/85" />
      <div className="pointer-events-none absolute -left-16 top-1/3 h-56 w-56 rounded-full bg-lime-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-12 top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-350 flex-col justify-between gap-10 md:flex-row md:items-center md:gap-0">

        <div className="flex flex-col text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-3 self-center rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm md:self-start">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            <span className="section-kicker text-lime-300">Signature Collection</span>
          </div>

          <p className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.02] drop-shadow-md text-white">
            <span className="seasons-text inline-block">Just for</span><br />
            <span className="seasons-text inline-block">You.</span>
          </p>

          <p className="mt-5 max-w-md text-sm text-white/70 md:text-base">
            A curated seasonal line made to shift with mood, weather, and memory.
          </p>
        </div>

        <div className="flex w-full max-w-xl flex-col items-center justify-center p-1 text-center md:items-end md:text-right">
          <p className="text-glow-titanium uppercase tracking-[0.3em] text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-4 md:mb-6">
            Not just one scent.
          </p>

          <p className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.02] drop-shadow-md">
            <span className="text-transparent bg-clip-text bg-linear-to-br from-white to-gray-400">All four <br /></span>
            <span className="seasons-text go-right inline-block text-white">seasons.</span>
          </p>

          <button type="button" className="ui-pill-btn section-kicker mt-6 rounded-full border border-lime-300/60 bg-lime-400/15 px-6 py-3 text-lime-200 transition-colors duration-300 hover:bg-lime-400 hover:text-[#193000]">
            Discover the Set
          </button>
        </div>
      </div>

      <img src="images/left-leaf.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" className='left-leaf opacity-50 brightness-75 contrast-110 pointer-events-none' />
      <img src="images/right-leaf.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" className='right-leaf opacity-45 brightness-75 contrast-110 pointer-events-none' />
    </section>
  )
}

export default IntroduceSection