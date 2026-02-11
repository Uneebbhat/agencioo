import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Agencioo | Multi-Tenant Agency & Project Management Platform",
    template: "%s | Agencioo",
  },
  description:
    "Agencioo is a multi-tenant SaaS platform designed for agencies and teams to manage projects, goals, and operations with role-based access control, audit history, and scalable backend architecture.",
  keywords: [
    "Agencioo",
    "agency management software",
    "multi-tenant SaaS",
    "project management for agencies",
    "team collaboration platform",
    "RBAC SaaS",
    "goal tracking software",
    "backend SaaS architecture",
  ],
  authors: [{ name: "Agencioo Team" }],
  creator: "Agencioo",
  publisher: "Agencioo",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencioo | Multi-Tenant Agency & Project Management Platform",
    description:
      "Manage agencies, projects, teams, and goals in one secure, multi-tenant SaaS platform built for scale and control.",
    type: "website",
    siteName: "Agencioo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencioo | Agency & Project Management SaaS",
    description:
      "A modern multi-tenant platform for agencies to manage projects, teams, goals, and operations securely.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
