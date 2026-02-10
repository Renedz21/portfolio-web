import { ArrowDown } from "lucide-react";

export default function Manifesto() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter mb-8 md:mb-12">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up-name">EDZON</span>
            </span>
            <span className="block overflow-hidden text-accent">
              <span className="block animate-slide-up-accent">PEREZ</span>
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 md:mt-24">
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-xl md:text-2xl leading-relaxed font-light text-muted-foreground animate-fade-in-paragraph">
              Desarrollo y diseño software que resuelve problemas reales con
              Nada genérico
              <span className="text-foreground font-medium">
                {" "}
                con precisión técnica y simplicidad.
              </span>{" "}
              Nada improvisado. Solo sistemas bien hechos.
            </p>

            <div className="mt-12 flex items-center gap-4 animate-fade-in-role">
              <div className="h-px w-12 bg-foreground/20"></div>
              <span className="font-mono text-sm uppercase tracking-widest">
                Fullstack Engineer
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 animate-fade-in-arrow">
        <ArrowDown className="w-6 h-6 text-accent" />
      </div>
    </section>
  );
}
