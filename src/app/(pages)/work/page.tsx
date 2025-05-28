"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import { useLoader } from "@/contexts/LoaderContext";
import { useRouter } from "next/navigation";

const projects = [
  {
    title: "Notluk",
    description: "Design & Development",
    year: "Ongoing",
    href: "/work/notluk",
    category: "Development",
    location: "Turkey",
    services: "Design & Development",
    image: "/assets/images/notluk/notlukSmall.png",
  },
  {
    title: "CineQST",
    description: "Design & Development",
    year: "2023",
    href: "/work/cineqst",
    category: "Development",
    location: "Turkey",
    services: "Design & Development",
    image: "/assets/images/cineQst/cineqst.png",
  },
  {
    title: "Tamam App",
    description: "Development",
    year: "2024",
    href: "/work/tamam",
    category: "Development",
    location: "Turkey",
    services: "Development",
    image: "/assets/images/tamam/tamam.png",
  },
  {
    title: "@Chat",
    description: "Design & Development",
    year: "2024",
    href: "/work/chat",
    category: "Development",
    location: "Turkey",
    services: "Design & Development",
    image: "/assets/images/chat/1.png",
  },
];

export default function Page() {
  const container = useRef(null);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);
  const router = useRouter();

  const { showPageLoader, currentPageName, completePageLoader } = useLoader();

  const xMoveContainer = useRef<((value: number) => void) | null>(null);
  const yMoveContainer = useRef<((value: number) => void) | null>(null);
  const xMoveCursor = useRef<((value: number) => void) | null>(null);
  const yMoveCursor = useRef<((value: number) => void) | null>(null);
  const xMoveCursorLabel = useRef<((value: number) => void) | null>(null);
  const yMoveCursorLabel = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    },
  };

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (
    active: boolean,
    index: number,
    x: number,
    y: number
  ) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  useEffect(() => {
    // Sadece page loader yoksa locomotive scroll'u başlat
    if (!showPageLoader) {
      (async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        new LocomotiveScroll();

        setTimeout(() => {
          document.body.style.cursor = "default";
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
        <div
          className="flex flex-col min-h-screen bg-white"
          onMouseMove={(e) => {
            moveItems(e.clientX, e.clientY);
          }}
        >
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
                WORK
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
                    {projects.map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index + 0.5 }}
                        className="group cursor-pointer transition-all duration-300 hover:bg-gray-50"
                        onMouseEnter={(e) => {
                          manageModal(true, index, e.clientX, e.clientY);
                        }}
                        onMouseLeave={(e) => {
                          manageModal(false, index, e.clientX, e.clientY);
                        }}
                        onClick={() => router.push(project.href)}
                      >
                        {/* Desktop Layout */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-8 md:px-12 py-8 md:py-12 items-center">
                          {/* Project Name */}
                          <div className="col-span-6 md:col-span-5">
                            <h3 className="text-2xl md:text-4xl font-medium text-black group-hover:text-gray-600 transition-colors duration-300">
                              {project.title}
                            </h3>
                          </div>

                          {/* Service */}
                          <div className="col-span-3 md:col-span-4">
                            <p className="text-lg md:text-xl text-gray-600 font-light">
                              {project.services}
                            </p>
                          </div>

                          {/* Year */}
                          <div className="col-span-2 md:col-span-2">
                            <p className="text-lg md:text-xl text-gray-500 font-light">
                              {project.year}
                            </p>
                          </div>

                          {/* Arrow */}
                          <div className="col-span-1 md:col-span-1 flex justify-end">
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
                          </div>
                        </div>

                        {/* Mobile & Tablet Layout */}
                        <div className="lg:hidden px-6 py-8 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-black group-hover:text-gray-600 transition-colors duration-300 mb-2">
                                {project.title}
                              </h3>
                              <p className="text-base sm:text-lg text-gray-600 font-light mb-1">
                                {project.services}
                              </p>
                              <p className="text-sm sm:text-base text-gray-500 font-light">
                                {project.year}
                              </p>
                            </div>
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

          {/* Modal - Sadece desktop'ta göster */}
          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
            className="hidden lg:block h-[350px] w-[400px] fixed top-1/2 left-1/2 bg-white pointer-events-none overflow-hidden z-30"
          >
            <div
              className="h-full w-full relative transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ top: modal.index * -100 + "%" }}
            >
              {projects.map((project, index) => (
                <div
                  key={`modal_${index}`}
                  className="h-full w-full flex items-center justify-center"
                >
                  <Image
                    src={project.image}
                    width={300}
                    height={0}
                    alt={project.title}
                    className="h-auto"
                    style={{ height: "auto", width: "auto" }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cursor - Sadece desktop'ta göster */}
          <motion.div
            ref={cursor}
            className="hidden lg:flex w-20 h-20 rounded-full bg-[#f45232] text-white fixed z-30 items-center justify-center text-sm font-light pointer-events-none"
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
          >
            View
          </motion.div>

          <motion.div
            ref={cursorLabel}
            className="hidden lg:flex w-20 h-20 rounded-full bg-transparent text-white fixed z-30 items-center justify-center text-sm font-light pointer-events-none"
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
          />
        </div>
      )}
    </>
  );
}
