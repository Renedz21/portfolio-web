"use client";

import { motion } from "motion/react";
import { Send } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";

export default function ContactMinimal() {
  const {
    register,
    handleSubmit,
    isValid,
    focusedField,
    handleFocus,
    createBlurHandler,
    nameValue,
    emailValue,
    messageValue,
  } = useContactForm();

  return (
    <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 py-24 bg-foreground text-background relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-accent text-sm uppercase tracking-widest mb-8 block">
            ( Empecemos )
          </span>

          <h2 className="text-[12vw] lg:text-[6vw] leading-[0.8] font-bold tracking-tighter mb-8">
            INICIEMOS UN <br />
            <span className="text-accent">PROYECTO</span> <br />
            JUNTOS
          </h2>

          <p className="text-white/50 text-lg max-w-md">
            Tienes un proyecto en mente? Estoy siempre abierto a discutir nuevas
            ideas, oportunidades creativas y desafíos técnicos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="name"
                className={`absolute left-0 transition-all duration-300 ${
                  focusedField === "name"
                    ? "-top-6 text-xs text-accent"
                    : "-top-5 text-2xl text-white/40"
                }`}
              >
                ¿Cómo te llamas?
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                onFocus={() => handleFocus("name")}
                onBlur={createBlurHandler(
                  "name",
                  nameValue,
                  register("name").onBlur
                )}
                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className={`absolute left-0 transition-all duration-300 ${
                  focusedField === "email"
                    ? "-top-6 text-xs text-accent"
                    : "-top-5 text-2xl text-white/40"
                }`}
              >
                ¿Cuál es tu email?
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                onFocus={() => handleFocus("email")}
                onBlur={createBlurHandler(
                  "email",
                  emailValue,
                  register("email").onBlur
                )}
                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="message"
                className={`absolute left-0 transition-all duration-300 ${
                  focusedField === "message"
                    ? "-top-6 text-xs text-accent"
                    : "-top-5 text-2xl text-white/40"
                }`}
              >
                Cuéntame sobre tu proyecto
              </label>
              <textarea
                id="message"
                rows={3}
                {...register("message")}
                onFocus={() => handleFocus("message")}
                onBlur={createBlurHandler(
                  "message",
                  messageValue,
                  register("message").onBlur
                )}
                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl text-white focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={!isValid}
                className="group flex items-center gap-4 text-xl font-bold tracking-widest uppercase hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-inherit cursor-pointer"
              >
                Enviar Mensaje
                <div className="relative overflow-hidden w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent transition-colors">
                  <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
              <p className="text-white/40 text-sm">
                Esto abrirá tu cliente de correo predeterminado
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-24 z-10 border-t border-white/10 pt-8">
        <div className="md:col-span-4">
          <p className="text-white/30 text-sm font-mono">
            © {new Date().getFullYear()} PORTFOLIO <br /> TODOS LOS DERECHOS
            RESERVADOS
          </p>
        </div>

        <div className="md:col-span-8 flex flex-col md:flex-row justify-end gap-8 md:gap-16">
          <a
            href="https://github.com/Renedz21"
            className="flex items-center gap-2 text-lg hover:text-accent transition-colors group"
            target="_blank"
          >
            <svg viewBox="0 0 1024 1024" fill="none" className="w-5 h-5">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="#ffff"
              />
            </svg>
            <span>Github</span>
          </a>
          <a
            href="https://www.linkedin.com/in/brad-edzon-perez-castillo-5342b1205/"
            className="flex items-center gap-2 text-lg hover:text-accent transition-colors group"
            target="_blank"
          >
            <svg
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 256"
              className="w-5 h-5"
            >
              <path
                d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                fill="#ffff"
              />
            </svg>
            <span>Linkedin</span>
          </a>
        </div>
      </div>
    </section>
  );
}
