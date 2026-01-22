'use client';

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "We shaved 3 months off our development cycle by validating the tech stack first. The breakdown was brutally honest and saved us $50k.",
        author: "Sarah J.",
        role: "Founder, Fintech Startup",
    },
    {
        quote: "I thought my idea was too complex for an MVP. This report showed me exactly how to strip it down and launch in 6 weeks.",
        author: "Michael R.",
        role: "CTO, SaaS Platform",
    },
    {
        quote: "Finally, a reality check that isn't just 'yes, we can build it'. The execution roadmap is now our bible for development.",
        author: "David K.",
        role: "Product Director",
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
                        Trusted by founders who ship.
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Don't just take our word for it. See how others are using data to build with confidence.
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
                            <p className="text-neutral-300 mb-6 leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                    {t.author.charAt(0)}
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
