"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Magnetic from "@/app/common/Magnetic";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

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
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"
  const [filter, setFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

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
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();

      setTimeout(() => {
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === filter)
      );
    }
  }, [filter]);

  const designCount = projects.filter((p) => p.category === "Design").length;
  const developmentCount = projects.filter(
    (p) => p.category === "Development"
  ).length;

  return (
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
          <h1 className="text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black ">
            WORK
          </h1>
        </motion.div>
      </div>

      {/* Projects Section with Sliding Reveal */}
      <div
        ref={container}
        className="relative flex flex-col gap-12 mt-[200px] bg-white z-10"
      >
        {/* Projects Content */}
        <div className="px-8 md:px-16 lg:px-24 pb-32">
          <div className="max-w-7xl mx-auto">
            {/* Filter and View Controls */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12"
            >
              {/* Filter Buttons */}
              <div className="flex items-center gap-8">
                <button
                  onClick={() => setFilter("All")}
                  className={`text-xl md:text-2xl font-medium transition-colors ${
                    filter === "All"
                      ? "text-black"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("Design")}
                  className={`text-xl md:text-2xl font-medium transition-colors ${
                    filter === "Design"
                      ? "text-black"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Design
                  <span className="ml-3 text-lg text-gray-400">
                    {designCount}
                  </span>
                </button>
                <button
                  onClick={() => setFilter("Development")}
                  className={`text-xl md:text-2xl font-medium transition-colors ${
                    filter === "Development"
                      ? "text-black"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Development
                  <span className="ml-3 text-lg text-gray-400">
                    {developmentCount}
                  </span>
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors ${
                    viewMode === "list"
                      ? "text-black"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors ${
                    viewMode === "grid"
                      ? "text-black"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Projects List/Grid */}
            {viewMode === "list" ? (
              /* List View  */
              <div className="w-full">
                {/* Table Headers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-12 gap-4 px-8 md:px-12 py-6 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="col-span-6 md:col-span-5">Project</div>
                  <div className="col-span-3 md:col-span-4">Service</div>
                  <div className="col-span-2 md:col-span-2">Year</div>
                  <div className="col-span-1 md:col-span-1"></div>
                </motion.div>

                {/* Project Rows */}
                <div className="divide-y divide-gray-100">
                  {filteredProjects.map((project, index) => (
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
                      onClick={() => (window.location.href = project.href)}
                    >
                      <div className="grid grid-cols-12 gap-4 px-8 md:px-12 py-8 md:py-12 items-center">
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
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index + 0.5 }}
                    className="group"
                    onMouseEnter={(e) => {
                      // Grid view'da sadece cursor'u göster, modal'ı gösterme
                      setModal({ active: true, index: index });
                      moveItems(e.clientX, e.clientY);
                    }}
                    onMouseLeave={(e) => {
                      setModal({ active: false, index: index });
                      moveItems(e.clientX, e.clientY);
                    }}
                  >
                    <Magnetic>
                      <Link href={project.href} className="block">
                        <div className="cursor-pointer">
                          {/* Cover Image */}
                          <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 rounded-lg overflow-hidden mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover"
                              style={{ height: "auto", width: "auto" }}
                            />
                          </div>

                          {/* Project Info */}
                          <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-medium text-black group-hover:text-gray-600 transition-colors duration-300">
                              {project.title}
                            </h3>

                            {/* Separator Line */}
                            <div className="w-full h-px bg-gray-200"></div>

                            {/* Service and Year */}
                            <div className="flex items-center justify-between">
                              <p className="text-lg text-gray-600">
                                {project.services}
                              </p>
                              <p className="text-lg text-gray-500">
                                {project.year}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Magnetic>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Archive Link */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <Magnetic>
                <Link
                  target="_blank"
                  href="https://github.com/caglarbaranbora"
                  className="inline-flex items-center text-gray-600 hover:text-black transition-colors group"
                >
                  <span className="mr-2">Archive</span>
                  <span className="text-sm text-gray-400">63</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
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
                </Link>
              </Magnetic>
            </motion.div> */}
          </div>
        </div>

        {/* Sliding Reveal Circle Container */}
        <motion.div
          style={{ height }}
          className="relative mt-[100px] bg-red-500"
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

      {/* Contact Component - Behind the reveal animation */}
      <Contact />

      {/* Modal and Cursor */}
      {viewMode === "list" && (
        <>
          {/* Modal - sadece list view'da göster */}
          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={modal.active ? "enter" : "closed"}
            className="h-[350px] w-[400px] fixed top-1/2 left-1/2 bg-white pointer-events-none overflow-hidden z-30"
          >
            <div
              className="h-full w-full relative transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ top: modal.index * -100 + "%" }}
            >
              {filteredProjects.map((project, index) => (
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
        </>
      )}

      {/* View Cursor - her iki view'da da göster */}
      <motion.div
        ref={cursor}
        className="w-20 h-20 rounded-full bg-[#f45232] text-white fixed z-30 flex items-center justify-center text-sm font-light pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? "enter" : "closed"}
      >
        View
      </motion.div>

      <motion.div
        ref={cursorLabel}
        className="w-20 h-20 rounded-full bg-transparent text-white fixed z-30 flex items-center justify-center text-sm font-light pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? "enter" : "closed"}
      />
    </div>
  );
}
