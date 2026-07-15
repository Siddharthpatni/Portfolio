import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://siddharth-portfolio-pi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Siddharth Patni | Agentic AI & Autonomous Systems Engineer",
  description:
    "Portfolio of Siddharth Patni — Autonomous Agentic AI, LLM infrastructure, MLOps, full-stack and robotics engineering. Builder of Vergabepilot.AI, Spidey, Sentinel, and more.",
  keywords: [
    "Siddharth Patni",
    "Agentic AI",
    "Autonomous Systems",
    "Software Engineer",
    "LLM Infrastructure",
    "FastAPI",
    "Next.js",
    "Robotics",
    "Computer Vision",
  ],
  authors: [{ name: "Siddharth Divyang Patni", url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Siddharth Patni | Agentic AI & Autonomous Systems Engineer",
    description:
      "Autonomous agentic AI platforms, LLM observability, robotics and full-stack systems — explore the Spider Lab.",
    siteName: "Siddharth Patni — Spidey Labs",
    images: [{ url: "/profile-photo.jpg", width: 1200, height: 1200, alt: "Siddharth Patni" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddharth Patni | Agentic AI & Autonomous Systems Engineer",
    description:
      "Autonomous agentic AI platforms, LLM observability, robotics and full-stack systems.",
    images: ["/profile-photo.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Siddharth Divyang Patni",
  jobTitle: "Agentic AI & Systems Engineer",
  email: "mailto:patnisiddharth1311@gmail.com",
  url: siteUrl,
  image: `${siteUrl}/profile-photo.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Braunschweig",
    addressCountry: "DE",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "TU Clausthal & Ostfalia University of Applied Sciences" },
    { "@type": "CollegeOrUniversity", name: "Charotar University of Science and Technology" },
  ],
  sameAs: [
    "https://github.com/Siddharthpatni",
    "https://www.linkedin.com/in/siddharth-divyang-patni-644857185",
  ],
  knowsAbout: [
    "Agentic AI",
    "LLM Infrastructure",
    "Computer Vision",
    "Robotics",
    "Full-Stack Development",
    "MLOps",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕷️</text></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen relative stark-grid">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-spidey-red/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-holo-cyan/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-stark-gold/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {children}
      </body>
    </html>
  );
}
