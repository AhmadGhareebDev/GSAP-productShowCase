/**
 * sceneUtils.js
 *
 * Converts viewport percentages into Three.js scene units,
 * exactly like CSS vw / vh but for 3D space.
 *
 * How it works:
 *   At camera fov=38 and z=6, the visible scene has a real world width & height.
 *   w(10) means "10% of that visible width" → a scene-space X value.
 *   h(10) means "10% of that visible height" → a scene-space Y value.
 *
 * Usage:
 *   const vp = getVP(camera);
 *   bottle.position.x = vp.w(15);  // 15% from center
 *   bottle.scale.setScalar(vp.scale);
 */

export function getVP(camera) {
  const dist   = Math.abs(camera.position.z);          // distance to scene center
  const vFov   = (camera.fov * Math.PI) / 180;         // vertical fov in radians
  const totalH = 2 * Math.tan(vFov / 2) * dist;        // visible scene height
  const totalW = totalH * (window.innerWidth / window.innerHeight); // visible scene width

  return {
    /** scene units = percent of visible viewport width  (like vw in CSS) */
    w: (pct) => (pct / 100) * totalW,

    /** scene units = percent of visible viewport height (like vh in CSS) */
    h: (pct) => (pct / 100) * totalH,

    /** responsive bottle scale based on viewport width breakpoints */
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