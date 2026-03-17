import { useMemo } from "react";
import * as THREE from "three";

function makeTextTexture(lines, cw, ch) {
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, cw, ch);
  lines.forEach((l) => {
    ctx.font = l.font;
    ctx.fillStyle = l.color ?? "#c9981a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 3;
    ctx.fillText(l.text, cw / 2, l.y);
    ctx.shadowBlur = 0;
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

export default function Bottle({
  position = [0.21,-0.17, 0],
  scale = 0.8,
  rotation = [0, 0, -0.24],
}) {
  const { materials, geometry } = useMemo(() => {
    const mintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x6abf8a),
      roughness: 1,
      metalness: 0.0,
      clearcoat: 0.05,
      clearcoatRoughness: 0.9,
      reflectivity: 0.05,
    });

    const whiteMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf8f8f8),
      roughness: 0.6,
      metalness: 0.0,
      clearcoat: 0.05,
      clearcoatRoughness: 0.9,
    });

    const seamMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.5,
      metalness: 0.05,
    });

    const R = 0.38;
    const bodyH = 1.6;
    const lidH = 0.8;
    const totalH = bodyH + lidH;
    const baseY = -totalH / 2;

    const bodyGeo = new THREE.CylinderGeometry(R, R, bodyH, 64);
    const bottomGeo = new THREE.CircleGeometry(R, 64);
    const lidGeo = new THREE.CylinderGeometry(R, R, lidH, 64);
    const topGeo = new THREE.CircleGeometry(R, 64);
    const seamGeo = new THREE.TorusGeometry(R, 0.012, 16, 64);
    const ghPlaneGeo = new THREE.PlaneGeometry(0.6, 0.44);
    const lovePlaneGeo = new THREE.PlaneGeometry(0.58, 0.38);

    const ghTex = makeTextTexture(
      [{ text: "Gh", font: "bold 160px Georgia,serif", y: 130 }],
      400,
      280
    );
    const loveTex = makeTextTexture(
      [
        { text: "made with", font: "400 52px Arial,sans-serif", y: 80 },
        { text: "Love", font: "italic 88px Georgia,serif", y: 170 },
      ],
      400,
      260
    );

    const labelBase = {
      transparent: true,
      alphaTest: 0.01,
      metalness: 0.6,
      roughness: 0.3,
      depthWrite: false,
    };
    const ghMat = new THREE.MeshStandardMaterial({ ...labelBase, map: ghTex });
    const loveMat = new THREE.MeshStandardMaterial({
      ...labelBase,
      map: loveTex,
    });

    return {
      materials: { mintMat, whiteMat, seamMat, ghMat, loveMat },
      geometry: {
        bodyGeo,
        bottomGeo,
        lidGeo,
        topGeo,
        seamGeo,
        ghPlaneGeo,
        lovePlaneGeo,
      },
    };
  }, []);

  const R = 0.38;
  const bodyH = 1.6;
  const lidH = 0.8;
  const totalH = bodyH + lidH;
  const baseY = -totalH / 2;

  return (
    <group position={position} scale={scale} rotation={rotation} dispose={null}>
      <mesh
        geometry={geometry.bodyGeo}
        material={materials.mintMat}
        position={[0, baseY + bodyH / 2, 0]}
        castShadow
      />
      <mesh
        geometry={geometry.bottomGeo}
        material={materials.mintMat}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, baseY, 0]}
      />

      <mesh
        geometry={geometry.lidGeo}
        material={materials.whiteMat}
        position={[0, baseY + bodyH + lidH / 2, 0]}
        castShadow
      />
      <mesh
        geometry={geometry.topGeo}
        material={materials.whiteMat}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, baseY + totalH, 0]}
      />

      <mesh
        geometry={geometry.seamGeo}
        material={materials.seamMat}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, baseY + bodyH, 0]}
      />

      <mesh
        geometry={geometry.ghPlaneGeo}
        material={materials.ghMat}
        position={[0, baseY + bodyH * 0.72, R + 0.001]}
      />
      <mesh
        geometry={geometry.lovePlaneGeo}
        material={materials.loveMat}
        position={[0, baseY + bodyH * 0.3, R + 0.001]}
      />
    </group>
  );
}

