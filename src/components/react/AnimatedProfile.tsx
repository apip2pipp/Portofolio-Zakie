import { useEffect, useRef, useState } from 'react';

export default function AnimatedProfile() {
  const profileRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const profile = profileRef.current;
    if (!profile) return;

    let rotateX = 0;
    let rotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = profile.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position relative to card center
      // Inverted for natural tilt effect
      rotateY = ((e.clientX - centerX) / rect.width) * 20; // Max 20deg rotation
      rotateX = -((e.clientY - centerY) / rect.height) * 20;

      // For spotlight effect
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      rotateX = 0;
      rotateY = 0;
    };

    const animate = () => {
      // Smooth interpolation
      currentRotateX += (rotateX - currentRotateX) * 0.1;
      currentRotateY += (rotateY - currentRotateY) * 0.1;
      
      if (profile && !isPressed) {
        profile.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      }
      
      requestAnimationFrame(animate);
    };

    profile.addEventListener('mousemove', handleMouseMove);
    profile.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      profile.removeEventListener('mousemove', handleMouseMove);
      profile.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPressed]);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
  };

  return (
    <div className="relative perspective-container">
      <div
        ref={profileRef}
        onClick={handleClick}
        className={`glass-card w-[350px] h-[450px] mx-auto rounded-[2rem] flex items-center justify-center cursor-pointer transition-all duration-300 ease-out relative overflow-hidden ${isPressed ? 'pressed' : ''}`}
        style={{
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`,
        } as React.CSSProperties}
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 glass-bg"></div>
        
        {/* Shimmer effect */}
        <div className="shimmer-overlay absolute inset-0"></div>
        
        {/* Spotlight effect on hover */}
        <div className="spotlight absolute inset-0 opacity-0 hover-spotlight"></div>

        {/* Border gradient */}
        <div className="absolute inset-0 rounded-[2rem] border-gradient"></div>

        {/* Content */}
        <div className="relative z-10 w-full h-full p-4 flex items-center justify-center">
          <div className="w-full h-full rounded-[1.5rem] overflow-hidden shadow-inner-glass">
            <img 
              src="/profileMagang/profile_magang.PNG" 
              alt="Foto Profile Afif"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-300" 
            />
          </div>
        </div>

        {/* Glowing particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      {/* Floating decorative orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      
      <style>{`
        .perspective-container {
          perspective: 1500px;
        }

        .glass-card {
          transform-style: preserve-3d;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .glass-bg {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 2rem;
        }

        :root[data-theme='dark'] .glass-bg {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .border-gradient {
          background: linear-gradient(
            135deg,
            rgba(74, 222, 128, 0.5) 0%,
            rgba(34, 197, 94, 0.3) 50%,
            rgba(74, 222, 128, 0.5) 100%
          );
          padding: 1.5px;
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Shimmer effect */
        .shimmer-overlay {
          background: linear-gradient(
            110deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 4s infinite;
          pointer-events: none;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }

        /* Spotlight effect */
        .hover-spotlight {
          background: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y),
            rgba(74, 222, 128, 0.2),
            transparent 40%
          );
          transition: opacity 0.3s ease;
        }

        .glass-card:hover .hover-spotlight {
          opacity: 1;
        }

        /* Pressed state */
        .glass-card.pressed {
          transform: perspective(1000px) scale(0.96) !important;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.5),
            inset 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .glass-card.pressed .glass-bg {
          background: rgba(255, 255, 255, 0.12);
        }

        :root[data-theme='dark'] .glass-card.pressed .glass-bg {
          background: rgba(15, 23, 42, 0.7);
        }

        /* Hover effects */
        .glass-card:hover {
          box-shadow: 
            0 25px 70px rgba(74, 222, 128, 0.25),
            0 0 0 1px rgba(74, 222, 128, 0.3),
            0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .glass-card:hover img {
          transform: scale(1.08);
        }

        /* Particles */
        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(74, 222, 128, 0.8);
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 12px rgba(74, 222, 128, 0.6);
        }

        .particle-1 {
          top: 15%;
          left: 12%;
          animation: float-particle 5s ease-in-out infinite;
        }

        .particle-2 {
          top: 25%;
          right: 18%;
          animation: float-particle 6s ease-in-out infinite 1.5s;
        }

        .particle-3 {
          bottom: 20%;
          left: 15%;
          animation: float-particle 7s ease-in-out infinite 3s;
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(12px, -20px) scale(1.8);
            opacity: 1;
          }
        }

        /* Floating orbs */
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(25px);
          opacity: 0.5;
          pointer-events: none;
          z-index: -1;
        }

        .orb-1 {
          width: 120px;
          height: 120px;
          background: rgba(74, 222, 128, 0.3);
          top: -30px;
          right: -30px;
          animation: float-orb 7s ease-in-out infinite;
        }

        .orb-2 {
          width: 90px;
          height: 90px;
          background: rgba(34, 197, 94, 0.3);
          bottom: -20px;
          left: -20px;
          animation: float-orb 8s ease-in-out infinite 2s;
        }

        .orb-3 {
          width: 70px;
          height: 70px;
          background: rgba(16, 185, 129, 0.3);
          top: 50%;
          right: -40px;
          animation: float-orb 9s ease-in-out infinite 4s;
        }

        @keyframes float-orb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -25px) scale(1.15);
          }
          66% {
            transform: translate(-20px, 25px) scale(0.85);
          }
        }

        .shadow-inner-glass {
          box-shadow: 
            inset 0 2px 12px rgba(0, 0, 0, 0.15),
            0 4px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
