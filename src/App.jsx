import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import BottleScene from "./components/BottleScene";
import Hero from "./sections/Hero";
import IntroduceSection from "./sections/IntroduceSection";

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
        </div>
      </div>
    </>
  );
}