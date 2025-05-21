import Link from "next/link";
import styles from "./style.module.scss";

export default function index() {
  return (
    <div className={styles.footer}>
      <Link
        href={"https://www.instagram.com/caglarbaranbora/"}
        className="hover:underline"
      >
        Instagram
      </Link>
      <Link href={"https://x.com/caglarbaranbora"} className="hover:underline">
        X
      </Link>
      <Link
        href={"https://github.com/caglarbaranbora"}
        className="hover:underline"
      >
        Github
      </Link>
      <Link
        href={"https://www.linkedin.com/in/caglarbaranbora/"}
        className="hover:underline"
      >
        LinkedIn
      </Link>
    </div>
  );
}
