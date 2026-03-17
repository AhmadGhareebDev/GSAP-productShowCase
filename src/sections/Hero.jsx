import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {

      const splitTitle = new SplitText(".hero-title", {
        type: "words",
      });

      gsap.fromTo(
        splitTitle.words,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
      
      }
      );


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-title",
          duration: 3,
          start: "bottom 20%",
          end: "bottom top",
          scrub: 2
        },
      });
      tl.to(".hero-title", { y: 500 });

     
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-screen h-dvh bg-center bg-cover bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url(/images/hero.png)" }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-50 h-full w-full flex items-center justify-center px-6">
        <h1 className="hero-title text-white text-center font-extrabold tracking-tight
          leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          Born of <span className="text-lime-500">Nature</span>. <br /> Built for <span>You</span>.
        </h1>
      </div>
    </section>
  );
};

export default Hero;