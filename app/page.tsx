'use client';

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { HowItWorks } from "@/components/HowItWorks";
import { FounderNote } from "@/components/FounderNote";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background Media */}
      <div className="absolute top-0 left-0 w-full h-[85vh] overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://cdn.prod.website-files.com/62a638e43312dd12f0196165%2F688b86be6925726e33aa8e70_jayph_Dozens_of_glowing_arrows1-poster-00001.jpg"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        >
          <source src="https://cdn.prod.website-files.com/62a638e43312dd12f0196165%2F688b86be6925726e33aa8e70_jayph_Dozens_of_glowing_arrows1-transcode.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />
      </div>

      <main className="flex w-full flex-col items-center justify-center pt-24 pb-12 z-20">
        <div className="max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 mb-24"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-neutral-300"
            >
              <Rocket className="w-4 h-4 text-ps-blue" /> Build safer, build faster
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2">
              Pressure-test your MVP<br />
              before you build it.
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 leading-relaxed">
              Stop wasting months — and burning capital — building products nobody wants. Get <span className="text-ps-blue font-semibold">instant, free feedback</span> on your market, solution, and build complexity.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center justify-center pt-4 space-y-6"
            >
              <Link href="/validate">
                <Button className="h-14 px-8 text-lg rounded-full transition-all duration-300">
                  Validate my MVP
                </Button>
              </Link>

              <p className="text-sm text-neutral-500 font-medium opacity-80">
                100% Free • No Credit Card Required
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Social Proof */}
        <Testimonials />

        {/* How it Works */}
        <HowItWorks />

        {/* Founder Note */}
        <FounderNote />

        {/* Feature Grid Mini-Preview (Moved down/secondary now) */}
        <div className="max-w-5xl px-4 w-full mt-12 mb-0">
          {/* Decision Close Section */}
          <section id="decision-close" className="w-full max-w-5xl px-4 pt-24 pb-12 mx-auto text-center z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
            >
              {/* Optional: Subtle gradient orb for effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  Before you build anything —<br />make the call that matters.
                </h2>

                <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
                  <p>
                    Most MVPs fail for reasons that were visible early — overbuilt scope, underestimated complexity, or the wrong thing built first.
                  </p>
                  <p>
                    This validator exists to surface those risks before they cost you months of time, burned capital, or a stalled product.
                  </p>
                  <p className="font-medium text-white">
                    You don’t need more opinions. You need a clear execution signal.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-y-4 gap-x-8 md:gap-x-12 pt-6 pb-10">
                  {[
                    "20+ years shipping real products",
                    "Trusted by product leaders",
                    "Free & obligation-free"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-base font-medium text-neutral-300 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                      <div className="w-2 h-2 bg-ps-blue rounded-full shadow-[0_0_8px_rgba(0,96,255,0.6)]" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                  <Link href="/validate">
                    <Button className="h-14 px-8 text-lg rounded-full transition-all duration-300">
                      Validate my MVP now
                    </Button>
                  </Link>
                  <div className="space-y-1">
                    <p className="text-sm text-neutral-500 font-medium">
                      Takes ~2 minutes · No credit card
                    </p>
                    <p className="text-xs text-neutral-600">
                      Guessing feels faster. Validation is cheaper.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* FAQ Section */}
          <FAQ />
        </div>
      </main>
    </div>
  );
}
