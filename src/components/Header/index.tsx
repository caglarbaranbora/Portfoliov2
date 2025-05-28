"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "@/app/common/RoundedButton";
import Magnetic from "@/app/common/Magnetic";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  textColor?: string;
  isDark?: boolean;
}

export default function Header({ textColor = "#fff" }: HeaderProps) {
  const [isActive, setIsActive] = useState(false);
  const header = useRef(null);
  const pathname = usePathname();
  const button = useRef(null);
  const isActiveRef = useRef(isActive);
  const router = useRouter();

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    if (isActiveRef.current) {
      setIsActive(false);
    }
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: 250,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          });
          setIsActive(false);
        },
      },
    });
  }, []);

  return (
    <>
      <div ref={header} className={styles.header}>
        <div
          className={`cursor-hover ${styles.logo}`}
          style={{ color: textColor }}
        >
          <p className={styles.copyright}>©</p>
          <div className={styles.name} onClick={() => router.push("/")}>
            <p className={styles.caglar}>Hello</p>
            <p className={styles.baran}>I&apos;m Caglar</p>
            <p className={styles.bora}>Bora</p>
          </div>
        </div>
        <div className={`cursor-hover ${styles.nav}`}>
          <div className="flex" style={{ color: textColor }}>
            <Magnetic>
              <div className={styles.el}>
                <Link href={"/work"} className="font-medium">
                  Work
                </Link>
                <div
                  className={styles.indicator}
                  style={{ backgroundColor: textColor }}
                ></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <Link href={"/about"} className="font-medium">
                  About
                </Link>
                <div
                  className={styles.indicator}
                  style={{ backgroundColor: textColor }}
                ></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <Link href={"/contact"} className="font-medium">
                  Contact
                </Link>
                <div
                  className={styles.indicator}
                  style={{ backgroundColor: textColor }}
                ></div>
              </div>
            </Magnetic>
          </div>
        </div>
      </div>
      {/* hamburger menu */}
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
