import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sushanta Bhowmick | Full-Stack Developer",
  description: "Full-Stack Developer specializing in MERN & MEAN stack with 3+ years of experience. Expert in React, Next.js, Node.js, and modern web technologies.",
  keywords: ["Sushanta Bhowmick", "full-stack developer", "MERN stack", "MEAN stack", "React", "Next.js", "Node.js", "TypeScript", "Kolkata developer"],
  authors: [{ name: "Sushanta Bhowmick" }],
  creator: "Sushanta Bhowmick",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#6366f1" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Sushanta Bhowmick | Full-Stack Developer",
    description: "Full-Stack Developer specializing in MERN & MEAN stack with 3+ years of experience. Expert in React, Next.js, Node.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
    siteName: "Sushanta Bhowmick Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushanta Bhowmick | Full-Stack Developer",
    description: "Full-Stack Developer specializing in MERN & MEAN stack with 3+ years of experience.",
  },

  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
