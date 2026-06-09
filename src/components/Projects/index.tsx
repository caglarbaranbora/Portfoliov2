"use client";
import styles from "./style.module.scss";
import Project from "./components/project";
import Magnetic from "@/app/common/Magnetic";
import Link from "next/link";

// Newest project last. Home shows the 3 most recently added (newest first).
const projects: {
  title: string;
  color: string;
  status: string;
  href?: string;
}[] = [
  {
    title: "CineQST",
    color: "#8C8C8C",
    status: "Design & Development",
    href: "/work/cineqst",
  },
  {
    title: "Tamam App",
    color: "#EFE8D3",
    status: "Development",
    href: "/work/tamam",
  },
  {
    title: "@Chat",
    color: "#706D63",
    status: "Design & Development",
    href: "/work/chat",
  },
  {
    title: "Notluk",
    color: "#000000",
    status: "Design & Development",
    href: "/work/notluk",
  },
  {
    title: "Feeleze",
    color: "#1C1D20",
    status: "Habit Tracker · In Development",
  },
  {
    title: "Diarya",
    color: "#1C1D20",
    status: "AI Voice Journal · Coming Soon",
  },
];

const visibleProjects = [...projects].reverse().slice(0, 3);

export default function Home() {
  return (
    <main className={styles.projects}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 gap-4 sm:gap-0">
        <h1 className="font-medium text-[24px] sm:text-[30px]">projects.</h1>
        <Magnetic>
          <Link
            href={"/work"}
            className="px-4 sm:px-6 py-2 sm:py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-xs sm:text-sm uppercase tracking-wider"
          >
            All Projects
          </Link>
        </Magnetic>
      </div>
      <div className={styles.body}>
        {visibleProjects.map((project, index) => {
          return (
            <Project
              status={project.status}
              title={project.title}
              href={project.href}
              key={index}
            />
          );
        })}
      </div>
    </main>
  );
}
