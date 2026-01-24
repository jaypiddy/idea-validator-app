import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700"], // 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mvp.powershifter.com"),
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
    url: "https://mvp.powershifter.com",
    title: "MVP Validator | Pressure-test your idea before you build.",
    description: "Get a free, instant assessment of your MVP's market viability, technical complexity, and roadmap execution risks.",
    siteName: "Power Shifter MVP Validator",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public/ or replaced with a real URL
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
    images: ["/og-image.jpg"],
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
    <html lang="en" className="bg-neutral-950" suppressHydrationWarning>
      <body
        className={`${rubik.className} ${rubik.variable} antialiased text-white selection:bg-blue-500/30 font-light flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <Header />
        <main className="pt-20 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
