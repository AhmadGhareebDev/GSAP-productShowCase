import Hero from "./sections/Hero";
import IntroduceSection from "./sections/IntroduceSection";
import HeroBottlePortal from "./components/HeroBottlePortal";
import { ScrollSmoother , ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollSmoother , ScrollTrigger)
const App = () => {

    useGSAP(() => {
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });
  });
  return (
    <main className="bg-black min-h-screen">
       <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <IntroduceSection />
          <HeroBottlePortal />
          </div>
        </div>

    </main>
  );
};

export default App;