import { getPublicUrl } from "@/lib/public-url";
import type { Metadata } from "next";

const defineMetadata = <T extends Metadata>(metadata: T) => metadata;

const publicUrl = getPublicUrl();

const seoConfig = defineMetadata({
  metadataBase: new URL(publicUrl),
  title: {
    template: "%s - Portfolio Web",
    default: "Portfolio Web by Edzon Perez",
  },
  description:
    "Portfolio personal de un desarrollador fullstack especializado en React, Next.js, TypeScript y Node.js. Proyectos, experiencia y metodología de desarrollo.",
  themeColor: "#000000",
  openGraph: {
    title: "Portfolio Web by Edzon Perez",
    description:
      "Portfolio personal de un desarrollador fullstack especializado en React, Next.js, TypeScript y Node.js.",
    url: publicUrl,
    siteName: "Portfolio Web",
    images: [
      {
        url: `${publicUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Portfolio Web - Desarrollador Fullstack",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Web by Edzon Perez",
    description:
      "Portfolio personal de un desarrollador fullstack especializado en React, Next.js, TypeScript y Node.js.",
    images: [`${publicUrl}/og.png`],
  },
  alternates: {
    canonical: publicUrl,
  },
});

export default seoConfig;
