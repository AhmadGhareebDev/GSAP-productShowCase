import { useEffect } from 'react';
import gsap from 'gsap';

const LoadingScreen = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.loading-text', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.loading-dots span', 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power2.out' },
      '-=0.4'
    )
    .to('.loading-dots span', 
      { opacity: 0.3, duration: 0.8, repeat: -1, yoyo: true, stagger: 0.1 },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="loading-text text-white text-2xl md:text-3xl font-light tracking-wide mb-4">
          Loading Experience
        </h2>
        <div className="loading-dots flex justify-center space-x-2">
          <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
          <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
          <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
