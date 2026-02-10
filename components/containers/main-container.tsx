"use client";

import type { PropsWithChildren } from "react";
import { useScroll, useSpring, m } from "motion/react";
import Navigation from "../shared/navigation";

export default function MainContainer({ children }: PropsWithChildren) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative w-full min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      {/* Progress Bar */}
      <m.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      <Navigation />
      <div className="relative flex flex-col">{children}</div>
    </main>
  );
}
