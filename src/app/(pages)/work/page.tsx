"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { motion, useScroll, useTransform } from "framer-motion";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import { useLoader } from "@/contexts/LoaderContext";
import { useRouter } from "next/navigation";
import type { AppStoreApp } from "@/lib/appStore";
import { experience, workExperienceIds } from "@/lib/experience";

const workProjects = experience.filter((e) =>
  workExperienceIds.includes(e.id)
);

// Ongoing apps not yet on the App Store. Once published, move them to an App
// Store id in src/lib/appStore.ts and they become live API-driven rows.
const ongoingProjects = [
  {
    title: "Diarya",
    services: "AI Voice Journal · iOS",
    year: "2026",
    badge: "Coming Soon",
  },
  {
    title: "Feeleze",
    services: "Habit Tracker · iOS & iPadOS",
    year: "Ongoing",
    badge: "In Development",
  },
];

const personalProjects = [
  {
    title: "Notluk",
    services: "Design & Development",
    year: "Ongoing",
    href: "/work/notluk",
  },
  {
    title: "CineQST",
    services: "Design & Development",
    year: "2023",
    href: "/work/cineqst",
  },
  {
    title: "Tamam App",
    services: "Development",
    year: "2024",
    href: "/work/tamam",
  },
  {
    title: "@Chat",
    services: "Design & Development",
    year: "2024",
    href: "/work/chat",
  },
];

type Row =
  | { kind: "app"; title: string; services: string; year: string; url: string }
  | { kind: "project"; title: string; services: string; year: string; href: string }
  | { kind: "ongoing"; title: string; services: string; year: string; badge: string }
  | { kind: "job"; title: string; services: string; year: string };

