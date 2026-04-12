import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import BottleScene from "./components/BottleScene";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./sections/Hero";
import IntroduceSection from "./sections/IntroduceSection";
import Scent1 from "./sections/Scent1";
import Scent2 from "./sections/Scent2";
import Scent3 from "./sections/Scent3";
import Scent4 from "./sections/Scent4";
import GallerySection from "./sections/GallerySection";
import BottleDetails from "./sections/BottleDetails";
import Pricing from "./sections/Pricing";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function AppContent() {
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });
  const { isLoading, setModelLoaded } = useLoading();
  
  useGSAP(
    () => {
      if (!isDesktopOrTablet) return;

      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.20,
        effects: false,
      });

      return () => smoother.kill();
    },
    { dependencies: [isDesktopOrTablet], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("#smooth-content [data-section]");
      const triggers = sections.map((section) =>
        gsap.fromTo(
          section,
          { autoAlpha: 0.92, y: 18, filter: "blur(2px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        ).scrollTrigger
      );

      return () => triggers.forEach((st) => st?.kill());
    },
    { dependencies: [isDesktopOrTablet], revertOnUpdate: true }
  );

  useEffect(() => {
    if (!isDesktopOrTablet) {
      setModelLoaded();
    }
  }, [isDesktopOrTablet, setModelLoaded]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      {isDesktopOrTablet && <BottleScene />}

      <nav className="fixed top-0 z-50 w-full bg-black/35 backdrop-blur-xl" style={{ opacity: isLoading ? 0 : 1 }}>
        <div className="mx-auto flex w-full max-w-400 items-center justify-between px-6 py-5 md:px-10">
          <p className="font-display text-xl font-semibold tracking-[0.14em] text-[#faf9f5]">GH</p>

          <div className="hidden items-center gap-10 md:flex">
            <button type="button" className="section-kicker border-b-2 border-lime-400 pb-1 text-lime-400">Shop</button>
            <button type="button" className="section-kicker text-white/80 transition-colors duration-300 hover:text-lime-400">About</button>
          </div>

          <button type="button" className="ui-pill-btn section-kicker rounded-full border border-white/20 px-4 py-2 text-white/85 hover:border-lime-400/70 hover:text-lime-300">Connect</button>
        </div>
      </nav>

      <div id="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <div id="smooth-content">
          <Hero />
          <IntroduceSection />
          <Scent1 />
          <Scent2 />
          <Scent3 />
          <Scent4 />
          <GallerySection/>
          <BottleDetails/>
          <Pricing/>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}