import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const Scent1 = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.glassy-scent-1',
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scent-1-section',
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
        trigger: '.scent-1-section',
        start: 'top center',
        end: 'top top',
      }
    })

    tl.from('.scent-text-anim', {
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
        backgroundImage: "url('images/scent-1.png')",
      }}
      data-section="scent-1" 
      className='scent-1-section relative w-screen h-screen inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-end px-6 md:px-16 lg:px-32 overflow-hidden'
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex justify-between w-full items-center z-30">
        
        {/* Left Side */}
        <div className="flex flex-col text-left">
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.1] tracking-tighter drop-shadow-md text-white">
            <span className="scent-text-anim inline-block">Autumn</span><br />
            <span className="scent-text-anim inline-block text-transparent bg-clip-text bg-gradient-to-br from-orange-200 to-orange-500">Scent.</span>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col text-right items-end justify-center max-w-sm lg:max-w-md z-50">
          <p className="scent-text-anim text-orange-200 uppercase tracking-[0.3em] text-lg sm:text-xl font-bold mb-2">
            Autumn Scent
          </p>
          <p className="scent-text-anim text-gray-300 text-sm md:text-base leading-relaxed drop-shadow-md">
            Breathe in the crisp, golden essence of falling leaves. Accented with warm cinnamon, roasted clove, and a mysterious hint of smoked cedarwood, it perfectly captures the nostalgic chill of an evening harvest. 
          </p>
        </div>
      </div>

      <div className='glassy-overlay-full glassy-scent-1'></div>
    </section>
  )
}

export default Scent1