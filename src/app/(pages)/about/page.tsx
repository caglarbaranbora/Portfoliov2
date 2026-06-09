"use client";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Magnetic from "@/app/common/Magnetic";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "@/components/Marquee";
import Image from "next/image";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import { useLoader } from "@/contexts/LoaderContext";
import { experience } from "@/lib/experience";

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

          {/* Hero Section - Centered Name */}
          <div className="px-8 md:px-16 lg:px-[80px] lg:py-[100px] flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-[80px] sm:text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black">
                CAGLAR
              </h1>
              <h1 className="text-[80px] sm:text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black">
                BORA
              </h1>
            </motion.div>
          </div>

          <div
            ref={container}
            className="relative flex flex-col gap-12 bg-white z-10"
          >
            {/* About Content */}
            <div className="px-8 md:px-16 lg:px-[80px] pb-16">
              <div className="max-w-7xl mx-auto">
                {/* About Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-24"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
                    <h2 className="text-[24px] sm:text-[30px] md:text-3xl font-semibold text-black">
                      about.
                    </h2>
                    <Magnetic>
                      <a
                        href="/Caglar Baran Bora Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 sm:px-6 py-2 sm:py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-xs sm:text-sm uppercase tracking-wider"
                      >
                        Read.cv
                      </a>
                    </Magnetic>
                  </div>

                  {/* Text Content - Responsive Width */}
                  <div className="text-start w-full lg:max-w-[70%] mb-12 sm:mb-16">
                    <p className="text-[20px] sm:text-[28px] md:text-[35px] lg:text-[40px] font-medium text-black leading-relaxed tracking-1.1em">
                      <span className="hidden sm:inline m-10"></span>A mobile &amp;
                      frontend developer and co-founder, I build cross-platform
                      apps and scalable web products — pairing a software
                      engineering foundation with real, shipped projects to
                      deliver fast, polished experiences.
                    </p>
                  </div>

                  {/* Images Section - Responsive Layout */}
                  <div className="flex flex-col lg:flex-row relative gap-6 lg:gap-10">
                    <div className="bg-gray-100 overflow-hidden w-full lg:max-w-[60%]">
                      <div className="text-center">
                        <Image
                          src={"/assets/images/caglar1.png"}
                          alt="caglar baran bora"
                          width={6000}
                          height={3000}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base sm:text-lg text-black leading-relaxed">
                        Across 3 years I&apos;ve shipped work for startups and
                        agencies — from AI-powered mobile apps and banking
                        platforms to full-stack web products. As co-founder of
                        Guchly Studio I now own products end to end, from
                        strategy to release. I&apos;m a hardworking,
                        people-oriented problem solver who thrives on teamwork
                        and shipping things that make a real impact.
                      </p>
                    </div>
                  </div>

                  {/* Skills Marquee - under the photo */}
                  <div className="mt-12 sm:mt-16">
                    <Marquee />
                  </div>
                </motion.div>

                {/* Experience Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="mb-24"
                >
                  <h2 className="text-[24px] sm:text-[30px] font-semibold text-black mb-8 sm:mb-12">
                    experience.
                  </h2>

                  <div className="border-t border-gray-200">
                    {experience.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.05 * index }}
                        className="group border-b border-gray-200 py-8 sm:py-10"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2 lg:gap-8">
                          <div className="lg:flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-black">
                                {job.role}
                                <span className="text-gray-400"> · {job.company}</span>
                              </h3>
                              {job.current && (
                                <span className="px-3 py-1 text-[11px] uppercase tracking-wider border border-black rounded-full text-black">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed lg:max-w-[80%]">
                              {job.detail}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {job.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 text-xs sm:text-sm text-gray-500 border border-gray-200 rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm sm:text-base text-gray-500 font-light whitespace-nowrap lg:text-right">
                            {job.period}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>

            {/* FAQs Section */}
            {/* <div className="px-8 md:px-16 lg:px-[80px] lg:py-[100px] pb-32">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <h3 className="text-2xl md:text-3xl font-medium text-black mb-12">
                    FAQs.
                  </h3>

                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full py-6 flex items-center justify-between text-left group"
                        >
                          <h4 className="text-lg md:text-xl font-medium text-black group-hover:text-gray-600 transition-colors">
                            {faq.question}
                          </h4>
                          <motion.div
                            animate={{ rotate: openFaq === index ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-6 h-6 flex items-center justify-center"
                          >
                            <svg
                              className="w-4 h-4 text-black"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </motion.div>
                        </button>

                        <motion.div
                          initial={false}
                          animate={{
                            height: openFaq === index ? "auto" : 0,
                            opacity: openFaq === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div> */}

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
