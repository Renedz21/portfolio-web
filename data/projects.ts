type Project = {
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
    stack: ["Expo", "React Native", "NestJS", "Cloudflare"],
    year: "2024-2025",
    url: "https://www.konti.dev/",
  },
];
