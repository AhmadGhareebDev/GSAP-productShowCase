import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'

const Scent1 = () => {
  const containerRef = useRef(null)
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });

  useGSAP(() => {
    gsap.fromTo('.glassy-scent-1',
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scent-1-section',
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
        trigger: '.scent-1-section',
        start: 'top center',
        end: 'top top',
      }
    })

    tl.from('.scent-text-anim', {
      y: 100,
      autoAlpha: 0,
      duration: 2,
      stagger: 0.1,
      force3D: true,
    }, 0)

    tl.from('.autumn-left-leaf', {
      x: -100,
      autoAlpha: 0,
      duration: 2,
      rotate: -45,
      force3D: true,
    }, 0)

    tl.from('.autumn-right-leaf', {
      x: 90,
      y: 0,
      autoAlpha: 0,
      duration: 2,
      rotate: 35,
      ease: 'power3.out',
      force3D: true,
    }, 0)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      data-section="scent-1" 
      className='scent-1-section bg-scent-1 relative w-screen h-screen flex flex-col justify-center items-end px-6 md:px-16 lg:px-32 overflow-hidden'
    >
      <div className="grain-overlay" />
      <div className="glow-orb glow-orb-1" />

      <div className="relative flex flex-col md:flex-row justify-between w-full items-center md:items-center gap-10 md:gap-0 z-30">
        
        {/* Left Side */}
        <div className="flex flex-col text-center md:text-left">
          <p className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.92] drop-shadow-2xl text-white">
            <span className="scent-text-anim inline-block">Autumn</span><br />
            <span className="scent-text-anim inline-block text-transparent bg-clip-text bg-linear-to-br from-orange-200 via-orange-300 to-orange-600">Scent.</span>
          </p>
          <button type="button" className="ui-pill-btn group relative mt-6 inline-flex overflow-hidden rounded-full border border-orange-300/70 bg-linear-to-r from-orange-500/25 to-orange-800/20 px-6 py-3 text-xs font-bold tracking-[0.18em] uppercase text-orange-100">
            <span className="absolute inset-0 origin-left scale-x-0 bg-orange-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#2b1305]">Buy Now</span>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex flex-col text-center md:text-right items-center md:items-end justify-center w-full md:w-auto max-w-sm lg:max-w-md z-50">
          <p className="scent-text-anim text-orange-200/80 uppercase tracking-[0.4em] text-xs sm:text-sm font-bold mb-4">
            Sensory Experience 01
          </p>
          <h2 className="scent-text-anim text-white text-2xl md:text-3xl font-medium mb-4 leading-tight">
            The Golden Hour <br/> of the Year.
          </h2>
          <p className="scent-text-anim text-gray-400/90 text-sm md:text-base font-light font-sans max-w-xs md:max-w-md leading-relaxed">
            Breathe in the crisp, golden essence of falling leaves. Accented with warm cinnamon and roasted clove, it captures the nostalgic chill of an evening harvest. 
          </p>
        </div>
      </div>

      <div className='glassy-overlay-full glassy-scent-1'></div>
      <img src="images/Autumn-Leaf.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" className='autumn-left-leaf left-leaf z-10 opacity-40 brightness-50 contrast-125' />
      <img src="images/Autumn-Leaf.webp" alt="" loading="lazy" decoding="async" fetchPriority="low" className='autumn-right-leaf right-leaf scale-x-[-1] z-10 opacity-40 brightness-50 contrast-125' />
    </section>
  )
}

export default Scent1