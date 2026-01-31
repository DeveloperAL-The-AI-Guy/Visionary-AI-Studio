import React, { useEffect, useRef } from 'react';

const SpotlightOverlay: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSpotlight = (e: MouseEvent) => {
      if (overlayRef.current) {
        // We use CSS variables for performance to avoid React re-renders on every mouse move
        overlayRef.current.style.setProperty('--x', `${e.clientX}px`);
        overlayRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', updateSpotlight);

    return () => {
      window.removeEventListener('mousemove', updateSpotlight);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-500"
      style={
        {
          '--x': '50%',
          '--y': '50%',
          // Replaced the dark mask with a light glow to "enhance" the picture.
          // A soft white gradient creates a flashlight effect.
          background: `radial-gradient(
            circle 500px at var(--x) var(--y), 
            rgba(255, 255, 255, 0.15),
            transparent 60%
          )`,
          // Removed backdropFilter: 'blur(2px)' to address the blurriness complaint.
          // Using screen blend mode to add brightness to the underlying content.
          mixBlendMode: 'screen',
        } as React.CSSProperties
      }
    />
  );
};

export default SpotlightOverlay;