export default function Page() {
  const container = useRef(null);
  const router = useRouter();
  const [apps, setApps] = useState<AppStoreApp[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/apps")
      .then((res) => res.json())
      .then((data) => {
        if (active) setApps(data.apps ?? []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const { showPageLoader, currentPageName, completePageLoader } = useLoader();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  // Published apps first, then personal projects — single table.
  const appRows: Row[] = apps.map((app) => ({
    kind: "app",
    title: app.name.split(":")[0].trim(),
    services: app.genre,
    year: app.releaseDate
      ? new Date(app.releaseDate).getFullYear().toString()
      : "",
    url: app.url,
  }));
  const ongoingRows: Row[] = ongoingProjects.map((p) => ({
    kind: "ongoing",
    title: p.title,
    services: p.services,
    year: p.year,
    badge: p.badge,
  }));
  const projectRows: Row[] = personalProjects.map((p) => ({
    kind: "project",
    title: p.title,
    services: p.services,
    year: p.year,
    href: p.href,
  }));
  const jobRows: Row[] = workProjects.map((job) => ({
    kind: "job",
    title: job.company,
    services: job.role,
    year: job.period,
  }));
  const rows: Row[] = [...appRows, ...ongoingRows, ...projectRows, ...jobRows];

  const openRow = (row: Row) => {
    if (row.kind === "app") {
      window.open(row.url, "_blank", "noopener,noreferrer");
    } else if (row.kind === "project") {
      router.push(row.href);
    }
  };

  useEffect(() => {
    if (!showPageLoader) {
      (async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        new LocomotiveScroll();

        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 1000);
      })();
    }
  }, [showPageLoader]);

  return (
    <>
      {/* Sayfa geçişleri için Preloader */}
      <AnimatePresence mode="wait">
        {showPageLoader && (
          <Preloader
            key={`preloader-${currentPageName}`}
            pageName={currentPageName}
            onComplete={completePageLoader}
          />
        )}
      </AnimatePresence>

      {/* Ana içerik - loader yokken göster */}
      {!showPageLoader && (
        <div className="flex flex-col min-h-screen bg-white">
          <Header textColor="#000" isDark={true} />

          {/* Hero Section */}
          <div className="px-8 md:px-16 lg:px-24 pt-32">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              <h1 className="text-[80px] sm:text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black">
                PROJECTS
              </h1>
            </motion.div>
          </div>

          {/* Projects Section */}
          <div
            ref={container}
            className="relative flex flex-col gap-12 mt-[100px] md:mt-[200px] bg-white z-10"
          >
            <div className="px-8 md:px-16 lg:px-24 pb-32">
              <div className="max-w-7xl mx-auto">
                {/* Projects List */}
                <div className="w-full">
                  {/* Table Headers - Sadece desktop'ta göster */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="hidden lg:grid grid-cols-12 gap-4 px-8 md:px-12 py-6 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="col-span-6 md:col-span-5">Project</div>
                    <div className="col-span-3 md:col-span-4">Service</div>
                    <div className="col-span-2 md:col-span-2">Year</div>
                    <div className="col-span-1 md:col-span-1"></div>
                  </motion.div>

                  {/* Project Rows */}
                  <div className="divide-y divide-gray-100">
                    {rows.map((row, index) => (
                      <motion.div
                        key={`${row.kind}-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index + 0.5 }}
                        className={`group transition-all duration-300 ${
                          row.kind === "app" || row.kind === "project"
                            ? "cursor-pointer hover:bg-gray-50"
                            : "cursor-default"
                        }`}
                        onClick={
                          row.kind === "app" || row.kind === "project"
                            ? () => openRow(row)
                            : undefined
                        }
                      >
                        {/* Desktop Layout */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-8 md:px-12 py-8 md:py-12 items-center">
                          {/* Project Name */}
                          <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                            <h3 className="text-2xl md:text-4xl font-medium text-black group-hover:text-gray-600 transition-colors duration-300">
                              {row.title}
                            </h3>
                            {row.kind !== "project" && (
                              <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider border border-black rounded-full text-black whitespace-nowrap">
                                {row.kind === "app"
                                  ? "App Store"
                                  : row.kind === "ongoing"
                                  ? row.badge
                                  : "Experience"}
                              </span>
                            )}
                          </div>

                          {/* Service */}
                          <div className="col-span-3 md:col-span-4">
                            <p className="text-lg md:text-xl text-gray-600 font-light">
                              {row.services}
                            </p>
                          </div>

                          {/* Year */}
                          <div className="col-span-2 md:col-span-2">
                            <p className="text-lg md:text-xl text-gray-500 font-light">
                              {row.year}
                            </p>
                          </div>

                          {/* Arrow */}
                          <div className="col-span-1 md:col-span-1 flex justify-end">
                            {(row.kind === "app" || row.kind === "project") && (
                              <svg
                                className="w-6 h-6 text-gray-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 17L17 7M17 7H7M17 7V17"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Mobile & Tablet Layout */}
                        <div className="lg:hidden px-6 py-8 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-black group-hover:text-gray-600 transition-colors duration-300">
                                  {row.title}
                                </h3>
                                {row.kind !== "project" && (
                                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider border border-black rounded-full text-black whitespace-nowrap">
                                    {row.kind === "app"
                                      ? "App Store"
                                      : row.kind === "ongoing"
                                      ? row.badge
                                      : "Experience"}
                                  </span>
                                )}
                              </div>
                              <p className="text-base sm:text-lg text-gray-600 font-light mb-1">
                                {row.services}
                              </p>
                              <p className="text-sm sm:text-base text-gray-500 font-light">
                                {row.year}
                              </p>
                            </div>
                            {(row.kind === "app" || row.kind === "project") && (
                              <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 17L17 7M17 7H7M17 7V17"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sliding Reveal Circle Container */}
            <motion.div
              style={{ height }}
              className="relative mt-[50px] md:mt-[100px] bg-red-500"
            >
              <motion.div
                className="h-[1550%] w-[120%] left-[-10%] absolute bg-white z-10"
                style={{
                  borderRadius: "0 0 50% 50%",
                  boxShadow: "0px 60px 50px rgba(0, 0, 0, 0.748)",
                }}
              />
            </motion.div>
          </div>

          {/* Contact Component */}
          <Contact />
        </div>
      )}
    </>
  );
}
