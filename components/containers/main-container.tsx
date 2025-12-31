"use client";

import type { PropsWithChildren } from "react";
import { useRef } from "react";
import { useScroll, useSpring, motion } from "motion/react";
import Navigation from "../shared/navigation";

export default function MainContainer({ children }: PropsWithChildren) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen bg-background text-foreground selection:bg-accent selection:text-white"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      <Navigation />
      <div className="flex flex-col">{children}</div>
    </main>
  );
}
