"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/shared/project-card";

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
        <m.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          <div className="shrink-0 w-[80vw] md:w-[40vw] flex flex-col justify-center">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6">
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
