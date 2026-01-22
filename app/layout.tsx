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
  title: "MVP Estimator",
  description: "Validates and scopes your idea into an MVP.",
  openGraph: {
    title: "MVP Estimator",
    description: "Validates and scopes your idea into an MVP.",
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
