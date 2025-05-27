import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "@/app/common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Magnetic from "@/app/common/Magnetic";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Contact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const date = new Date();
  const showTime =
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    " GMT+3";
  const router = useRouter();

  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image
                fill={true}
                alt={"image"}
                src={`/assets/images/test.png`}
                className="cursor-hover"
              />
            </div>
            <h2 className="cursor-hover">We should work</h2>
          </span>
          <h2 className="cursor-hover">together!</h2>
          <motion.div
            style={{ x }}
            className={`cursor-hover ${styles.buttonContainer}`}
          >
            <Rounded
              backgroundColor={"#f45232"}
              className={styles.button}
              onClick={() => router.push("/contact")}
            >
              <p>Get in touch</p>
            </Rounded>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={`cursor-hover ${styles.nav}`}>
          <Rounded>
            <p>boracaglarbaran@gmail.com</p>
          </Rounded>
          <Rounded>
            <p>+90 552 232 1279 </p>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              <h3>Version</h3>
              <p>Caglar Bora 2025 © </p>
            </span>
            <span>
              <h3>Local Time</h3>
              <p>{showTime}</p>
            </span>
          </div>
          <div>
            <span>
              <h3 className="text-[50px] font-bold ">socials.</h3>
              <Magnetic>
                <Link href={"https://www.instagram.com/caglarbaranbora/"}>
                  Instagram
                </Link>
              </Magnetic>
            </span>

            <Magnetic>
              <Link href={"https://x.com/caglarbaranbora"}>X</Link>
            </Magnetic>
            <Magnetic>
              <Link href={"https://github.com/caglarbaranbora"}>Github</Link>
            </Magnetic>
            <Magnetic>
              <Link href={"https://www.linkedin.com/in/caglarbaranbora/"}>
                Linkedin
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
