import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const text = "EXPLORE • DISCOVER • CREATE • ";
  const characters = text.split("");

  return (
    <>
      {/* Center Dot / Hover Glass Bubble */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full bg-white mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 10,
          height: isHovering ? 60 : 10,
          backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,1)",
          border: isHovering ? "1px solid rgba(255,255,255,0.5)" : "0px solid rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Rotating Text Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:flex items-center justify-center mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: 100,
          height: 100,
        }}
        animate={{
          rotate: 360,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 8, ease: "linear" },
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
      >
        {characters.map((char, i) => (
          <span
            key={i}
            className="absolute text-[8px] font-bold tracking-[0.2em] text-white uppercase"
            style={{
              transform: `rotate(${i * (360 / characters.length)}deg) translateY(-42px)`,
            }}
          >
            {char}
          </span>
        ))}
      </motion.div>
    </>
  );
};

export default CustomCursor;
