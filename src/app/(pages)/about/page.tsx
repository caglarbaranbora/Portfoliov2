"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Magnetic from "@/app/common/Magnetic";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  {
    skill: "HTML",
    image: "/assets/skills/html.svg",
  },
  {
    skill: "CSS",
    image: "/assets/skills/css.svg",
  },
  {
    skill: "SASS",
    image: "/assets/skills/sass.svg",
  },
  {
    skill: "TAILWINDCSS",
    image: "/assets/skills/tailwind.svg",
  },
  {
    skill: "JAVASCRIPT",
    image: "/assets/skills/javascript.svg",
  },
  {
    skill: "TYPESCRIPT",
    image: "/assets/skills/typescript.svg",
  },
  {
    skill: "REACT",
    image: "/assets/skills/react.svg",
  },
  {
    skill: "REACT NATIVE",
    image: "/assets/skills/react-native.svg",
  },
  {
    skill: "NEXT.JS",
    image: "/assets/skills/next.svg",
  },
  {
    skill: "GIT",
    image: "/assets/skills/git.svg",
  },
  {
    skill: "FIGMA",
    image: "/assets/skills/figma.svg",
  },
  {
    skill: "FRAMER MOTION",
    image: "/assets/skills/framer.svg",
  },
];

const faqs = [
  {
    question: "What is your creative design process like?",
    answer:
      "I start by understanding your brand, goals, and target audience. Then I create wireframes, design mockups, and develop interactive prototypes before moving to development.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications can take 6-12 weeks. I always provide detailed timelines upfront.",
  },
  {
    question: "How do I get started on a project with you?",
    answer:
      "Simply reach out through the contact form or email. We'll schedule a discovery call to discuss your project needs, timeline, and budget.",
  },
  {
    question: "What should I do if you're fully booked?",
    answer:
      "I maintain a waiting list for future projects. Contact me to discuss your timeline and I'll let you know when I have availability.",
  },
];

export default function page() {
  const container = useRef(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header textColor="#000" isDark={true} />

      {/* Hero Section - Centered Name */}
      <div className="px-8 md:px-16 lg:px-24 pt-32 pb-16 flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black">
            CAGLAR
          </h1>
          <h1 className="text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black">
            BORA
          </h1>
        </motion.div>
      </div>

      {/* Content Section with Sliding Reveal - SlidingImages Style */}
      <div
        ref={container}
        className="relative flex flex-col gap-12 mt-[200px] bg-white z-10"
      >
        {/* About Content */}
        <div className="px-8 md:px-16 lg:px-24 pb-32">
          <div className="max-w-7xl mx-auto">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-24"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-medium text-black">
                  about.
                </h2>
                <Magnetic>
                  <a
                    href="/Caglar Baran Bora Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider"
                  >
                    Read.cv
                  </a>
                </Magnetic>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    I collaborate with businesses of all sizes worldwide, using
                    the latest technologies. My designs have also earned
                    multiple awards.
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    I'm dedicated to crafting beautiful and highly functional
                    designs that seamlessly align with my clients' unique needs
                    and long-term goals.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Skills Marquee Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-24"
            >
              <h3 className="text-2xl md:text-3xl font-medium text-black mb-8">
                skills.
              </h3>

              {/* Marquee Container */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-8 whitespace-nowrap"
                  animate={{ x: [0, -1000] }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 20,
                      ease: "linear",
                    },
                  }}
                >
                  {/* First set */}
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-8">
                      <div className="w-8 h-8 flex-shrink-0">
                        <img
                          src={skill.image}
                          alt={skill.skill}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            console.log(`Error loading image: ${skill.image}`);
                          }}
                        />
                      </div>
                      <span className="text-xl md:text-2xl font-medium text-gray-700 uppercase tracking-wider">
                        {skill.skill}
                      </span>
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {skills.map((skill, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className="flex items-center gap-8"
                    >
                      <div className="w-8 h-8 flex-shrink-0">
                        <img
                          src={skill.image}
                          alt={skill.skill}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            console.log(`Error loading image: ${skill.image}`);
                          }}
                        />
                      </div>
                      <span className="text-xl md:text-2xl font-medium text-gray-700 uppercase tracking-wider">
                        {skill.skill}
                      </span>
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="px-8 md:px-16 lg:px-24 pb-32">
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
  );
}
