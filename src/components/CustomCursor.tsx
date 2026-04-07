import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // useSpring configuration for buttery smooth cursor movement
  const springConfig = { damping: 25, stiffness: 450, mass: 0.2 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only run on desktop devices not using touch
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    setIsDesktop(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look up the DOM tree to see if we're hovering a clickable element
      const isClickable = !!target.closest('a, button, input, textarea, select, [role="button"]');
      setHovered(isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: '-50%',
        y: '-50%',
        backgroundColor: hovered ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 255, 255, 1)',
        border: hovered ? '1px solid #00E5FF' : 'none',
        mixBlendMode: 'difference'
      }}
      animate={{
        scale: hovered ? 3 : 1,
      }}
      transition={{ type: 'spring', ...springConfig }}
    />
  );
};

export default CustomCursor;
