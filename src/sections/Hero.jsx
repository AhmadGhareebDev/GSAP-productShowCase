import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".hero-reveal", {
        y: 56,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".hero-chip", {
        x: -20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.15,
      });

      gsap.to(".hero-parallax", {
        y: 220,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} data-section="hero" className="relative min-h-screen overflow-hidden bg-[#0d0f0d] text-[#faf9f5]">
      <div className="absolute inset-0 z-0">
        <img src="/images/hero-background-img.webp" alt="" className="h-full w-full object-cover opacity-60 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0d0f0d]/40 via-[#0d0f0d]/20 to-[#0d0f0d]" />
      </div>

      <div className="hero-parallax pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <p className="hero-reveal text-[24vw] font-black leading-none tracking-[-0.08em] text-white/10">NATURE</p>
      </div>

      <div className="relative z-20 mx-auto grid min-h-screen w-full max-w-400 grid-cols-1 items-center gap-10 px-6 pb-16 pt-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <div className="hero-chip mb-6 flex items-center gap-3">
            <span className="h-px w-12 bg-lime-400" />
            <span className="section-kicker text-lime-400">EST. MMXXIV</span>
          </div>

          <h1 className="hero-reveal font-display text-5xl font-semibold leading-[0.92] md:text-7xl lg:text-8xl">
            <span className="block">Born</span>
            <span className="block text-lime-400">of Nature.</span>
          </h1>

          <p className="hero-reveal mt-6 max-w-xs text-base italic text-[#fff8f4]/85 md:text-lg">
            Synthesizing raw natural energy into one premium fragrance experience.
          </p>
        </div>

        <div className="md:col-span-4">
          <div className="relative mx-auto flex min-h-115 items-center justify-center" />
        </div>

        <div className="md:col-span-4 md:text-right">
          <h2 className="hero-reveal font-display text-5xl font-semibold leading-[0.92] md:text-7xl lg:text-8xl">
            <span className="block text-[#faf9f5]">Built</span>
            <span className="block text-lime-400">for You.</span>
          </h2>

          <div className="hero-reveal ui-panel mt-8 rounded-xl border border-white/10 bg-[#242624]/55 p-6 backdrop-blur-xl md:ml-auto md:max-w-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.25em] text-white/40">FULL COLLECTION</span>
              <span className="font-bold text-lime-400">€89</span>
            </div>
            <p className="text-sm leading-relaxed text-[#ababa8]">
              All four seasons in one set, with premium gift packaging and free engraving.
            </p>
            <button type="button" className="ui-pill-btn mt-5 w-full rounded-full bg-lime-400 py-3 text-sm font-bold tracking-[0.18em] text-[#274000] transition-transform duration-300 hover:scale-[1.02]">
              Get the Collection
            </button>
          </div>
        </div>
      </div>

      <div className="hero-reveal ui-panel relative z-30 mx-6 mb-6 w-auto rounded-xl border border-white/10 bg-[#121412]/65 p-4 backdrop-blur-xl md:absolute md:bottom-8 md:left-10 md:mx-0 md:mb-0 md:w-[calc(100%-5rem)] md:max-w-xl md:p-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400">Capacity</p>
            <p className="mt-1 text-lg font-extrabold tracking-tight text-[#faf9f5] md:text-xl">100 ml</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400">Height</p>
            <p className="mt-1 text-lg font-extrabold tracking-tight text-[#faf9f5] md:text-xl">14.5 cm</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400">Weight</p>
            <p className="mt-1 text-lg font-extrabold tracking-tight text-[#faf9f5] md:text-xl">185 g</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;