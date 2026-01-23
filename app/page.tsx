'use client';

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";

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
                <Button className="h-14 px-8 text-lg rounded-full bg-ps-blue hover:bg-ps-blue/90 shadow-[0_0_20px_rgba(0,96,255,0.5)] hover:shadow-[0_0_30px_rgba(0,96,255,0.6)] transition-all duration-300">
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

        {/* Feature Grid Mini-Preview (Moved down/secondary now) */}
        <div className="max-w-5xl px-4 w-full mt-12 mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-2">Detailed Analysis</h3>
            <p className="text-neutral-400">Everything you need to make a go/no-go decision.</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left"
          >
            {[
              { title: "Market Analysis", desc: "Identify competitors and differentiators instantly." },
              { title: "Tech Validator", desc: "Get a reality check on build time and complexity." },
              { title: "Execution Plan", desc: "Receive a step-by-step MVP roadmap." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                }}
                className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-24 text-center border-t border-white/5 pt-12">
            <p className="text-neutral-500 text-sm">
              Created by Power Shifter Digital • Built from 20 years of shipping products.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
