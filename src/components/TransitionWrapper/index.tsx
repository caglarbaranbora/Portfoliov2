"use client";
import { useRoute } from "@/contexts/RouteContext";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/Preloader";
import { useEffect, useState } from "react";

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentRoute, isTransitioning, endTransition, isInitialLoad } =
    useRoute();
  const [showTransition, setShowTransition] = useState(isInitialLoad);
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    if (isTransitioning) {
      setShowTransition(true);
      setTransitionKey((prev) => prev + 1);
    }
  }, [isTransitioning]);

  const handleTransitionComplete = () => {
    setShowTransition(false);
    endTransition();
  };

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={handleTransitionComplete}>
        {showTransition && (
          <PageTransition
            key={`transition-${transitionKey}`}
            pageName={currentRoute}
            isInitialLoad={isInitialLoad}
            onComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showTransition && <div key="content">{children}</div>}
      </AnimatePresence>
    </>
  );
}
