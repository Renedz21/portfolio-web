"use client";

import { Send } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";

export default function ContactForm() {
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
            register("name").onBlur,
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
            register("email").onBlur,
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
            register("message").onBlur,
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
  );
}
