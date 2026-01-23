'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        quote: "The Power Shifter team truly feels like an extension of our own. Their flexibility, problem-solving mindset, and ability to pivot without losing momentum made a big impact.",
        author: "Joseph Santry",
        role: "Senior Director, Futures Innovation at lululemon",
        image: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/1718286212323.jpeg"
    },
    {
        quote: "Thrilled with the work POWERSHiFTER has done under very tight timelines and customizing the solution for our unique needs.",
        author: "Achin Kansal",
        role: "VP of Marketing, Phinity",
        image: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/1726361063792.jpeg"
    },
    {
        quote: "They have been a sincere pleasure to work with and have enabled the launch of XYON's complex and beautiful commerce site, which we expect will be the foundation of a successful brand.",
        author: "Simon Pimstone",
        role: "Co-Founder and CEO, XYON",
        image: "https://storage.googleapis.com/jp-images-for-apps/MVP%20Validator/1639696128312.jpeg"
    }
];

export function Testimonials() {
    return (
        <section className="w-full py-12 md:py-24 relative z-10">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
                        Trusted by product leaders who ship.
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. See how others are using data to build with confidence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <p className="text-neutral-300 mb-6 leading-relaxed">&quot;{t.quote}&quot;</p>
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                                    <Image
                                        src={t.image}
                                        alt={t.author}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{t.author}</p>
                                    <p className="text-xs text-neutral-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
