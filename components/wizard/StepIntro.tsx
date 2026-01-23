import React from 'react';
import { ShieldCheck, Clock, AlertTriangle, FileText } from 'lucide-react';

export default function StepIntro() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">Before we start...</h2>
                <p className="text-neutral-400 text-lg">
                    A quick overview of what happens next and why it matters.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* What's about to happen */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-ps-blue font-semibold mb-1">
                        <Clock className="w-5 h-5" />
                        <h3>What&apos;s about to happen</h3>
                    </div>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                        You&apos;ll answer a short series of questions about your problem, solution, and complexity.
                        These aren&apos;t generic prompts—they are designed to surface <span className="text-white font-medium">hidden risks</span> and <span className="text-white font-medium">scope inflation</span>.
                    </p>
                </div>

                {/* The Goal */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-ps-violet font-semibold mb-1">
                        <AlertTriangle className="w-5 h-5" />
                        <h3>The Goal</h3>
                    </div>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                        We use 20 years of shipping experience to give you an <span className="text-white font-medium">honest signal on risk</span>, not optimism.
                        Identify where teams typically overbuild or mis-sequence.
                    </p>
                </div>
            </div>

            <div className="h-px bg-white/10 w-full" />

            <div className="grid gap-6 md:grid-cols-2">
                {/* Reassurance */}
                <div className="bg-ps-blue/5 border border-ps-blue/10 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-ps-blue font-semibold mb-2">
                        <ShieldCheck className="w-5 h-5" />
                        <h3>Your Idea is Safe</h3>
                    </div>
                    <p className="text-neutral-400 text-sm">
                        Your idea remains 100% yours. Submissions are never treated as IP.
                        This tool exists to reduce waste, not extract concepts.
                    </p>
                </div>

                {/* Expectation */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-white font-semibold mb-2">
                        <FileText className="w-5 h-5" />
                        <h3>What You Get</h3>
                    </div>
                    <ul className="text-neutral-400 text-sm space-y-1 list-disc list-inside">
                        <li>An MVP validation score</li>
                        <li>Key execution risks to watch for</li>
                        <li>Plain-English feasibility check</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
