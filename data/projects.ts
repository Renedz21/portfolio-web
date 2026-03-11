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
    category: "Plataforma - IA",
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
    {
    id: 3,
    title: "Inkyra",
    category: "Plataforma - IA",
    description:
      "Plataforma impulsada por IA que genera conceptos de tatuajes a partir de ideas del usuario y agiliza el proceso de solicitud de cotizaciones para tatuadores.",
    stack: [
      "Next.js",
      "PrismaORM",
      "TypeScript",
      "NeonDB",
      "Cloudflare R2",
      "Better Auth",
    ],
    year: "2026",
    url: "https://inkyra.app/",
  },
    {
    id: 4,
    title: "Quipu",
    category: "Productividad",
    description:
      "App de finanzas personales pensada para el mercado peruano. Usa el método de sobres 50/30/20 y tiene soporte para trabajadores independientes.",
    stack: [
      "Next.js",
      "Convex",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Polar",
    ],
    year: "2026",
    url: "https://quipu-finance.app/",
  },
];
