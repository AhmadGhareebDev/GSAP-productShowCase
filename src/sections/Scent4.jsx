import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'

const Scent4 = () => {
  const containerRef = useRef(null)
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });

  useGSAP(() => {
    gsap.fromTo('.glassy-scent-4',
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: '.scent-4-section',
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
        trigger: '.scent-4-section',
        start: 'top center',
        end: 'top top',
      }
    })

    tl.from('.scent-text-anim-4', {
      y: 100,
      autoAlpha: 0,
      duration: 2,
      stagger: 0.1,
      force3D: true,
    }, 0)
    
    tl.from('.left-leaf', {
      x: -100,
      autoAlpha: 0,
      duration: 2,
      rotate: -45,
      force3D: true,
    }, 0)
    tl.from('.right-leaf', {
      x: 100,
      autoAlpha: 0,
      duration: 2,
      rotate: 45,
      force3D: true,
    }, 0)


  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      data-section="scent-4" 
      className='scent-4-section bg-scent-4 relative w-screen h-screen flex flex-col justify-center items-end px-6 md:px-16 lg:px-32 overflow-hidden'
    >
      <div className="grain-overlay" />
      <div className="glow-orb glow-orb-4" />

      <div className="relative flex flex-col md:flex-row justify-between w-full items-center md:items-center gap-10 md:gap-0 z-30">
        
        <div className="flex flex-col text-center md:text-left">
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.9] tracking-tighter drop-shadow-2xl text-white">
            <span className="scent-text-anim-4 inline-block">Summer</span><br />
            <span className="scent-text-anim-4 inline-block text-transparent bg-clip-text bg-linear-to-br from-teal-200 via-teal-300 to-teal-600">Scent.</span>
          </p>
        </div>

        <div className="flex flex-col text-center md:text-right items-center md:items-end justify-center w-full md:w-auto max-w-sm lg:max-w-md z-50">
          <p className="scent-text-anim-4 text-teal-200/80 uppercase tracking-[0.4em] text-xs sm:text-sm font-bold mb-4">
            Sensory Experience 04
          </p>
          <h2 className="scent-text-anim-4 text-white text-2xl md:text-3xl font-medium mb-4 leading-tight">
            The Eternal <br/> Sunlight.
          </h2>
          <p className="scent-text-anim-4 text-gray-400/90 text-sm md:text-base font-light font-sans max-w-xs md:max-w-md leading-relaxed">
            Dive into a rush of sun-drenched oceanic breezes infused with wild mint. An energetic, bright, and deeply refreshing burst that radiates pure tropical sunlight.
          </p>
        </div>
      </div>


      <div className='glassy-overlay-full glassy-scent-4'></div>
      <img src="images/left-leaf.png" alt="" className='left-leaf z-10 opacity-40 brightness-50 contrast-125' />
      <img src="images/right-leaf.png" alt="" className='right-leaf z-10 opacity-40 brightness-50 contrast-125' />
    </section>
  )
}

export default Scent4
