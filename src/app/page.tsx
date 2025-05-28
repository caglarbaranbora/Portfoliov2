"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import Description from "@/components/Description";
import Projects from "@/components/Projects";
import SlidingImages from "@/components/SlidingIimages";
import Contact from "@/components/Contact";
import IntroLoader from "@/components/IntroLoader";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import { useLoader } from "@/contexts/LoaderContext";

export default function Home() {
  const {
    showIntroLoader,
    showPageLoader,
    currentPageName,
    completeIntroLoader,
    completePageLoader,
  } = useLoader();

  useEffect(() => {
    // Sadece hiçbir loader aktif değilse locomotive scroll'u başlat
    if (!showIntroLoader && !showPageLoader) {
      (async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        new LocomotiveScroll();

        setTimeout(() => {
          document.body.style.cursor = "default";
          window.scrollTo(0, 0);
        }, 1000);
      })();
    }
  }, [showIntroLoader, showPageLoader]);

  return (
    <main className="min-h-screen">
      {/* İlk yükleme için IntroLoader - sadece ilk ziyarette */}
      <AnimatePresence mode="wait">
        {showIntroLoader && (
          <IntroLoader key="intro-loader" onComplete={completeIntroLoader} />
        )}
      </AnimatePresence>

      {/* Sayfa geçişleri için Preloader - sonraki ziyaretlerde */}
      <AnimatePresence mode="wait">
        {showPageLoader && (
          <Preloader
            key={`preloader-${currentPageName}`}
            pageName={currentPageName}
            onComplete={completePageLoader}
          />
        )}
      </AnimatePresence>

      {/* Ana içerik - loader'lar aktif değilken göster */}
      {!showIntroLoader && !showPageLoader && (
        <>
          <Header />
          <Landing />
          <Description />
          <Projects />
          <SlidingImages />
          <Contact />
        </>
      )}
    </main>
  );
}
