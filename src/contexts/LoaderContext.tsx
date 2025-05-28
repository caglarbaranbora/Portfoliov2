"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

interface LoaderContextType {
  showIntroLoader: boolean;
  showPageLoader: boolean;
  currentPageName: string;
  isTransitioning: boolean;
  completeIntroLoader: () => void;
  completePageLoader: () => void;
  startPageTransition: (pageName: string) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showIntroLoader, setShowIntroLoader] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [currentPageName, setCurrentPageName] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const previousPathRef = useRef<string>("");
  const isFirstRender = useRef(true);

  // Sayfa isimlerini pathname'den çıkar - geliştirilmiş versiyon
  const getPageName = (path: string): string => {
    const routes: { [key: string]: string } = {
      "/": "Home",
      "/about": "About",
      "/work": "Work",
      "/contact": "Contact",
    };

    // Ana rotalar için direkt döndür
    if (routes[path]) {
      return routes[path];
    }

    // Proje sayfaları için özel işlem (/work/notluk -> Notluk)
    if (path.startsWith("/work/")) {
      const projectName = path.split("/").pop() || "";
      return projectName.charAt(0).toUpperCase() + projectName.slice(1);
    }

    // Diğer alt sayfalar için genel işlem
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1];
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }

    return "Page";
  };

  // Sekme kapatıldığında localStorage'ı temizle
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("hasShownIntro");
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.removeItem("hasShownIntro");
      }
    };

    // Sekme kapatılma ve gizlenme olaylarını dinle
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // İlk yükleme kontrolü - localStorage ile
  useEffect(() => {
    if (isFirstRender.current) {
      const hasShownIntro = localStorage.getItem("hasShownIntro");

      // Sadece ilk ziyarette IntroLoader göster
      if (hasShownIntro !== "true") {
        setShowIntroLoader(true);
      }

      setHasInitialized(true);
      previousPathRef.current = pathname;

      // İlk sayfa ismini ayarla
      const initialPageName = getPageName(pathname);
      setCurrentPageName(initialPageName);

      isFirstRender.current = false;
    }
  }, [pathname]);

  // Pathname değişikliklerini dinle
  useEffect(() => {
    if (hasInitialized && pathname !== previousPathRef.current) {
      const pageName = getPageName(pathname);
      setCurrentPageName(pageName);

      // Sadece intro loader gösterilmemişse page loader göster
      const hasShownIntro = localStorage.getItem("hasShownIntro");
      if (hasShownIntro === "true" && !showIntroLoader) {
        setShowPageLoader(true);
        setIsTransitioning(true);
      }

      previousPathRef.current = pathname;
    }
  }, [pathname, hasInitialized, showIntroLoader]);

  const completeIntroLoader = () => {
    localStorage.setItem("hasShownIntro", "true");
    setShowIntroLoader(false);
  };

  const completePageLoader = () => {
    setShowPageLoader(false);
    setIsTransitioning(false);
  };

  const startPageTransition = (pageName: string) => {
    setCurrentPageName(pageName);
    setShowPageLoader(true);
    setIsTransitioning(true);
  };

  const value = {
    showIntroLoader,
    showPageLoader,
    currentPageName,
    isTransitioning,
    completeIntroLoader,
    completePageLoader,
    startPageTransition,
  };

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
