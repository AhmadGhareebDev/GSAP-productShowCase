import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(".hero-title", { type: "words" });
      gsap.fromTo(
        split.words,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.to(".hero-title", {
        y:300,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 20%",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      data-section="hero"
      className="relative w-screen h-dvh bg-center bg-cover bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url(/images/hero-background-img.webp)" }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-20 h-full w-full flex items-center justify-center px-6">
        <h1
          className="hero-title text-white text-center font-extrabold tracking-tight
          leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Born of <span className="text-lime-500">Nature</span>. <br /> Built
          for <span>You</span>.
        </h1>
      </div>
    </section>
  );
};

export default Hero;