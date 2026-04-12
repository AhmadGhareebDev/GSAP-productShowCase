import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupBottleAnims } from "../animations/bottleAnims";
import { useLoading } from "../contexts/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

export default function BottleScene() {
  const canvasRef = useRef(null);
  const animControlsRef = useRef(null);
  const hasTriggeredIntroRef = useRef(false);
  const { isLoading, setModelLoaded } = useLoading();

  useEffect(() => {
    if (isLoading) return;
    if (hasTriggeredIntroRef.current) return;

    animControlsRef.current?.playIntroPop?.();
    hasTriggeredIntroRef.current = true;
  }, [isLoading]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const getPixelRatio = () => {
      const dpr = window.devicePixelRatio || 1;
      if (window.innerWidth < 768) return Math.min(dpr, 1);
      if (window.innerWidth < 1280) return Math.min(dpr, 1.15);
      return Math.min(dpr, 1.2);
    };

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, 
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(getPixelRatio());
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2; 

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 6);

    scene.add(new THREE.AmbientLight(0xffffff, 0.32)); 

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.15);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    const loader = new GLTFLoader();

    loader.load(
      "/models/bottle.glb",
      (gltf) => {
        const bottle = gltf.scene;
        scene.add(bottle);

     
        bottle.traverse((child) => {
          if (!child.isMesh) return;

          const mat = child.material;

          if (mat.color?.getHexString() === "6abf8a" || mat.name === "BottleBodyMat") {
            mat.roughness    = 0.35;  
            mat.metalness    = 0.3;
            mat.clearcoat    = 0.6;  
            mat.clearcoatRoughness = 0.2;
          }

          if (mat.color?.getHexString() === "f8f8f8" || mat.name === "BottleLidMat") {
            mat.roughness    = 0.2;
            mat.metalness    = 0.0;
            mat.clearcoat    = 0.8;
            mat.clearcoatRoughness = 0.15;
          }

          mat.needsUpdate = true;
        });

        animControlsRef.current = setupBottleAnims(bottle, { deferIntro: true });
        ScrollTrigger.refresh();
        setModelLoaded();
      },
      undefined,
      (err) => console.error("GLB failed to load:", err)
    );

 

    let isVisible = !document.hidden;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    let frameBudget = 0;

    const tick = (_time, deltaTime) => {
      if (!isVisible) return;
      frameBudget += deltaTime;
      if (frameBudget < frameInterval) return;
      frameBudget = 0;
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        renderer.render(scene, camera);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onResize = () => {
      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      animControlsRef.current?.cleanup?.();
      animControlsRef.current = null;
      renderer.dispose();
    };
  }, [setModelLoaded]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </>
  );
}