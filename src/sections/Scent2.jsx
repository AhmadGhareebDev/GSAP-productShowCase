import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'

const Scent2 = () => {
  const containerRef = useRef(null)
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });

  useGSAP(() => {
    gsap.fromTo('.glassy-scent-2',
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scent-2-section',
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
        trigger: '.scent-2-section',
        start: 'top center',
        end: 'top top',
      }
    })

    tl.from('.scent-text-anim-2', {
      y: 100,
      autoAlpha: 0,
      duration: 2,
      stagger: 0.1,
      force3D: true,
    }, 0)

    tl.fromTo('.spring-rose-left', {
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

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      data-section="scent-2" 
      className='scent-2-section bg-scent-2 relative w-screen h-screen flex flex-col justify-center items-end px-6 md:px-16 lg:px-32 overflow-hidden'
    >
      <div className="grain-overlay" />
      <div className="glow-orb glow-orb-2" />

      <div className="relative flex flex-col md:flex-row justify-between w-full items-center md:items-center gap-10 md:gap-0 z-30">
        
        <div className="flex flex-col text-center md:text-left">
          <p className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.92] drop-shadow-2xl text-white">
            <span className="scent-text-anim-2 inline-block">Spring</span><br />
            <span className="scent-text-anim-2 inline-block text-transparent bg-clip-text bg-linear-to-br from-rose-200 via-rose-300 to-rose-600">Scent.</span>
          </p>
          <button type="button" className="ui-pill-btn group relative mt-6 inline-flex overflow-hidden rounded-full border border-rose-300/70 bg-linear-to-r from-rose-500/25 to-rose-800/20 px-6 py-3 text-xs font-bold tracking-[0.18em] uppercase text-rose-100">
            <span className="absolute inset-0 origin-left scale-x-0 bg-rose-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#2f0b14]">Buy Now</span>
          </button>
        </div>

        <div className="flex flex-col text-center md:text-right items-center md:items-end justify-center w-full md:w-auto max-w-sm lg:max-w-md z-50">
          <p className="scent-text-anim-2 text-rose-200/80 uppercase tracking-[0.4em] text-xs sm:text-sm font-bold mb-4">
            Sensory Experience 02
          </p>
          <h2 className="scent-text-anim-2 text-white text-2xl md:text-3xl font-medium mb-4 leading-tight">
            The Awakening <br/> of Nature.
          </h2>
          <p className="scent-text-anim-2 text-gray-400/90 text-sm md:text-base font-light font-sans max-w-xs md:max-w-md leading-relaxed">
            Waken your senses with the vibrant bloom of cherry blossoms and morning dew. Intertwined with soft jasmine, it beautifully announces the return of life and light.
          </p>
        </div>
      </div>

      <div className='glassy-overlay-full glassy-scent-2'></div>
      <img src="images/Spring-rose.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" className='spring-rose-left absolute left-0 top-0 z-10 w-28 md:w-auto opacity-40 brightness-50 contrast-125 pointer-events-none' />
    </section>
  )
}

export default Scent2
