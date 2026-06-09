"use client";
import { useContext, useRef, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Curve from "@/components/Curve";

// Freezes the router context for the outgoing page so it keeps rendering its
// old content while its exit (cover) animation plays, instead of flashing the
// next route's content underneath the curve.
function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  if (!frozen) return <>{children}</>;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

// Next.js re-mounts template.tsx on every navigation. AnimatePresence (mode
// "wait") plays the outgoing page's cover animation, then the incoming page's
// reveal animation. `initial={false}` skips the animation on first load so the
// welcome/intro plays alone.
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <FrozenRouter key={pathname}>
        <Curve>{children}</Curve>
      </FrozenRouter>
    </AnimatePresence>
  );
}
