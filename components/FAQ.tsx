'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const faqs = [
    {
        question: "What is an MVP — and what is it not?",
        answer: "An MVP (Minimum Viable Product) is the smallest version of a product that allows you to test real assumptions with real users. It is not a feature-complete product, a polished production release, or a guarantee of product–market fit. The goal of an MVP is learning, not perfection. This validator focuses on whether that learning can happen efficiently and responsibly."
    },
    {
        question: "How long should an MVP take to build?",
        answer: "There is no universal timeline. Most teams underestimate complexity and overbuild early. A well-scoped MVP typically takes weeks, not months — but only when scope, sequencing, and risk are tightly controlled. This validator provides a directional estimate, not a promise, based on known execution patterns."
    },
    {
        question: "Can this tool tell me if my idea will succeed?",
        answer: "No. This tool does not predict market success — it evaluates execution feasibility. It helps assess technical realism, scope appropriateness, and where teams commonly overbuild or mis-sequence."
    },
    {
        question: "Is this meant for startups or enterprise teams?",
        answer: "Both. Founders use it to avoid wasting time and capital early. Enterprise teams use it to pressure-test initiatives before allocating internal resources. The execution risks are the same regardless of company size."
    },
    {
        question: "What happens after I complete the validation?",
        answer: "You’ll receive a concise report by email that includes an MVP validation score, key execution risks, and guidance on what to build now versus later. There’s no obligation to engage further."
    },
    {
        question: "Is my idea safe? Who owns it?",
        answer: "Your idea remains 100% yours. Submissions are not treated as Power Shifter IP and are never reused. This tool exists to reduce waste, not extract concepts."
    },
    {
        question: "Why should I trust this assessment?",
        answer: "This validator is built on nearly 20 years of real product delivery. It reflects patterns from startup MVPs, enterprise innovation programs, and products that shipped — and those that stalled. It’s designed to surface uncomfortable truths early, when they’re cheapest to address."
    },
    {
        question: "What if my MVP scores poorly?",
        answer: "That’s often the most valuable outcome. A weak signal early can prevent months of wasted effort and gives you the opportunity to cut scope, re-sequence features, rethink the approach, or decide not to build yet."
    },
    {
        question: "Is this free? What’s the catch?",
        answer: "The MVP validation is free and takes about two minutes. No credit card is required, and there’s no obligation to move forward. If it makes sense to talk, you’ll know — and so will we."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="mvp-faq" className="w-full py-24 md:py-32 px-4 relative z-10 bg-[#0B0D12]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Common questions before building an MVP
                    </h2>
                    <p className="text-lg text-neutral-400 font-light">
                        Everything you should pressure-test before committing time, budget, or a team.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="border-b border-white/5 last:border-none">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between py-6 text-left group"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-lg md:text-xl font-medium transition-colors duration-200 ${isOpen ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                        <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-ps-blue' : 'text-neutral-500'}`} />
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-8 text-neutral-400 leading-relaxed text-base md:text-lg font-light">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-20 flex flex-col items-center justify-center space-y-4">
                    <Link href="/validate">
                        <Button className="h-14 px-8 text-lg rounded-full transition-all duration-300">
                            Validate my MVP now
                        </Button>
                    </Link>
                    <div className="space-y-1 text-center">
                        <p className="text-sm text-neutral-500 font-medium">
                            Takes ~2 minutes · No credit card
                        </p>
                    </div>
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />
        </section>
    );
}
