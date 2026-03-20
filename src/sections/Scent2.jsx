import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const Scent2 = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.glassy-scent-2',
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scent-2-section',
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
        trigger: '.scent-2-section',
        start: 'top center',
        end: 'top top',
      }
    })

    tl.from('.scent-text-anim-2', {
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
        backgroundImage: "url('images/scent-2.webp')",
      }}
      data-section="scent-2" 
      className='scent-2-section relative w-screen h-screen inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-end px-6 md:px-16 lg:px-32 overflow-hidden'
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col md:flex-row justify-between w-full items-center md:items-center gap-10 md:gap-0 z-30">
        
        <div className="flex flex-col text-center md:text-left">
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.1] tracking-tighter drop-shadow-md text-white">
            <span className="scent-text-anim-2 inline-block">Spring</span><br />
            <span className="scent-text-anim-2 inline-block text-transparent bg-clip-text bg-gradient-to-br from-red-300 to-red-500">Scent.</span>
          </p>
        </div>

        <div className="flex flex-col text-center md:text-right items-center md:items-end justify-center w-full md:w-auto max-w-sm lg:max-w-md z-50">
          <p className="scent-text-anim-2 text-red-300 uppercase tracking-[0.3em] text-lg sm:text-xl font-bold mb-2">
            Spring Scent
          </p>
          <p className="scent-text-anim-2 text-gray-300 text-sm md:text-base leading-relaxed drop-shadow-md">
            Waken your senses with the vibrant bloom of cherry blossoms and morning dew. Intertwined with soft jasmine and a rush of playful citrus, it beautifully announces the return of life and light.
          </p>
        </div>
      </div>

      <div className='glassy-overlay-full glassy-scent-2'></div>
    </section>
  )
}

export default Scent2
