"use client";
import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "@/app/common/RoundedButton";
import { useRouter } from "next/navigation";

export default function Description() {
  const phrase = `Front-End Developer
  specializing in Web Technologies
  with 1 year of expertise ― based in Turkey, working as freelancer.`;
  const description = useRef(null);
  const isInView = useInView(description);
  const router = useRouter();
  return (
    <div ref={description} className={styles.description}>
      <div className={`cursor-hover ${styles.body}`}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p
          variants={opacity}
          animate={isInView ? "open" : "closed"}
          className="cursor-hover"
        >
          The combination of my hardwork for coding, code & building
          applications did not took me in a unique place yet!
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}>
          <Rounded
            className={styles.button}
            onClick={() => router.push("/about")}
          >
            <p>About me</p>
          </Rounded>
        </div>
      </div>
    </div>
  );
}
