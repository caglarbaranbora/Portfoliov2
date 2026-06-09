"use client";
import {
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import styles from "./style.module.scss";
import { text, translate } from "./anim";

// useLayoutEffect on the client (runs before paint → no flash on navigation),
// useEffect on the server (avoids the SSR warning).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// false during the first client render (hydration) so the markup matches the
// server (no SVG); true afterwards so every later mount (i.e. a navigation)
// can size and cover the screen on its very first render — no flash of the
// incoming page before the curve.
let appHydrated = false;

type Dimensions = { width: number; height: number };

const routes: { [key: string]: string } = {
  "/": "Home",
  "/work": "Projects",
  "/about": "About",
  "/contact": "Contact",
};

function routeName(path: string): string {
  if (routes[path]) return routes[path];
  if (path.startsWith("/work/")) {
    const seg = path.split("/").pop() || "";
    return seg.charAt(0).toUpperCase() + seg.slice(1);
  }
  return "";
}

const anim = (variants: Variants) => ({
  variants,
  initial: "initial",
  animate: "enter",
  exit: "exit",
});

interface CurveProps {
  children: ReactNode;
}

export default function Curve({ children }: CurveProps) {
  const pathname = usePathname();
  // null on the server + first hydration render (markup match); real size on any
  // later mount (navigation) so the curve covers from frame 0 — no flash.
  const [dimensions, setDimensions] = useState<Dimensions | null>(() => {
    if (typeof window === "undefined" || !appHydrated) return null;
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    appHydrated = true;
  }, []);

  useIsomorphicLayoutEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const resize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className={styles.page}>
      <motion.p className={styles.route} {...anim(text)}>
        <span className={styles.dot} />
        {routeName(pathname)}
      </motion.p>
      {dimensions && (
        <SVG width={dimensions.width} height={dimensions.height} />
      )}
      {children}
    </div>
  );
}

function SVG({ width, height }: { width: number; height: number }) {
  const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  const curve: Variants = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.svg className={styles.svg} {...anim(translate)}>
      <motion.path {...anim(curve)} />
    </motion.svg>
  );
}
