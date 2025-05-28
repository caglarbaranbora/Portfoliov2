"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Magnetic from "@/app/common/Magnetic";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import { useLoader } from "@/contexts/LoaderContext";

export default function ContactPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    services: "",
    message: "",
  });

  const { showPageLoader, currentPageName, completePageLoader } = useLoader();

  // Google Forms'un API URL'si (Yanıt Gönderme Linki)
  const googleFormURL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;
  // Google Forms'daki input alanlarının Entry ID'leri
  const entryIDs = {
    name: process.env.NEXT_PUBLIC_ENTRY_NAME || "",
    email: process.env.NEXT_PUBLIC_ENTRY_EMAIL || "",
    services: process.env.NEXT_PUBLIC_ENTRY_SERVICES || "",
    message: process.env.NEXT_PUBLIC_ENTRY_MESSAGE || "",
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
  }, [showPageLoader]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted!"); // Debug için
    console.log("Form Data:", formData);
    console.log("Google Form URL:", googleFormURL);
    console.log("Entry IDs:", entryIDs);

    // Basit validation
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and email are required!");
      return;
    }

    if (!googleFormURL) {
      alert(
        "Google Form configuration is missing. Please check your .env.local file."
      );
      return;
    }

    // Entry ID'lerin varlığını kontrol et
    if (!entryIDs.name || !entryIDs.email) {
      alert("Entry IDs are missing. Please check your .env.local file.");
      return;
    }

    // Form verilerini URL formatına dönüştür
    const formBody = new URLSearchParams();
    formBody.append(entryIDs.name, formData.name);
    formBody.append(entryIDs.email, formData.email);
    formBody.append(entryIDs.services, formData.services);
    formBody.append(entryIDs.message, formData.message);

    console.log("Form Body:", formBody.toString());

    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    })
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", services: "", message: "" });
      })
      .catch((error) => {
        console.error("Sending failed:", error);
        alert("Failed to send message. Please try again.");
      });
  };

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
        <div className="min-h-screen bg-[#1C1D20] text-white">
          <Header textColor="#fff" isDark={false} />

          {/* Hero Section */}
          <div className="px-8 md:px-16 lg:px-24 pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              <div className="mb-16 space-y-4">
                <h1 className="text-[80px] md:text-[120px] lg:text-[140px] font-light leading-none">
                  Let&apos;s start a project together
                </h1>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="px-8 md:px-16 lg:px-24 pb-32">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-16 lg:gap-32 justify-between">
                {/* Left Column - Form */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex-1"
                >
                  <form onSubmit={handleSubmit} className="space-y-12 ">
                    {/* Question 01 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-medium opacity-60">
                          01
                        </span>
                        <label className="text-2xl font-medium">
                          What&apos;s your name?
                        </label>
                      </div>
                      <input
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-gray-600 pb-4 text-xl text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
                        placeholder="John Doe *"
                        style={{
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "white",
                        }}
                      />
                    </div>

                    {/* Question 02 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-medium opacity-60">
                          02
                        </span>
                        <label className="text-2xl font-medium">
                          What&apos;s your email?
                        </label>
                      </div>
                      <input
                        autoComplete="off"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-gray-600 pb-4 text-xl text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
                        placeholder="john@doe.com *"
                        style={{
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "white",
                        }}
                      />
                    </div>

                    {/* Question 03 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-medium opacity-60">
                          03
                        </span>
                        <label className="text-2xl font-medium">
                          What services are you looking for?
                        </label>
                      </div>
                      <input
                        autoComplete="off"
                        type="text"
                        name="services"
                        value={formData.services}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-600 pb-4 text-xl text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
                        placeholder="Web Design, Web Development..."
                        style={{
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "white",
                        }}
                      />
                    </div>

                    {/* Question 04 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-medium opacity-60">
                          04
                        </span>
                        <label className="text-2xl font-medium">
                          Your message
                        </label>
                      </div>
                      <textarea
                        autoComplete="off"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-transparent border-b border-gray-600 pb-4 text-xl text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors resize-none"
                        placeholder="Hello Caglar, can you help me with..."
                        style={{
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "white",
                        }}
                      />
                    </div>

                    <div className="pt-8">
                      <Magnetic>
                        <button
                          type="submit"
                          className="px-12 py-6 text-white font-medium hover:opacity-90 transition-opacity rounded-full bg-[#f45232]"
                        >
                          Send Message
                        </button>
                      </Magnetic>
                    </div>
                  </form>
                </motion.div>

                {/* Right Column - Contact Details */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-16"
                >
                  <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                    <Image
                      width={150}
                      height={150}
                      alt={"image"}
                      src={`/assets/images/background.webp`}
                      className="w-full h-full object-cover"
                      priority={true}
                      sizes=""
                    />
                  </div>
                  {/* Contact Details */}
                  <div>
                    <h3 className="text-lg font-medium mb-8 uppercase tracking-wider opacity-60">
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <Magnetic>
                        <Link
                          href="mailto:boracaglarbaran@gmail.com"
                          className="block text-xl hover:opacity-80 transition-opacity"
                        >
                          boracaglarbaran@gmail.com
                        </Link>
                      </Magnetic>
                      <Magnetic>
                        <Link
                          href="tel:+905522321279"
                          className="block text-xl hover:opacity-80 transition-opacity"
                        >
                          +90 552 232 1279
                        </Link>
                      </Magnetic>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div>
                    <h3 className="text-lg font-medium mb-8 uppercase tracking-wider opacity-60">
                      Business Details
                    </h3>
                    <div className="space-y-4 text-xl">
                      <p>Caglar Bora</p>
                      <p>Location: Turkey</p>
                      <p>Freelance Developer</p>
                    </div>
                  </div>

                  {/* Socials */}
                  <div>
                    <h3 className="text-lg font-medium mb-8 uppercase tracking-wider opacity-60">
                      Socials
                    </h3>
                    <div className="space-y-4">
                      <Magnetic>
                        <Link
                          href="https://www.instagram.com/caglarbaranbora/"
                          target="_blank"
                          className="block text-xl hover:opacity-80 transition-opacity"
                        >
                          Instagram
                        </Link>
                      </Magnetic>
                      <Magnetic>
                        <Link
                          href="https://x.com/caglarbaranbora"
                          target="_blank"
                          className="block text-xl hover:opacity-80 transition-opacity"
                        >
                          Twitter
                        </Link>
                      </Magnetic>
                      <Magnetic>
                        <Link
                          href="https://www.linkedin.com/in/caglarbaranbora/"
                          target="_blank"
                          className="block text-xl hover:opacity-80 transition-opacity"
                        >
                          LinkedIn
                        </Link>
                      </Magnetic>
                      <Magnetic>
                        <Link
                          href="https://github.com/caglarbaranbora"
                          target="_blank"
                          className="block text-xl hover:opacity-80 transition-opacity"
                        >
                          GitHub
                        </Link>
                      </Magnetic>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-32 pt-16 border-t border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4 uppercase tracking-wider opacity-60">
                      Version
                    </h3>
                    <p className="text-xl">2025 © Edition</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4 uppercase tracking-wider opacity-60">
                      Local Time
                    </h3>
                    <p className="text-xl">{currentTime}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4 uppercase tracking-wider opacity-60">
                      Location
                    </h3>
                    <p className="text-xl">Turkey</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
