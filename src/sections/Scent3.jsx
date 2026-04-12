import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'

const Scent3 = () => {
  const containerRef = useRef(null)
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });

  useGSAP(() => {
    gsap.fromTo('.glassy-scent-3',
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scent-3-section',
          start: 'top top',
          end: '+=900',
          scrub: true,
          pin: isDesktopOrTablet,
          pinSpacing: isDesktopOrTablet,
        },
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scent-3-section',
        start: 'top center',
        end: 'top top',
      }
    })

    tl.from('.scent-text-anim-3', {
      y: 100,
      autoAlpha: 0,
      duration: 2,
      stagger: 0.1,
      force3D: true,
    }, 0)

    tl.fromTo('.winter-purple-left', {
      y: -260,
      rotate: -24,
      autoAlpha: 0,
    }, {
      y: 220,
      rotate: 12,
      autoAlpha: 0.4,
      duration: 2,
      ease: 'power2.out',
      force3D: true,
    }, 0)

    tl.fromTo('.winter-purple-right', {
      x: 120,
      y: -300,
      rotate: 30,
      autoAlpha: 0,
    }, {
      x: 0,
      y: 70,
      rotate: -16,
      autoAlpha: 0.4,
      duration: 2,
      ease: 'power2.out',
      force3D: true,
    }, 0)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      data-section="scent-3" 
      className='scent-3-section bg-scent-3 relative w-screen h-screen flex flex-col justify-center items-end px-6 md:px-16 lg:px-32 overflow-hidden'
    >
      <div className="grain-overlay" />
      <div className="glow-orb glow-orb-3" />

      <div className="relative flex flex-col md:flex-row justify-between w-full items-center md:items-center gap-10 md:gap-0 z-30">
        
        <div className="flex flex-col text-center md:text-left">
          <p className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.92] drop-shadow-2xl text-white">
            <span className="scent-text-anim-3 inline-block">Winter</span><br />
            <span className="scent-text-anim-3 inline-block text-transparent bg-clip-text bg-linear-to-br from-indigo-200 via-indigo-300 to-indigo-600">Scent.</span>
          </p>
          <button type="button" className="ui-pill-btn group relative mt-6 inline-flex overflow-hidden rounded-full border border-indigo-300/70 bg-linear-to-r from-indigo-500/25 to-indigo-800/20 px-6 py-3 text-xs font-bold tracking-[0.18em] uppercase text-indigo-100">
            <span className="absolute inset-0 origin-left scale-x-0 bg-indigo-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#111b3b]">Buy Now</span>
          </button>
        </div>

        <div className="flex flex-col text-center md:text-right items-center md:items-end justify-center w-full md:w-auto max-w-sm lg:max-w-md z-50">
          <p className="scent-text-anim-3 text-indigo-200/80 uppercase tracking-[0.4em] text-xs sm:text-sm font-bold mb-4">
            Sensory Experience 03
          </p>
          <h2 className="scent-text-anim-3 text-white text-2xl md:text-3xl font-medium mb-4 leading-tight">
            The Silent <br/> Solstice.
          </h2>
          <p className="scent-text-anim-3 text-gray-400/90 text-sm md:text-base font-light font-sans max-w-xs md:max-w-md leading-relaxed">
            Embrace the crisp, icy bite of pure mountain air gently layered over frosted pine. Complemented with deep amber and a vanilla finish, offering quiet, cozy solstice comfort.
          </p>
        </div>
      </div>

      <div className='glassy-overlay-full glassy-scent-3'></div>
      <img src="images/Purple-leaf.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" className='winter-purple-left absolute left-0 top-0 z-10 w-28 md:w-auto opacity-40 brightness-50 contrast-125 pointer-events-none' />
      <img src="images/Purple-leaf.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" className='winter-purple-right absolute right-0 top-0 z-10 w-24 md:w-auto opacity-40 brightness-50 contrast-125 pointer-events-none' />
    </section>
  )
}

export default Scent3
