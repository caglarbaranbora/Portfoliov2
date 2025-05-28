"use client";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Magnetic from "@/app/common/Magnetic";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import { useLoader } from "@/contexts/LoaderContext";

export default function Page() {
  const container = useRef(null);
  const { showPageLoader, currentPageName, completePageLoader } = useLoader();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

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
        <div className="flex flex-col min-h-screen bg-white">
          <Header textColor="#000" isDark={true} />

          {/* Hero Section */}
          <div className="px-8 md:px-16 lg:px-24 pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              <h1 className="text-[80px] md:text-[120px] lg:text-[160px] font-medium leading-none text-black mb-8">
                TAMAM!
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div>
                  <h3 className="text-lg font-medium text-black mb-2 uppercase tracking-wider">
                    Year
                  </h3>
                  <p className="text-xl text-gray-700">2024</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-2 uppercase tracking-wider">
                    Role
                  </h3>
                  <p className="text-xl text-gray-700">Development</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="px-8 md:px-16 lg:px-24 mb-32"
          >
            <div className="max-w-7xl mx-auto">
              <div className="relative w-full h-[60vh] md:h-[70vh] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/assets/images/tamam/tamamLarge.png"
                  alt="Tamam Project"
                  width={2000}
                  height={1000}
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Project Description with Sliding Reveal */}
          <div
            ref={container}
            className="relative flex flex-col gap-12 mt-[200px] bg-white z-10"
          >
            <div className="px-8 md:px-16 lg:px-24 pb-32">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                  {/* Left Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl md:text-4xl font-medium text-black mb-6">
                        About the project
                      </h2>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                        Tamam! is a collaborative task management platform
                        inspired by Notion&apos;s flexibility, but purpose-built
                        for team productivity. It enables both individual task
                        tracking and team-based project coordination, making it
                        ideal for workspaces of any size.
                      </p>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Users can create tasks for themselves or assign them to
                        teams and even to people outside the team when needed.
                        Whether you&apos;re managing a shared project or just
                        keeping track of your own to-dos, Tamam! brings clarity
                        and collaboration into one place.
                      </p>
                    </div>
                  </motion.div>

                  {/* Right Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="space-y-12"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-black mb-6 uppercase tracking-wider">
                        Technologies
                      </h3>
                      <div className="space-y-3">
                        <Magnetic>
                          <p className="text-xl text-gray-700">
                            React & Next.js
                          </p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">TypeScript</p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">TailwindCSS</p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">
                            React Hook Form & Yup
                          </p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">Firebase</p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">Framer Motion</p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">
                            React Icons & Lottie
                          </p>
                        </Magnetic>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-black mb-6 uppercase tracking-wider">
                        Features
                      </h3>
                      <div className="space-y-3">
                        <p className="text-xl text-gray-700">
                          Personal Task Management
                        </p>
                        <p className="text-xl text-gray-700">Team Workspaces</p>
                        <p className="text-xl text-gray-700">Task Assignment</p>
                        <p className="text-xl text-gray-700">
                          Task Completion Tracking
                        </p>
                        <p className="text-xl text-gray-700">
                          Organized Boards
                        </p>
                        <p className="text-xl text-gray-700">
                          Notifications & Updates
                        </p>
                        <p className="text-xl text-gray-700">
                          Dark Mode Support
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Next Project */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-32 pt-16 border-t border-gray-200"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-black mb-2 uppercase tracking-wider">
                        Next Project
                      </h3>
                      <h4 className="text-3xl md:text-4xl font-medium text-black">
                        CineQST
                      </h4>
                    </div>
                    <Magnetic>
                      <Link
                        href="/work/cineqst"
                        className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
                      >
                        <span className="mr-2">View project</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </Magnetic>
                  </div>
                </motion.div>
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
        </div>
      )}
    </>
  );
}
