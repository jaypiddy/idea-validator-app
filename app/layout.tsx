import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import LinkedInTag from "@/components/LinkedInTag";

export const metadata: Metadata = {
  metadataBase: new URL("https://rapidmvp.powershifter.com"),
  title: {
    default: "MVP Validator | Power Shifter",
    template: "%s | Power Shifter MVP Validator",
  },
  description: "Stop guessing. Get a free, instant assessment of your MVP's market viability, technical complexity, and roadmap execution risks.",
  keywords: ["MVP validator", "startup idea test", "mvp calculator", "product market fit", "app cost estimator"],
  authors: [{ name: "Power Shifter Digital", url: "https://powershifter.com" }],
  creator: "Power Shifter Digital",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rapidmvp.powershifter.com",
    title: "MVP Validator | Pressure-test your idea before you build.",
    description: "Get a free, instant assessment of your MVP's market viability, technical complexity, and roadmap execution risks.",
    siteName: "Power Shifter MVP Validator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Power Shifter MVP Validator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP Validator | Pressure-test your idea before you build.",
    description: "Get a free, instant assessment of your MVP's market viability, technical complexity, and roadmap execution risks.",
    images: ["/og-image.png"],
    creator: "@powershifter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Adobe Fonts (Typekit) — Articulat CF, Fraunces, Config Mono */}
        <link rel="stylesheet" href="https://use.typekit.net/xkk7api.css" />
      </head>
      <body
        className="antialiased flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <LinkedInTag />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
