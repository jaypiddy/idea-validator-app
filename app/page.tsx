'use client';

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-purple-900/20 rounded-full blur-[100px]" />
      </div>

      <main className="flex w-full max-w-5xl flex-col items-center justify-center p-4 py-24 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-neutral-300"
          >
            <Rocket className="w-4 h-4 text-blue-400" /> Build safer, build faster
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2">
            Pressure-test your MVP<br />
            before you build it.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 leading-relaxed">
            Stop wasting months — and burning capital — building products nobody wants. Get fast, execution-level feedback on your market, solution, and build complexity.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center justify-center pt-8 space-y-6"
          >
            <Link href="/validate">
              <Button className="h-14 px-8 text-lg rounded-full">
                Validate my MVP
              </Button>
            </Link>

            <p className="text-sm text-neutral-500 font-medium opacity-80">
              Built from nearly 20 years of shipping, scaling, and rescuing digital products.
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Grid Mini-Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left"
        >
          {[
            { title: "Market Analysis", desc: "Identify competitors and differentiators instantly." },
            { title: "Tech Validator", desc: "Get a reality check on build time and complexity." },
            { title: "Execution Plan", desc: "Receive a step-by-step MVP roadmap." }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
