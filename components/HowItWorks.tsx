'use client';

import { motion } from "framer-motion";
import { Lightbulb, Cpu, FileText } from "lucide-react";

const steps = [
    {
        icon: Lightbulb,
        title: "1. Input your Idea",
        desc: "Describe your product vision in plain English. No technical specs required—just your goal and core features.",
        duration: "~2 min",
    },
    {
        icon: Cpu,
        title: "2. AI Pressure Test",
        desc: "Our engine analyzes your concept against millions of data points to identify risks, competitors, and technical complexity.",
        duration: "Instant",
    },
    {
        icon: FileText,
        title: "3. Get Your Roadmap",
        desc: "Receive a comprehensive report with a tech stack, estimated build time, and a step-by-step execution plan.",
        duration: "Free PDF",
    },
];

export function HowItWorks() {
    return (
        <section className="w-full py-12 md:py-24 relative z-10 border-t border-white/5 bg-white/[0.02]">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase mb-2 block">The Process</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        From idea to execution plan in minutes.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 -z-10" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center relative"
                        >
                            <div className="w-24 h-24 rounded-full bg-[#0B0F17] border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)] relative">
                                <step.icon className="w-10 h-10 text-blue-400" />
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-xs font-mono text-blue-300 whitespace-nowrap">
                                    {step.duration}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                            <p className="text-neutral-400 leading-relaxed max-w-[280px]">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
