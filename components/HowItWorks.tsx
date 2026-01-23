'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const steps = [
    {
        imageSrc: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/Idea_icon.svg",
        title: "1. Input your Idea",
        desc: "Describe your product vision in plain English. No technical specs required—just your goal and core features.",
        duration: "~2 min",
    },
    {
        imageSrc: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/Pressure_Test.svg",
        title: "2. AI Pressure Test",
        desc: "Our engine analyzes your concept against millions of data points to identify risks, competitors, and technical complexity.",
        duration: "Instant",
    },
    {
        imageSrc: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/Road_Map.svg",
        title: "3. Get Your Roadmap",
        desc: "Receive a comprehensive report with a tech stack, estimated build time, and a step-by-step execution plan.",
        duration: "Free Report",
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
                    <span className="text-ps-blue font-semibold text-sm tracking-wider uppercase mb-2 block">The Process</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        From idea to execution plan in minutes.
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
                >
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-ps-blue/20 via-ps-violet/20 to-ps-blue/20 -z-10" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                            }}
                            className="flex flex-col items-center text-center relative"
                        >
                            <div className="w-24 h-24 rounded-full bg-background border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(0,96,255,0.2)] relative">
                                <Image
                                    src={step.imageSrc}
                                    alt={step.title}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-contain"
                                    unoptimized
                                />
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-ps-blue/20 border border-ps-blue/30 rounded-full text-xs font-mono text-ps-blue whitespace-nowrap">
                                    {step.duration}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                            <p className="text-neutral-400 leading-relaxed max-w-[280px]">{step.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mt-16 space-y-4"
                >
                    <Link href="/validate">
                        <Button className="px-12 py-6 text-lg rounded-full">
                            Validate my MVP
                        </Button>
                    </Link>
                    <p className="text-sm text-neutral-500 font-medium">
                        100% Free • No Credit Card Required
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
