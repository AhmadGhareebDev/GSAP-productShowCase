import { useEffect, useRef, lazy } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupBottleAnims } from "../animations/bottleAnims";
import { useLoading } from "../contexts/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

export default function BottleScene() {
  const canvasRef = useRef(null);
  const bottleRef = useRef(null);
  const { setModelLoaded } = useLoading();

  useEffect(() => {
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
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

    scene.add(new THREE.AmbientLight(0xffffff, 0.4)); 

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd0f0e0, 0.8); 
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(0, 8, 2);
    scene.add(topLight);

    const rightLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rightLight.position.set(6, 2, 2);
    scene.add(rightLight);

    let animCleanup = null;
    const loader = new GLTFLoader();

    loader.load(
      "/models/bottle.glb",
      (gltf) => {
        const bottle = gltf.scene;
        bottleRef.current = bottle;
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

        animCleanup = setupBottleAnims(bottle, camera);
        ScrollTrigger.refresh();
        setModelLoaded();
      },
      undefined,
      (err) => console.error("GLB failed to load:", err)
    );

 

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      animCleanup?.();
      renderer.dispose();
    };
  }, []);

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