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

    bottle.position.set(0, 0, 0);
    bottle.rotation.set(0, 0, -0.2);
    bottle.scale.setScalar(1.0 * r);
    if (bodyMat) bodyMat.color.setHex(0x6abf8a);

    const st1rot = gsap.to(bottle.rotation, {
      x: 0,
      y: Math.PI * 4,
      z: 0,
      ease: "none",
      overwrite: "auto",
      scrollTrigger: {
        id: `${LABEL}-1-rot`,
        trigger: '[data-section="introduce"]',
        start: "top bottom",
        end: "top top",
        scrub: 0.8,
        onLeave:     () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 4, z: 0 }),
        onEnterBack: () => gsap.set(bottle.rotation, { x: 0, y: 0, z: -0.2 }),
      },
    });

    const st2rot = gsap.to(bottle.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 8,
      z: 0,
      ease: "none",
      overwrite: "auto",
      immediateRender: false,
      scrollTrigger: {
        id: `${LABEL}-2-rot`,
        trigger: '[data-section="scent-1"]',
        start: "top bottom",
        end: "top top",
        scrub: 0.8,
        onLeave:     () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 8, z: 0 }),
        onEnterBack: () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 4, z: 0 }),
      },
    });

    let st2color = null;
    if (bodyMat) {
      st2color = gsap.to(bodyMat.color, {
        r: 232 / 255,
        g: 196 / 255,
        b: 162 / 255,
        ease: "none",
        overwrite: "auto",
        immediateRender: false,
        scrollTrigger: {
          id: `${LABEL}-2-color`,
          trigger: '[data-section="scent-1"]',
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
          onLeave:     () => bodyMat.color.setHex(0xe8c4a2),
          onEnterBack: () => bodyMat.color.setHex(0x6abf8a),
        },
      });
    }

    const st3rot = gsap.to(bottle.rotation, {
      keyframes: [
        { x: 0, z: 0, y: Math.PI * 12, ease: "power1.inOut" }
      ],
      ease: "none",
      overwrite: "auto",
      immediateRender: false,
      scrollTrigger: {
        id: `${LABEL}-3-rot`,
        trigger: '[data-section="scent-2"]',
        start: "top bottom",
        end: "top top",
        scrub: 0.8,
        onLeave:     () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 12, z: 0 }),
        onEnterBack: () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 8,  z: 0 }),
      },
    });

    let st3color = null;
    if (bodyMat) {
      st3color = gsap.to(bodyMat.color, {
        r: 224 / 255,
        g: 99  / 255,
        b: 95  / 255,
        ease: "none",
        overwrite: "auto",
        immediateRender: false,
        scrollTrigger: {
          id: `${LABEL}-3-color`,
          trigger: '[data-section="scent-2"]',
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
          onLeave:     () => bodyMat.color.setHex(0xe0635f),
          onEnterBack: () => bodyMat.color.setHex(0xe8c4a2),
        },
      });
    }

    const st4rot = gsap.to(bottle.rotation, {
      keyframes: [
        { x: -0.4, z: 0.15, y: Math.PI * 14, ease: "power1.inOut" },
        { x: 0,    z: 0,    y: Math.PI * 16, ease: "power1.inOut" }
      ],
      ease: "none",
      overwrite: "auto",
      immediateRender: false,
      scrollTrigger: {
        id: `${LABEL}-4-rot`,
        trigger: '[data-section="scent-3"]',
        start: "top bottom",
        end: "top top",
        scrub: 0.8,
        onLeave:     () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 16, z: 0 }),
        onEnterBack: () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 12, z: 0 }),
      },
    });

    let st4color = null;
    if (bodyMat) {
      st4color = gsap.to(bodyMat.color, {
        r: 153 / 255,
        g: 140 / 255,
        b: 170 / 255,
        ease: "none",
        overwrite: "auto",
        immediateRender: false,
        scrollTrigger: {
          id: `${LABEL}-4-color`,
          trigger: '[data-section="scent-3"]',
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
          onLeave:     () => bodyMat.color.setHex(0x998caa),
          onEnterBack: () => bodyMat.color.setHex(0xe0635f),
        },
      });
    }

    const st5rot = gsap.to(bottle.rotation, {
      keyframes: [
        { x: 0.3, z: 0.3, y: Math.PI * 18, ease: "power1.inOut" },
        { x: 0,   z: 0,   y: Math.PI * 20, ease: "power1.inOut" }
      ],
      ease: "none",
      overwrite: "auto",
      immediateRender: false,
      scrollTrigger: {
        id: `${LABEL}-5-rot`,
        trigger: '[data-section="scent-4"]',
        start: "top bottom",
        end: "top top",
        scrub: 0.8,
        onLeave:     () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 20, z: 0 }),
        onEnterBack: () => gsap.set(bottle.rotation, { x: 0, y: Math.PI * 16, z: 0 }),
      },
    });

    let st5color = null;
    if (bodyMat) {
      st5color = gsap.to(bodyMat.color, {
        r: 106 / 255,
        g: 191 / 255,
        b: 138 / 255,
        ease: "none",
        overwrite: "auto",
        immediateRender: false,
        scrollTrigger: {
          id: `${LABEL}-5-color`,
          trigger: '[data-section="scent-4"]',
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
          onLeave:     () => bodyMat.color.setHex(0x6abf8a),
          onEnterBack: () => bodyMat.color.setHex(0x998caa),
        },
      });
    }

    // Drop bottle when leaving scent-4
    const stHide = ScrollTrigger.create({
      id: `${LABEL}-hide`,
      trigger: '[data-section="scent-4"]',
      start: "bottom bottom",
      onLeave:     () => gsap.to(bottle.position, { y: -5, duration: 0.8, ease: "power2.in"  }),
      onEnterBack: () => gsap.to(bottle.position, { y: 0,  duration: 0.8, ease: "power2.out" }),
    });

    // Bottle Details — bring back, drop on leave
    const stBottleDetails = ScrollTrigger.create({
      id: `${LABEL}-bottle-details`,
      trigger: '[data-section="bottle-details"]',
      start: "top center",
      end: "bottom center",
      onEnter:     () => gsap.to(bottle.position, { y: 0,  duration: 1,   ease: "power3.out" }),
      onLeave:     () => gsap.to(bottle.position, { y: -5, duration: 0.8, ease: "power2.in"  }),
      onEnterBack: () => gsap.to(bottle.position, { y: 0,  duration: 1,   ease: "power3.out" }),
    });

    // Footer — tilt, spin, color cycle
    let footerRotation = null;
    let footerColors   = null;

    const FOOTER_COLORS = [
      { r: 106/255, g: 191/255, b: 138/255 }, // green  (summer)
      { r: 232/255, g: 196/255, b: 162/255 }, // beige  (autumn)
      { r: 224/255, g:  99/255, b:  95/255 }, // red    (spring)
      { r: 153/255, g: 140/255, b: 170/255 }, // purple (winter)
    ];

    function startFooterAnim() {
      gsap.to(bottle.position, { y: 0,     duration: 1, ease: "power3.out" });
      gsap.to(bottle.rotation, { z: -0.18, duration: 1, ease: "power3.out" });

      footerRotation = gsap.to(bottle.rotation, {
        y: `+=${Math.PI * 2}`,
        duration: 6,
        ease: "none",
        repeat: -1,
      });

      if (bodyMat) {
        let colorIndex = 0;
        function cycleColor() {
          colorIndex = (colorIndex + 1) % FOOTER_COLORS.length;
          footerColors = gsap.to(bodyMat.color, {
            ...FOOTER_COLORS[colorIndex],
            duration: 1.5,
            ease: "power1.inOut",
            onComplete: cycleColor,
          });
        }
        cycleColor();
      }
    }

    function stopFooterAnim() {
      footerRotation?.kill();
      footerColors?.kill();
      footerRotation = null;
      footerColors   = null;
      gsap.to(bottle.position, { y: -5, duration: 0.8, ease: "power2.in"  });
      gsap.to(bottle.rotation, { z: 0,  duration: 0.5, ease: "power2.out" });
      if (bodyMat) bodyMat.color.setHex(0x6abf8a);
    }

    const stFooter = ScrollTrigger.create({
      id: `${LABEL}-footer`,
      trigger: '[data-section="footer"]',
      start: "top center",
      onEnter:     () => startFooterAnim(),
      onEnterBack: () => startFooterAnim(),
      onLeaveBack: () => stopFooterAnim(),
    });

    const stGallery = ScrollTrigger.create({
      id: `${LABEL}-gallery`,
      trigger: '[data-section="gallery"]', // make sure your GallerySection has data-section="gallery"
      start: "bottom center",
      onLeaveBack: () => gsap.to(bottle.position, { y: -5, duration: 0.8, ease: "power2.in" }),
    });

    cleanupFns = [
      () => st1rot.scrollTrigger?.kill(),
      () => st2rot.scrollTrigger?.kill(),
      () => st2color?.scrollTrigger?.kill(),
      () => st3rot.scrollTrigger?.kill(),
      () => st3color?.scrollTrigger?.kill(),
      () => st4rot.scrollTrigger?.kill(),
      () => st4color?.scrollTrigger?.kill(),
      () => st5rot.scrollTrigger?.kill(),
      () => st5color?.scrollTrigger?.kill(),
      () => stHide.kill(),
      () => stBottleDetails.kill(),
      () => stFooter.kill(),
      () => footerRotation?.kill(),
      () => footerColors?.kill(),
      () => stGallery.kill(),
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