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

export function setupBottleAnims(bottle) {
  const LABEL   = "bottle-anim";
  const bodyMat = getBodyMaterial(bottle);
  const localTweens = [];

  ScrollTrigger.getAll()
    .filter((st) => st.vars.id?.startsWith(LABEL))
    .forEach((st) => st.kill());

  const applyBaseState = () => {
    bottle.position.set(0, 0, 0);
    bottle.rotation.set(0, 0, -0.2);
    bottle.scale.setScalar(1.0 * getR());
    if (bodyMat) bodyMat.color.setHex(0x6abf8a);
  };

  const killTransitionTweens = () => {
    gsap.killTweensOf(bottle.position);
  };

  const transitionDrop = () => {
    killTransitionTweens();
    gsap.to(bottle.position, {
      keyframes: [
        { y: -2.1, duration: 0.42, ease: "power1.in" },
        { y: -5, duration: 0.62, ease: "power3.in" },
      ],
      overwrite: "auto",
    });
  };

  const transitionRise = () => {
    killTransitionTweens();
    gsap.to(bottle.position, {
      keyframes: [
        { y: 0.22, duration: 0.62, ease: "power3.out" },
        { y: 0, duration: 0.32, ease: "sine.out" },
      ],
      overwrite: "auto",
    });
  };

  applyBaseState();

  const onRefreshInit = () => {
    bottle.scale.setScalar(1.0 * getR());
  };
  ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

  gsap.to(bottle.rotation, {
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
    },
  });

  gsap.to(bottle.rotation, {
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
    },
  });

  if (bodyMat) {
    gsap.to(bodyMat.color, {
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
        },
      });
  }

  gsap.to(bottle.rotation, {
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
      },
    });

  if (bodyMat) {
    gsap.to(bodyMat.color, {
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
        },
      });
  }

  gsap.to(bottle.rotation, {
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
      },
    });

  if (bodyMat) {
    gsap.to(bodyMat.color, {
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
        },
      });
  }

  gsap.to(bottle.rotation, {
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
      },
    });

  if (bodyMat) {
    gsap.to(bodyMat.color, {
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
        },
      });
  }

    // Drop bottle when leaving scent-4
  const stHide = ScrollTrigger.create({
      id: `${LABEL}-hide`,
      trigger: '[data-section="scent-4"]',
      start: "bottom bottom",
      onLeave: transitionDrop,
      onEnterBack: transitionRise,
    });

    // Bottle Details — bring back, drop on leave
  const stBottleDetails = ScrollTrigger.create({
      id: `${LABEL}-bottle-details`,
      trigger: '[data-section="bottle-details"]',
      start: "top center",
      end: "bottom center",
      onEnter: transitionRise,
      onLeave: transitionDrop,
      onEnterBack: transitionRise,
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
    transitionDrop();
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
      onLeaveBack: transitionDrop,
    });
  localTweens.push(stHide, stBottleDetails, stFooter, stGallery);

  ScrollTrigger.refresh();

  return () => {
    ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
    localTweens.forEach((item) => item?.kill?.());
    footerRotation?.kill();
    footerColors?.kill();
    ScrollTrigger.getAll()
      .filter((st) => st.vars.id?.startsWith(LABEL))
      .forEach((st) => st.kill());
  };
}