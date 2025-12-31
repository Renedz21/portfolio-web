"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-80%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-foreground text-background"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          {/* Intro Card */}
          <div className="shrink-0 w-[80vw] md:w-[40vw] flex flex-col justify-center">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
              MIS <br />
              <span className="text-accent">PROYECTOS</span>
            </h2>
            <p className="text-xl text-white/60 max-w-md">
              Una colección de experimentos y productos digitales creados con
              precisión.
            </p>
            <div className="mt-12 flex items-center gap-2 text-accent">
              <span className="font-mono text-sm">DESCUBRELOS</span>
              <div className="h-px w-12 bg-accent"></div>
            </div>
          </div>

          {/* Project Cards */}
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative shrink-0 w-[85vw] md:w-[60vw] h-[70vh] bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col justify-between transition-colors duration-500 hover:bg-white/10 hover:border-accent/50"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm md:text-base text-accent">
                  0{project.id} — {project.year}
                </span>
                <Link
                  href={project.url || ""}
                  target="_blank"
                  className="p-3 rounded-full bg-white/5 group-hover:bg-accent group-hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <ArrowUpRight className="w-6 h-6" />
                </Link>
              </div>

              <div>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <div className="h-px w-full bg-white/10 mb-8 group-hover:bg-accent/50 transition-colors"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase mb-2">
                      Descripción
                    </h4>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase mb-2">
                      Tecnologías
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-white/20 rounded-full text-sm font-mono text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-700"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
