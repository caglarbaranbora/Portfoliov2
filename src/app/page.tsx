"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import Description from "@/components/Description";
import Projects from "@/components/Projects";
import SlidingImages from "@/components/SlidingIimages";
import Contact from "@/components/Contact";

export default function Home() {
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
    <main className="min-h-screen">
      <Header />
      <Landing />
      <Description />
      <Projects />
      <SlidingImages />
      <Contact />
    </main>
  );
}
