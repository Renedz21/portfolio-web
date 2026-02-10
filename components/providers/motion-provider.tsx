"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { PropsWithChildren } from "react";

export default function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
