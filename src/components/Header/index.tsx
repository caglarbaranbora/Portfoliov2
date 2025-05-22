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
import Image from "next/image";

export default function index() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const header = useRef(null);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(
            button.current,
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false)
          );
        },
      },
    });
  }, []);

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={`cursor-hover ${styles.logo}`}>
          <p className={styles.copyright}>©</p>
          <p>Caglar Bora</p>
        </div>
        <div className={`cursor-hover ${styles.nav}`}>
          {isOpen ? (
            <>
              <div className="flex">
                <Magnetic>
                  <div className={styles.el}>
                    <Link href={"/work"} className="font-medium">
                      Work
                    </Link>
                    <div className={styles.indicator}></div>
                  </div>
                </Magnetic>
                <Magnetic>
                  <div className={styles.el}>
                    <Link href={"/about"} className="font-medium">
                      About
                    </Link>
                    <div className={styles.indicator}></div>
                  </div>
                </Magnetic>
                <Magnetic>
                  <div className={styles.el}>
                    <Link href={"/contact"} className="font-medium">
                      Contact
                    </Link>
                    <div className={styles.indicator}></div>
                  </div>
                </Magnetic>
              </div>
              <Image
                src={"/assets/menu-icon-x.svg"}
                width={75}
                height={75}
                alt="menu-close-icon"
                onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
                className={`${styles.menuIcon} ${styles.close} cursor-hover`}
              />
            </>
          ) : (
            <Image
              src={"/assets/menu-icon.svg"}
              width={75}
              height={75}
              alt="menu-icon"
              onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
              className={`${styles.menuIcon} ${styles.open}`}
            />
          )}
        </div>
      </div>
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
