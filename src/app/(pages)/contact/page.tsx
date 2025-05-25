"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Magnetic from "@/app/common/Magnetic";
import RoundedButton from "@/app/common/RoundedButton";
import { motion } from "framer-motion";
import Link from "next/link";

export default function page() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();

    // Update time every minute
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes} GMT+3`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
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
          <h1 className="text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black mb-16">
            CONTACT
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-8 md:px-16 lg:px-24 pb-32 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-medium text-black mb-8">
                  Let's work together
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
                  Ready to bring your digital vision to life? Let's discuss your
                  project and create something amazing together.
                </p>
              </div>

              <div className="space-y-6">
                <Magnetic>
                  <RoundedButton backgroundColor="#f45232">
                    <Link
                      href="mailto:boracaglarbaran@gmail.com"
                      className="block px-8 py-4"
                    >
                      <span className="text-white font-medium">
                        boracaglarbaran@gmail.com
                      </span>
                    </Link>
                  </RoundedButton>
                </Magnetic>

                <Magnetic>
                  <RoundedButton backgroundColor="#000">
                    <Link href="tel:+905522321279" className="block px-8 py-4">
                      <span className="text-white font-medium">
                        +90 552 232 1279
                      </span>
                    </Link>
                  </RoundedButton>
                </Magnetic>
              </div>
            </motion.div>

            {/* Right Column - Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-lg font-medium text-black mb-6 uppercase tracking-wider">
                  Services
                </h3>
                <div className="space-y-4">
                  <p className="text-xl text-gray-700">
                    Web Design & Development
                  </p>
                  <p className="text-xl text-gray-700">UI/UX Design</p>
                  <p className="text-xl text-gray-700">Frontend Development</p>
                  <p className="text-xl text-gray-700">Brand Identity</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-6 uppercase tracking-wider">
                  Response Time
                </h3>
                <p className="text-xl text-gray-700">Usually within 24 hours</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section - Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-32 pt-16 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div>
                <h3 className="text-lg font-medium text-black mb-4 uppercase tracking-wider">
                  Version
                </h3>
                <p className="text-xl text-gray-700">Caglar Bora 2025 ©</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-4 uppercase tracking-wider">
                  Local Time
                </h3>
                <p className="text-xl text-gray-700">{currentTime}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-4 uppercase tracking-wider">
                  Location
                </h3>
                <p className="text-xl text-gray-700">Located in Turkey</p>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-8">
                socials.
              </h3>
              <div className="flex flex-wrap gap-8">
                <Magnetic>
                  <Link
                    href="https://www.instagram.com/caglarbaranbora/"
                    target="_blank"
                    className="text-xl text-gray-700 hover:text-black transition-colors"
                  >
                    Instagram
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="https://x.com/caglarbaranbora"
                    target="_blank"
                    className="text-xl text-gray-700 hover:text-black transition-colors"
                  >
                    X
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="https://github.com/caglarbaranbora"
                    target="_blank"
                    className="text-xl text-gray-700 hover:text-black transition-colors"
                  >
                    Github
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="https://www.linkedin.com/in/caglarbaranbora/"
                    target="_blank"
                    className="text-xl text-gray-700 hover:text-black transition-colors"
                  >
                    LinkedIn
                  </Link>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
