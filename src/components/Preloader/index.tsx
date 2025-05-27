// components/PageTransition/index.tsx
"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";

interface PageTransitionProps {
  pageName: string;
  onComplete?: () => void;
}

export default function PageTransition({
  pageName,
  onComplete,
}: PageTransitionProps) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    // Sayfa geçişi animasyonu - direkt sayfa adını göster
    setTimeout(() => {
      onComplete?.();
    }, 800);
  }, [onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.p variants={opacity} initial="initial" animate="enter">
            <span></span>
            {pageName}
          </motion.p>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
