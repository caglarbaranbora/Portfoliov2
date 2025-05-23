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

  useEffect(() => {
    if (pathname !== currentRoute) {
      setPreviousRoute(currentRoute);
      setCurrentRoute(pathname);
      setIsTransitioning(true);
      setIsInitialLoad(false);
      setIsTransitionComplete(false);
    }
  }, [pathname, currentRoute]);

  const startTransition = () => {
    setIsTransitioning(true);
    setIsTransitionComplete(false);
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setIsTransitionComplete(true);
  };

  // Route isimlerini pathname'den çıkar
  const getPageName = (path: string): string => {
    const routes: { [key: string]: string } = {
      "/": "Home",
      "/about": "About",
      "/services": "Services",
      "/portfolio": "Portfolio",
      "/contact": "Contact",
      "/blog": "Blog",
    };

    return (
      routes[path] ||
      path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)
    );
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
