import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

import BottleScene from "./components/BottleScene";
import Hero from "./sections/Hero";
import IntroduceSection from "./sections/IntroduceSection";
import Scent1 from "./sections/Scent1";
import Scent2 from "./sections/Scent2";
import Scent3 from "./sections/Scent3";
import Scent4 from "./sections/Scent4";
import GallerySection from "./sections/GallerySection";
import BottleInfo from "./sections/BottleInfo";
import BottleDetails from "./sections/BottleDetails";
import Pricing from "./sections/Pricing";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });
  
  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
    });
  });

  return (
    <>
      {isDesktopOrTablet && <BottleScene />}

      <div id="smooth-wrapper">
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