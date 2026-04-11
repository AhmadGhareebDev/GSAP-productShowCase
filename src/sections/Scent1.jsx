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
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.9] tracking-tighter drop-shadow-2xl text-white">
            <span className="scent-text-anim inline-block">Autumn</span><br />
            <span className="scent-text-anim inline-block text-transparent bg-clip-text bg-linear-to-br from-orange-200 via-orange-300 to-orange-600">Scent.</span>
          </p>
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
    </section>
  )
}

export default Scent1