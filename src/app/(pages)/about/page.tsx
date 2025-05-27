"use client";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Magnetic from "@/app/common/Magnetic";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "@/components/Marquee";
import Service from "@/components/Service";
import Image from "next/image";

const services = [
  {
    title1: "Web",
    title2: "Developing",
    src: "/assets/skills/react.svg",
  },
  {
    title1: "Mobile",
    title2: "Developing",
    src: "/assets/skills/react-native.svg",
  },
  {
    title1: "Graphic",
    title2: "Design",
    src: "/assets/skills/framer.svg",
  },
  {
    title1: "Backend",
    title2: "Developing",
    src: "/assets/skills/node.svg",
  },
  {
    title1: "Web",
    title2: "Hosting",
    src: "/assets/skills/hosting.svg",
  },
];

export default function Page() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

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

  return (
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
          <h1 className="text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black">
            CAGLAR
          </h1>
          <h1 className="text-[120px] md:text-[174px] lg:text-[220px] font-medium leading-none text-black">
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
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-[30px] md:text-3xl font-semibold text-black">
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

              {/* Text Content - Full Width */}
              <div className="text-start max-w-[70%] mb-16">
                <p className="text-[40px] font-medium text-black leading-relaxed tracking-1.1em">
                  <span className="m-10"></span>My passion for front-end
                  development, combined with a strong foundation in software
                  engineering and real project experience, allows me to deliver
                  responsive, user-friendly, and scalable web applications.
                </p>
              </div>

              {/* Images Section */}
              <div className="flex relative gap-10">
                <div className=" bg-gray-100 overflow-hidden max-w-[60%]">
                  <div className="text-center">
                    <Image
                      src={"/assets/images/caglar1.png"}
                      alt="caglar baran bora"
                      width={6000}
                      height={3000}
                    />
                  </div>
                </div>
                <p className="font-semibold text-lg text-black leading-relaxed items-center justify-center">
                  I&apos;m not just a developer — I&apos;m a hardworking,
                  people-oriented problem solver who thrives on teamwork and
                  continuous improvement. Whether it&apos;s contributing to a
                  fintech project, creating a real-time chat app, or helping
                  others grow, I approach every challenge with dedication and a
                  smile. My goal is always to craft elegant solutions that make
                  a real impact.
                </p>
              </div>
            </motion.div>

            {/* Services Section */}
            <div className="h-[100vh] flex items-center justify-center cursor-hover">
              <div className="w-[100%]">
                <p className="text-[30px] font-semibold ">services.</p>

                {services.map((service, index) => {
                  return <Service key={index} project={service} />;
                })}
              </div>
            </div>
            {/* Skills Marquee Section */}
            <div className="mb-24">
              <Marquee />
            </div>
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
  );
}
