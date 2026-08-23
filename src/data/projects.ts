import type { ImageMetadata } from "astro";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  stack: readonly string[];
  year: string;
  url: string;
  image?: ImageMetadata;
}

export const projects: readonly Project[] = [
  {
    id: 1,
    title: "Konti",
    category: "Finanzas personales",
    description:
      "App móvil para gestionar boletas electrónicas mediante ingreso manual u OCR, diseñada para facilitar la declaración anual ante SUNAT.",
    stack: [
      "Expo",
      "React Native",
      "NestJS",
      "Cloudflare",
      "RevenueCat",
      "TypeScript",
    ],
    year: "2024–2025",
    url: "https://www.konti.dev/",
  },
  {
    id: 2,
    title: "¿QuéComo?",
    category: "Plataforma · IA",
    description:
      "Aplicación web que ayuda a decidir qué comer con ideas rápidas de snacks, desayunos y menús simples, reduciendo la fricción de elegir.",
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
    category: "Plataforma · IA",
    description:
      "Plataforma impulsada por IA que genera conceptos de tatuajes a partir de ideas del usuario y agiliza las cotizaciones con tatuadores.",
    stack: [
      "Next.js",
      "Prisma ORM",
      "TypeScript",
      "Neon",
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
      "App de finanzas personales para el mercado peruano, basada en el método de sobres 50/30/20 y pensada también para independientes.",
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
