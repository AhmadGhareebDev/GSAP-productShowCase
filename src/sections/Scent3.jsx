import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const Scent3 = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.glassy-scent-3',
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scent-3-section',
          start: 'top top',
          end: '+=900',
          scrub: true,
          pin: true,
          pinSpacing: true,
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
      opacity: 0,
      duration: 2,
      stagger: 0.1,
    }, 0)

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      style={{
        backgroundImage: "url('images/scent-3.png')",
      }}
      data-section="scent-3" 
      className='scent-3-section relative w-screen h-screen inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-end px-6 md:px-16 lg:px-32 overflow-hidden'
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex justify-between w-full items-center z-30">
        
        <div className="flex flex-col text-left">
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.1] tracking-tighter drop-shadow-md text-white">
            <span className="scent-text-anim-3 inline-block">Winter</span><br />
            <span className="scent-text-anim-3 inline-block text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-purple-500">Scent.</span>
          </p>
        </div>

        <div className="flex flex-col text-right items-end justify-center max-w-sm lg:max-w-md z-50">
          <p className="scent-text-anim-3 text-indigo-300 uppercase tracking-[0.3em] text-lg sm:text-xl font-bold mb-2">
            Winter Scent
          </p>
          <p className="scent-text-anim-3 text-gray-300 text-sm md:text-base leading-relaxed drop-shadow-md">
            Embrace the crisp, icy bite of pure mountain air gently layered over frosted pine. Complemented with deep amber and a vanilla finish, offering quiet, cozy solstice comfort.
          </p>
        </div>
      </div>

      <div className='glassy-overlay-full glassy-scent-3'></div>
    </section>
  )
}

export default Scent3
