"use client";

import { motion } from "motion/react";

export default function AboutMinimal() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 bg-background">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground block mb-4">
              ( Acerca de mí )
            </span>
            <h2 className="text-4xl font-bold tracking-tighter">
              MÁS ALLÁ <br /> DEL CÓDIGO
            </h2>
          </div>

          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-2xl md:text-4xl leading-tight font-light mb-12">
                Hola! Soy Edzon, un desarrollador fullstack que busca que cada
                producto sea <span className="text-accent">claro</span> y{" "}
                <span className="text-accent">agradable de usar</span>. No me
                limito a crear sitios web; construyo experiencias que se sienten
                fluidas y resuelven problemas sin complicar la vida.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-mono text-sm uppercase mb-6 border-b border-border pb-2">
                    Tecnologías Principales
                  </h3>
                  <ul className="space-y-2 font-light text-lg">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Node.js</li>
                    <li>PostgreSQL / Supabase</li>
                    <li>Tailwind / Shadcn / UI</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-sm uppercase mb-6 border-b border-border pb-2">
                    Metodología
                  </h3>
                  <ul className="space-y-2 font-light text-lg">
                    <li>Diseño centrado en el usuario</li>
                    <li>Minimalismo aplicado a la interfaz y al flujo</li>
                    <li>Código limpio y buenas prácticas por defecto</li>
                    <li>Arquitectura simple y mantenible</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
