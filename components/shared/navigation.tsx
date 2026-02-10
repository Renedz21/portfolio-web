"use client";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-40 pointer-events-none mix-blend-difference text-white animate-fade-in-down">
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
    </nav>
  );
}
