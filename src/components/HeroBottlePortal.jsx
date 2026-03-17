import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Bottle from "./Bottle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function HeroBottlePortal() {
  const [mountNode, setMountNode] = useState(null);
  const bottleRef = useRef(null);

  useLayoutEffect(() => {
    const container = document.createElement("div");
    container.dataset.heroBottleLayer = "true";
    container.style.position = "fixed";
    container.style.inset = "0";
    // Keep below Hero text (Hero uses z-20). We'll lift Hero section above this.
    container.style.zIndex = "1";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);

    setMountNode(container);
    return () => {
      container.remove();
      setMountNode(null);
    };
  }, []);

  const gl = useMemo(() => ({ antialias: true, alpha: true }), []);
  const camera = useMemo(
    () => ({ fov: 38, position: [0, 0.5, 6], near: 0.1, far: 100 }),
    []
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroSection = document.querySelector("section");
    const introduceSection = document.querySelector(
      'section[data-section="introduce"]'
    );
    const group = bottleRef.current;
    if (!heroSection || !introduceSection || !group) return;

    // Ensure Hero text can sit above the fixed portal layer without editing Hero.jsx
    const prevIsolation = heroSection.style.isolation;
    const prevPosition = heroSection.style.position;
    const prevZIndex = heroSection.style.zIndex;
    heroSection.style.isolation = "isolate";
    if (!heroSection.style.position) heroSection.style.position = "relative";
    heroSection.style.zIndex = "10";

    const heroTextWrap = heroSection.querySelector(".relative.z-20");
    const prevTextZ = heroTextWrap?.style.zIndex;
    // Ensure the text layer stays above the portal.
    if (heroTextWrap) heroTextWrap.style.zIndex = "20";

    // Initial: bottle not visible
    group.visible = false;
    group.position.set(0, -0.3, 0);
    group.scale.set(0, 0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top 80%",
        endTrigger: introduceSection,
        end: "center center",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Reveal only once we start the scroll range
          group.visible = self.progress > 0;
        },
      },
    });

    // Move/scale into the "center" for the next section (scene-space approximation)
    tl.to(
      group.position,
      { x: 0, y: 0.2, z: 0, ease: "none" },
      0
    ).to(group.scale, { x: 1, y: 1, z: 1, ease: "none" }, 0);

    ScrollTrigger.refresh();
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      heroSection.style.isolation = prevIsolation;
      heroSection.style.position = prevPosition;
      heroSection.style.zIndex = prevZIndex;
      if (heroTextWrap) heroTextWrap.style.zIndex = prevTextZ ?? "";
    };
  }, [mountNode]);

  if (!mountNode) return null;

  return createPortal(
    <Canvas
      shadows
      camera={camera}
      gl={gl}
      onCreated={({ gl: renderer }) => {
        // Ensure the canvas is fully transparent (no background fill)
        renderer.setClearAlpha(0);
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight intensity={1.2} position={[3, 6, 4]} castShadow />
      <directionalLight intensity={0.4} position={[-4, 2, 2]} color="#d0f0e0" />
      <directionalLight intensity={0.5} position={[0, 3, -5]} />

      <group ref={bottleRef}>
        <Bottle />
      </group>

      {/* Enable controls for testing, but keep them non-interactive because the layer is pointer-events:none */}
      <OrbitControls enablePan={false} enabled={false} />
    </Canvas>,
    mountNode
  );
}

