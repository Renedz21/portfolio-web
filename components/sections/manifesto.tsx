"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function Manifesto() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter mb-8 md:mb-12">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                EDZON
              </motion.span>
            </span>
            <span className="block overflow-hidden text-accent">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                PEREZ
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 md:mt-24">
          <div className="md:col-span-5 md:col-start-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl leading-relaxed font-light text-muted-foreground"
            >
              Desarrollo y diseño software que resuelve problemas reales con
              Nada genérico
              <span className="text-foreground font-medium">
                {" "}
                con precisión técnica y simplicidad.
              </span>{" "}
              Nada improvisado. Solo sistemas bien hechos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="h-px w-12 bg-foreground/20"></div>
              <span className="font-mono text-sm uppercase tracking-widest">
                Fullstack Engineer
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 animate-bounce"
      >
        <ArrowDown className="w-6 h-6 text-accent" />
      </motion.div>
    </section>
  );
}
