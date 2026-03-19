import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function getR() {
  return Math.min(window.innerWidth / 1440, 1);
}

function getBodyMaterial(bottle) {
  let mat = null;
  bottle.traverse((child) => {
    if (!child.isMesh) return;
    const m = child.material;
    if (m.name === "BottleBodyMat" || m.color?.getHexString() === "6abf8a") mat = m;
  });
  return mat;
}

export function setupBottleAnims(bottle, camera) {
  const LABEL   = "bottle-anim";
  const bodyMat = getBodyMaterial(bottle);
  let cleanupFns = [];

  function init() {
    ScrollTrigger.getAll()
      .filter((st) => st.vars.id?.startsWith(LABEL))
      .forEach((st) => st.kill());

    const r = getR();

    // ── HERO: initial pose ───────────────────────────────────────
    bottle.position.set(0, 0, 0);
    bottle.rotation.set(0, 0, -0.2);
    bottle.scale.setScalar(1.0 * r);
    if (bodyMat) bodyMat.color.setHex(0x6abf8a);

    // ── HERO → INTRODUCE ────────────────────────────────────────
    const st1pos = gsap.to(bottle.position, {
      x: 0,
      y: 0,
      ease: "none",
      scrollTrigger: {
        id: `${LABEL}-1-pos`,
        trigger: '[data-section="introduce"]',
        start: "top bottom",
        end: "top top",
        scrub: 1.5,
      },
    });

    const st1rot = gsap.to(bottle.rotation, {
      x: 0,
      y: Math.PI * 4,
      z: 0,
      ease: "none",
      scrollTrigger: {
        id: `${LABEL}-1-rot`,
        trigger: '[data-section="introduce"]',
        start: "top bottom",
        end: "top top",
        scrub: 1.5,
      },
    });

    const st1scale = gsap.to(bottle.scale, {
      x: 1.14 * r,
      y: 1.14 * r,
      z: 1.14 * r,
      ease: "none",
      scrollTrigger: {
        id: `${LABEL}-1-scale`,
        trigger: '[data-section="introduce"]',
        start: "top bottom",
        end: "top top",
        scrub: 1.5,
      },
    });

    

    cleanupFns = [
      () => st1pos.scrollTrigger?.kill(),
      () => st1rot.scrollTrigger?.kill(),
      () => st1scale.scrollTrigger?.kill(),
    ];


    ScrollTrigger.refresh();
  }

  init();

  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => init(), 150);
  };
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    cleanupFns.forEach((fn) => fn());
    ScrollTrigger.getAll()
      .filter((st) => st.vars.id?.startsWith(LABEL))
      .forEach((st) => st.kill());
  };
}