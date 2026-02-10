import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import seoConfig from "@/seo.config";
import MotionProvider from "@/components/providers/motion-provider";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const { themeColor: _, ...metadata } = seoConfig;
export { metadata };

export const viewport = {
  themeColor: seoConfig.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased overflow-x-hidden`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
