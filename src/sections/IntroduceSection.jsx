import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'

const IntroduceSection = () => {
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });

  useGSAP(() => {

    gsap.fromTo('.glassy-overlay',
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.introduce-section',
          start: 'top top',
          end: '+=700',
          scrub: true,
          pin: isDesktopOrTablet,
          pinSpacing: isDesktopOrTablet,
        },
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.introduce-section',
        start: 'top center',
        end: 'top top',
      }
    })

    tl
    .to('.left-leaf', {
      y: '100%',
      rotate: -20,
      x: -120,
      duration: 2,
    }, 0)
    .to('.right-leaf', {
      yPercent: 50,
      rotate: -100,
      x: 160,
      duration: 2,
    }, 0)
    .from('.seasons-text', {
      y: 100,
      opacity: 0,
      duration: 2,
    }, 0)
    .to('.go-right', {
      x: 40,
    })
  })

  return (
    <section
      data-section="introduce"
      style={{
        backgroundImage: "url(images/noise.png)"
      }}
      className='introduce-section'
    >

      <div className="flex flex-col md:flex-row justify-between w-full items-center md:items-center gap-10 md:gap-0 z-10">

        <div className="flex flex-col text-center md:text-left">
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.1] tracking-tighter drop-shadow-md text-white">
            <span className="seasons-text inline-block">Just for</span><br />
            <span className="seasons-text inline-block">You.</span>
          </p>
        </div>

        <div className="flex flex-col text-center md:text-right items-center md:items-end justify-center">
          <p className="text-glow-titanium uppercase tracking-[0.3em] text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-4 md:mb-6">
            Not just one scent.
          </p>
          <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.1] tracking-tighter drop-shadow-md">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">All four <br /></span>
            <span className="seasons-text go-right inline-block text-white">seasons.</span>
          </p>
        </div>
      </div>

      <img src="images/left-leaf.png" alt="" className='left-leaf' />
      <img src="images/right-leaf.png" alt="" className='right-leaf' />
      { isDesktopOrTablet && <div className='glassy-overlay'></div>}
    </section>
  )
}

export default IntroduceSection