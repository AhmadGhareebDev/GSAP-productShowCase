import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LoadingScreen = () => {
  const loaderRef = useRef(null);

  useGSAP(
    () => {
      const intro = gsap.timeline();

      intro
        .fromTo(
          '.loader-frame',
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' }
        )
        .fromTo(
          '.loader-title-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.2'
        );

      gsap.fromTo(
        '.loader-progress-fill',
        { xPercent: -100 },
        {
          xPercent: 120,
          duration: 1.45,
          ease: 'none',
          repeat: -1,
        }
      );

      gsap.to('.loader-glow', {
        opacity: 0.4,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: loaderRef }
  );

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      role="status"
      aria-live="polite"
      aria-label="Loading experience"
    >
      <div className="loader-glow pointer-events-none absolute h-[34vh] w-[34vh] rounded-full bg-lime-400/10 blur-3xl" />

      <div className="loader-frame w-[min(88vw,420px)] rounded-2xl border border-white/10 bg-black/70 px-6 py-7 backdrop-blur-md md:px-8 md:py-8">
        <p className="text-[0.62rem] uppercase tracking-[0.38em] text-zinc-500">The Seasons</p>
        <h2 className="mt-3 text-2xl font-light tracking-[0.08em] text-zinc-100 md:text-3xl">
          Loading the scent
        </h2>
        <div className="loader-title-line mt-4 h-px w-full bg-linear-to-r from-lime-400/90 via-lime-200/40 to-transparent" />

        <div className="mt-6 overflow-hidden rounded-full border border-white/10 bg-white/4">
          <div className="loader-progress-fill h-1 w-[45%] bg-linear-to-r from-transparent via-lime-300 to-transparent" />
        </div>

        <p className="mt-4 text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
          Preparing your experience
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
