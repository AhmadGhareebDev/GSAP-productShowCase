import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const Scent4 = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.glassy-scent-4',
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scent-4-section',
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
        trigger: '.scent-4-section',
        start: 'top center',
        end: 'top top',
      }
    })

    tl.from('.scent-text-anim-4', {
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
        backgroundImage: "url('images/scent-4.png')",
      }}
      data-section="scent-4" 
      className='scent-4-section relative w-screen h-screen inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-end px-6 md:px-16 lg:px-32 overflow-hidden'
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex justify-between w-full items-center z-30">
        
        <div className="flex flex-col text-left">
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.1] tracking-tighter drop-shadow-md text-white">
            <span className="scent-text-anim-4 inline-block">Summer</span><br />
            <span className="scent-text-anim-4 inline-block text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-teal-500">Scent.</span>
          </p>
        </div>

        <div className="flex flex-col text-right items-end justify-center max-w-sm lg:max-w-md z-50">
          <p className="scent-text-anim-4 text-green-300 uppercase tracking-[0.3em] text-lg sm:text-xl font-bold mb-2">
            Summer Scent
          </p>
          <p className="scent-text-anim-4 text-gray-300 text-sm md:text-base leading-relaxed drop-shadow-md">
            Dive into a rush of sun-drenched oceanic breezes infused with vibrant wild mint. An energetic, bright, and deeply refreshing burst that radiates pure tropical sunlight.
          </p>
        </div>
      </div>

      <div className='glassy-overlay-full glassy-scent-4'></div>
    </section>
  )
}

export default Scent4
