import { useEffect, useRef } from 'react';

export default function AnimatedProfile() {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profile = profileRef.current;
    if (!profile) return;

    let mouseX = 0;
    let mouseY = 0;
    let profileX = 0;
    let profileY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = profile.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX = (e.clientX - centerX) / 30;
      mouseY = (e.clientY - centerY) / 30;
    };

    const animate = () => {
      profileX += (mouseX - profileX) * 0.1;
      profileY += (mouseY - profileY) * 0.1;
      
      if (profile) {
        profile.style.transform = `translate(${profileX}px, ${profileY}px)`;
      }
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={profileRef}
        className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-200 to-secondary-200 dark:from-primary-500/80 dark:to-secondary-800 rounded-full flex items-center justify-center shadow-2xl shadow-primary-200/40 dark:shadow-primary-900/40 transition-transform duration-200 ease-out animate-float"
      >
        <div className="w-72 h-72 bg-white dark:bg-secondary-950 rounded-full flex items-center justify-center border border-secondary-100 dark:border-secondary-800">
          <div className="w-64 h-64 rounded-full overflow-hidden">
            <img 
              src="/src/assets/profile_magang.PNG" 
              alt="Foto Profile Afif" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-300 dark:bg-primary-400 rounded-full opacity-70 blur-sm animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-400 dark:bg-secondary-500 rounded-full opacity-70 blur-sm animate-pulse delay-500"></div>
      
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
