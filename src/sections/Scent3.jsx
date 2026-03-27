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
        force3D: true,
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
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.9] tracking-tighter drop-shadow-2xl text-white">
            <span className="scent-text-anim-3 inline-block">Winter</span><br />
            <span className="scent-text-anim-3 inline-block text-transparent bg-clip-text bg-linear-to-br from-indigo-200 via-indigo-300 to-indigo-600">Scent.</span>
          </p>
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
    </section>
  )
}

export default Scent3
