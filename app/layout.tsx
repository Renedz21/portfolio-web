import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import seoConfig from "@/seo.config";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
