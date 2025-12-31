import { motion } from "motion/react";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-40 pointer-events-none mix-blend-difference text-white"
    >
      <div className="pointer-events-auto cursor-pointer group">
        <span className="font-bold text-xl tracking-tighter group-hover:text-accent transition-colors duration-300">
          EP.
        </span>
      </div>

      <div className="flex flex-col items-end gap-2 pointer-events-auto">
        <button
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
          className="text-sm font-mono hover:text-accent transition-colors duration-300 uppercase tracking-widest"
        >
          Contactame
        </button>
        <span className="text-[10px] font-mono opacity-50">
          {new Date().getFullYear()} ©
        </span>
      </div>
    </motion.nav>
  );
}
