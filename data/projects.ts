export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  stack: string[];
  year: string;
  url?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "KONTI",
    category: "Finanzas Personales",
    description:
      "App móvil para gestionar boletas electrónicas mediante ingreso manual u OCR, diseñada para facilitar la declaración anual ante SUNAT.",
    stack: [
      "Expo",
      "React Native",
      "NestJS",
      "Cloudflare",
      "RevenueCat",
      "Typescript",
    ],
    year: "2024-2025",
    url: "https://www.konti.dev/",
  },
  {
    id: 2,
    title: "¿QuéComo?",
    category: "Productividad",
    description:
      "Aplicación web que ayuda a decidir qué comer en el día a día con ideas rápidas de snacks, desayunos y menús simples, enfocada en reducir la fricción al elegir.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Polar",
    ],
    year: "2026",
    url: "https://que-como.vercel.app/",
  },
];
