/**
 * Converts viewport percentages into Three.js scene units.
 */

export function getVP(camera) {
  const dist   = Math.abs(camera.position.z);          // distance to scene center
  const vFov   = (camera.fov * Math.PI) / 180;         // vertical fov in radians
  const totalH = 2 * Math.tan(vFov / 2) * dist;        // visible scene height
  const totalW = totalH * (window.innerWidth / window.innerHeight);

  return {
    w: (pct) => (pct / 100) * totalW, // scene units = percent of visible viewport width
    h: (pct) => (pct / 100) * totalH, 
    scale: getResponsiveScale(),
  };
}

function getResponsiveScale() {
  const w = window.innerWidth;
  if (w >= 1280) return 1.0;   // xl  → full size
  if (w >= 1024) return 0.85;  // lg  → slightly smaller
  if (w >= 768)  return 0.70;  // md  → noticeably smaller
  return 0.55;                 // sm  → smallest (before you hide on mobile)
}