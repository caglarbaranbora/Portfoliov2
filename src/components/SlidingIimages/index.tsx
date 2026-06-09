"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

interface Slide {
  src: string;
  color: string;
}

// Existing portfolio shots — shown alongside any new photos dropped into
// public/assets/images/gallery (see /api/gallery).
const baseImages: Slide[] = [
  { color: "#e3e5e7", src: "tamam/tamamLarge.png" },
  { color: "#d6d7dc", src: "tamam/tamamDashboard.png" },
  { color: "#21242b", src: "notluk/notlukSmall.png" },
  { color: "#e3e3e3", src: "cineQst/image.png" },
  { color: "#d4e3ec", src: "notluk/notlukTask.png" },
  { color: "#e5e0e1", src: "chat/chatSignIn.jpg" },
  { color: "#d7d4cf", src: "cineQst/cineqst.png" },
  { color: "#e1dad6", src: "chat/1.png" },
];

const palette = ["#e3e5e7", "#d6d7dc", "#e3e3e3", "#d4e3ec", "#e5e0e1", "#d7d4cf"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SlidingImages() {
  const container = useRef(null);
  const [images, setImages] = useState<Slide[]>(baseImages);

  useEffect(() => {
    let active = true;
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: { images?: string[] }) => {
        if (!active) return;
        const gallery: Slide[] = (data.images ?? []).map((src, i) => ({
          src,
          color: palette[i % palette.length],
        }));
        setImages(shuffle([...baseImages, ...gallery]));
      })
      .catch(() => {
        if (active) setImages(shuffle(baseImages));
      });
    return () => {
      active = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  const half = Math.ceil(images.length / 2);
  const row1 = images.slice(0, half);
  const row2 = images.slice(half);

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {row1.map((project, index) => (
          <div
            key={`r1-${index}`}
            className={styles.project}
            style={{ backgroundColor: project.color }}
          >
            <div className={styles.imageContainer}>
              <Image
                fill={true}
                alt={"image"}
                src={`/assets/images/${project.src}`}
              />
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {row2.map((project, index) => (
          <div
            key={`r2-${index}`}
            className={styles.project}
            style={{ backgroundColor: project.color }}
          >
            <div className={styles.imageContainer}>
              <Image
                fill={true}
                alt={"image"}
                src={`/assets/images/${project.src}`}
              />
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}
