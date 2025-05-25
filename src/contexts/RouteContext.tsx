// context/RouteContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface RouteContextType {
  currentRoute: string;
  previousRoute: string;
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
  isInitialLoad: boolean;
  isTransitionComplete: boolean;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export function RouteProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState(pathname);
  const [previousRoute, setPreviousRoute] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  // localStorage kontrolü için useEffect
  useEffect(() => {
    if (!hasCheckedStorage) {
      const hasVisited = localStorage.getItem("hasVisited");
      if (hasVisited) {
        setIsInitialLoad(false);
      }
      setHasCheckedStorage(true);
    }
  }, [hasCheckedStorage]);

  useEffect(() => {
    if (pathname !== currentRoute) {
      setPreviousRoute(currentRoute);
      setCurrentRoute(pathname);
      setIsTransitioning(true);
      // Sayfa değişikliklerinde isInitialLoad'u false yap (sadece localStorage kontrolünden sonra)
      if (hasCheckedStorage) {
        setIsInitialLoad(false);
      }
      setIsTransitionComplete(false);
    }
  }, [pathname, currentRoute, hasCheckedStorage]);

  const startTransition = () => {
    setIsTransitioning(true);
    setIsTransitionComplete(false);
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setIsTransitionComplete(true);

    // İlk yükleme tamamlandığında localStorage'a kaydet ve isInitialLoad'u false yap
    if (isInitialLoad) {
      localStorage.setItem("hasVisited", "true");
      setIsInitialLoad(false);
    }
  };

  // Route isimlerini pathname'den çıkar
  const getPageName = (path: string): string => {
    const routes: { [key: string]: string } = {
      "/": "Home",
      "/about": "About",
      "/work": "Work",
      "/contact": "Contact",
    };

    // Eğer routes'da varsa direkt döndür
    if (routes[path]) {
      return routes[path];
    }

    // Proje sayfaları için özel işlem (/work/notluk -> notluk)
    if (path.startsWith("/work/")) {
      const projectName = path.split("/").pop() || "";
      return projectName.charAt(0).toUpperCase() + projectName.slice(1);
    }

    // Diğer sayfalar için genel işlem
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1];
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }

    return "Page";
  };

  const value = {
    currentRoute: getPageName(currentRoute),
    previousRoute: getPageName(previousRoute),
    isTransitioning,
    startTransition,
    endTransition,
    isInitialLoad,
    isTransitionComplete,
  };

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
}
