import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import BottleScene from "./components/BottleScene";
import Hero from "./sections/Hero";
import IntroduceSection from "./sections/IntroduceSection";
import Scent1 from "./sections/Scent1";
import Scent2 from "./sections/Scent2";
import Scent3 from "./sections/Scent3";
import Scent4 from "./sections/Scent4";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
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
      <BottleScene />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <IntroduceSection />
          <Scent1 />
          <Scent2 />
          <Scent3 />
          <Scent4 />
        </div>
      </div>
    </>
  );
}