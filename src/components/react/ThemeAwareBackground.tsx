import { useState, useEffect } from 'react';
import OrbitShowcase from './OrbitShowcase';
import FaultyTerminal from './FaultyTerminal';

export default function ThemeAwareBackground() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Get initial theme
    const root = document.documentElement;
    const initialTheme = root.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = root.dataset.theme === 'light' ? 'light' : 'dark';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Skip rendering expensive backgrounds on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Only render FaultyTerminal in dark mode on desktop */}
      {theme === 'dark' && (
        <div className="absolute inset-0">
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={0.5}
            pause={false}
            scanlineIntensity={0.5}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.1}
            tint="#4e5b73"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={true}
            brightness={0.6}
          />
        </div>
      )}

      {/* Only render OrbitShowcase in light mode on desktop */}
      {theme === 'light' && (
        <div className="absolute inset-0">
          <OrbitShowcase minimal />
        </div>
      )}
    </div>
  );
}
