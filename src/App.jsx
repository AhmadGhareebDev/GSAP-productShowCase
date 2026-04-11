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
        smooth: 1.35,
        effects: false,
      });

      return () => smoother.kill();
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