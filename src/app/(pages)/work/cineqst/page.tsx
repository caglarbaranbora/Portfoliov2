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
              <h1 className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] font-medium leading-none text-black mb-8">
                CINEQST
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-black mb-2 uppercase tracking-wider">
                    Year
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-700">2024</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-black mb-2 uppercase tracking-wider">
                    Role
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-700">
                    Design & Development
                  </p>
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <h3 className="text-base sm:text-lg font-medium text-black mb-2 uppercase tracking-wider">
                    Live Site
                  </h3>
                  <Magnetic>
                    <Link
                      href="https://cineqst.vercel.app/"
                      target="_blank"
                      className="block px-4 sm:px-6 py-2 sm:py-3"
                    >
                      <span className="text-lg sm:text-xl font-semibold">
                        cineqst.vercel.app
                      </span>
                    </Link>
                  </Magnetic>
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
                  src="/assets/images/cineQst/cineqst.png"
                  alt="CineQST Project"
                  width={2000}
                  height={1000}
                  className="object-cover"
                  style={{ height: "auto", width: "auto" }}
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
                        CineQST is a minimalist and user-friendly mobile app
                        designed to help users discover, choose, and save movies
                        they love.
                      </p>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Whether you&apos;re indecisive about what to watch or
                        simply want to keep a list of your favorite films,
                        CineQST is your go-to movie companion. The app focuses
                        on simplicity, with no ads, no tracking, and no payments
                        — just a clean space to explore and manage your movie
                        preferences.
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
                            React & React-Native Expo
                          </p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">TypeScript</p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">Nativewind</p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">Axios</p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">Appwrite</p>
                        </Magnetic>
                        <Magnetic>
                          <p className="text-xl text-gray-700">
                            Gesture Handler & Reanimated & Vector Icons
                          </p>
                        </Magnetic>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-black mb-6 uppercase tracking-wider">
                        Features
                      </h3>
                      <div className="space-y-3">
                        <p className="text-xl text-gray-700">Movie Discovery</p>
                        <p className="text-xl text-gray-700">Favorites List</p>
                        <p className="text-xl text-gray-700">
                          Search Functionality
                        </p>
                        <p className="text-xl text-gray-700">
                          Categories & Genres
                        </p>
                        <p className="text-xl text-gray-700">
                          Trailers & Details
                        </p>
                        <p className="text-xl text-gray-700">Dark Mode</p>
                        <p className="text-xl text-gray-700">
                          No Ads, No Tracking
                        </p>
                        <p className="text-xl text-gray-700">Rate Movies</p>
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
