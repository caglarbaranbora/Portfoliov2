"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationControls,
} from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  // Daha akıcı hareket için yumuşatılmış yay ayarları
  const springConfig = { damping: 20, stiffness: 250 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const addHover = () => {
      setIsHovered(true);
      controls.start({ scale: 2.5, transition: { duration: 0.25 } });
    };

    const removeHover = () => {
      setIsHovered(false);
      controls.start({ scale: 1, transition: { duration: 0.25 } });
    };

    const clickEffect = () => {
      controls.start({ scale: 0.7, transition: { duration: 0.1 } }).then(() => {
        controls.start({
          scale: isHovered ? 2.5 : 1,
          transition: { duration: 0.2 },
        });
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", clickEffect);

    const hoverTargets = document.querySelectorAll("button, a, .cursor-hover");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", clickEffect);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [cursorX, cursorY, controls, isHovered]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        translateX: x,
        translateY: y,
      }}
      animate={controls}
    />
  );
};

export default CustomCursor;
