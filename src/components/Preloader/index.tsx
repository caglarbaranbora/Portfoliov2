// components/PageTransition/index.tsx
"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";

interface PageTransitionProps {
  pageName: string;
  isInitialLoad?: boolean;
  onComplete?: () => void;
}

const initialWords = [
  "Merhaba",
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];

export default function PageTransition({
  pageName,
  isInitialLoad = false,
  onComplete,
}: PageTransitionProps) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [showPageName, setShowPageName] = useState(false);

  const words = isInitialLoad ? initialWords : [pageName];

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      // İlk yükleme için orijinal mantık
      if (index === words.length - 1) {
        setTimeout(() => {
          setShowPageName(true);
          // İlk yükleme tamamlandığında hemen callback çağır
          setTimeout(() => {
            onComplete?.();
          }, 200);
        }, 200);
        return;
      }

      setTimeout(
        () => {
          setIndex(index + 1);
        },
        index === 0 ? 1000 : 150
      );
    } else {
      // Sayfa geçişleri için direkt sayfa adını göster
      setShowPageName(true);
      // Sayfa geçişi animasyonu daha yavaş
      setTimeout(() => {
        onComplete?.();
      }, 800);
    }
  }, [index, isInitialLoad, words.length, onComplete]);

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
      onAnimationComplete={(definition) => {
        // Exit animasyonu tamamlandığında callback çağır
        if (definition === "exit") {
          onComplete?.();
        }
      }}
    >
      {dimension.width > 0 && (
        <>
          <motion.p variants={opacity} initial="initial" animate="enter">
            {isInitialLoad && !showPageName && <span></span>}
            {!isInitialLoad && <span></span>}
            {isInitialLoad && !showPageName
              ? words[index]
              : isInitialLoad && showPageName
              ? ""
              : pageName}
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
