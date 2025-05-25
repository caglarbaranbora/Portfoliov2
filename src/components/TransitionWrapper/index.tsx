"use client";
import { useRoute } from "@/contexts/RouteContext";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/Preloader";
import IntroLoader from "@/components/IntroLoader";
import { useEffect, useState } from "react";

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentRoute, isTransitioning, endTransition, isInitialLoad } =
    useRoute();
  const [showIntroLoader, setShowIntroLoader] = useState(false);
  const [showPageTransition, setShowPageTransition] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
    // Mount olduktan sonra initial load durumunu kontrol et
    if (isInitialLoad) {
      setShowIntroLoader(true);
    }
  }, [isInitialLoad]);

  // Sayfa geçişlerini dinle
  useEffect(() => {
    if (isTransitioning && !isInitialLoad) {
      setShowPageTransition(true);
      setTransitionKey((prev) => prev + 1);
    }
  }, [isTransitioning, isInitialLoad]);

  const handleIntroComplete = () => {
    setShowIntroLoader(false);
    endTransition();
  };

  const handlePageTransitionComplete = () => {
    setShowPageTransition(false);
    endTransition();
  };

  // Server-side rendering sırasında intro loader placeholder göster
  if (!mounted) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          zIndex: 99,
          backgroundColor: "#141516",
        }}
      >
        <div style={{ color: "white", fontSize: "42px" }}>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: "white",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          ></span>
          Hello
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Initial Load - IntroLoader */}
      <AnimatePresence mode="wait">
        {showIntroLoader && (
          <IntroLoader key="intro-loader" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Page Transitions - Preloader */}
      <AnimatePresence mode="wait">
        {showPageTransition && (
          <PageTransition
            key={`transition-${transitionKey}`}
            pageName={currentRoute}
            isInitialLoad={false}
            onComplete={handlePageTransitionComplete}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showIntroLoader && !showPageTransition && (
          <div key="content">{children}</div>
        )}
      </AnimatePresence>
    </>
  );
}
