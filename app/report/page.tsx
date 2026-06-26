'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { AnalysisResult } from '@/lib/types';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import confetti from 'canvas-confetti';

import { Zap, Info, Eye, Ban, Map, Lock, Check, ArrowLeft } from 'lucide-react';

declare global {
    interface Window {
        lintrk: (action: string, data: { conversion_id: number }) => void;
    }
}

export default function ReportPage() {
    const router = useRouter();
    // Data Fetching with SWR
    const [ideaData, setIdeaData] = useState<string | null>(null);

    // Email Gating State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    async function handleEmailSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSendingEmail(true);

        try {
            let inputs = {};
            try {
                if (ideaData) {
                    inputs = JSON.parse(ideaData);
                }
            } catch (e) {
                console.error("Failed to parse ideaData for submission", e);
            }

            const res = await fetch('/api/send-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, report: result, inputs }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to send email');
            }

            // Track conversion
            if (window.lintrk) {
                window.lintrk('track', { conversion_id: 23909916 });
            }

            setEmailSent(true);
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : 'Unknown error';
            alert(`Error: ${message}`);
        } finally {
            setSendingEmail(false);
        }
    }

    // Initialize idea data on mount
    useEffect(() => {
        const data = localStorage.getItem('ideaData');
        if (!data) {
            router.push('/validate');
        } else {
            setIdeaData(data);
        }
    }, [router]);

    const fetcher = async ([url, body]: [string, string]): Promise<AnalysisResult> => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || 'Analysis failed');
        }
        return res.json();
    };

    const { data: result, error: swrError, isLoading } = useSWR<AnalysisResult>(
        ideaData ? ['/api/analyze', ideaData] : null,
        fetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            onSuccess: (data) => {
                // Optional: Keep localStorage sync if needed for other parts of app, 
                // otherwise SWR handles the session cache.
                if (ideaData) {
                    localStorage.setItem('lastAnalysis', JSON.stringify({
                        inputs: ideaData,
                        result: data
                    }));
                }
            }
        }
    );

    const loading = isLoading;
    const error = swrError ? swrError.message : '';

    const rapidWeeks = result ? Math.max(2, Math.ceil(result.monthsToBuild)) : 0;

    // Confetti Effect
    useEffect(() => {
        if (!loading && result && result.score >= 75) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: NodeJS.Timeout = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#0060FF', '#FD2E90', '#FFFFFF'] });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#0060FF', '#FD2E90', '#FFFFFF'] });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [result, loading]);

    if (loading) return <LoadingScreen />;
    if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;
    if (!result) return null;

    return (
        <div className="min-h-screen p-6 md:p-12 relative overflow-x-hidden bg-[#121315] text-[#F4F6FB]">
            <button
                onClick={() => router.push('/validate')}
                className="fixed top-6 left-6 text-sm text-neutral-400 hover:text-white flex items-center gap-2 transition-colors z-50 bg-neutral-900/50 backdrop-blur px-4 py-2 rounded-full border border-neutral-800"
            >
                <ArrowLeft className="w-4 h-4" /> Edit Inputs
            </button>

            <div className="max-w-4xl mx-auto space-y-16">

                {/* 1. HERO SECTION: Score & Interpretation */}
                <div className="text-center space-y-6 pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-medium text-ps-blue mb-2 tracking-wide uppercase">
                            Analysis Complete
                        </h2>
                    </motion.div>

                    <div className="relative inline-block">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ps-blue to-ps-pink tracking-tighter"
                        >
                            <AnimatedNumber value={result.score} />
                            <span className="text-4xl text-neutral-600 font-normal">/100</span>
                        </motion.h1>
                    </div>

                    <div className="space-y-2">
                        <p className="text-2xl text-white font-medium">
                            {getScoreLabel(result.score)}
                        </p>
                        <div className="pt-2">
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium ${getComplexityColor(result.complexity)}`}>
                                <Zap className="w-4 h-4" />
                                <span>Tech Complexity:</span>
                                <span>{result.complexity}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                            <Info className="w-4 h-4" />
                            <p>This score predicts cost of unknowns, not market success.</p>
                        </div>
                    </div>
                </div>

                {/* 2. MVP READINESS (Teaser) */}
                <div className="bg-neutral-900/40 p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6">MVP Readiness Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <ReadinessBar
                            label="Problem Clarity"
                            score={result.readiness.problem}
                            color="bg-ps-blue"
                            description="How clearly defined the user pain point is. High score = Focus on a specific, acute problem."
                        />
                        <ReadinessBar
                            label="Market Pressure"
                            score={result.readiness.market}
                            color="bg-ps-violet"
                            description="Urgency of demand. High score = 'Hair on fire' problem (Pull). Low score = Requires education (Push)."
                        />
                        <ReadinessBar
                            label="Tech Feasibility"
                            score={result.readiness.tech}
                            color="bg-green-500"
                            description="Ease of implementation. High score = Standard tech/Proven patterns. Low score = Complex R&D needed."
                        />
                        <ReadinessBar
                            label="Differentiation"
                            score={result.readiness.diff}
                            color="bg-orange-500"
                            description="Uniqueness in the market. High score = Clear 'moat' or novel approach. Low score = Commodity."
                        />
                        <ReadinessBar
                            label="Execution Risk"
                            score={result.readiness.risk}
                            color="bg-red-500"
                            description="Operational complexity. High score = Many moving parts/dependencies. Low score = Pure software build."
                        />
                    </div>
                </div>

                {/* 2.5 BLINDSPOT / UNSAID RISK */}
                {result.unsaidRisk && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-red-900/10 p-6 md:p-8 rounded-3xl border border-red-500/20 flex flex-col md:flex-row gap-6 items-start"
                    >
                        <div className="p-3 bg-red-500/10 rounded-xl text-2xl border border-red-500/20">
                            <Eye className="w-8 h-8 text-red-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-red-400 font-bold text-sm uppercase tracking-widest">The Blindspot</h3>
                            <p className="text-xl text-neutral-200 font-light leading-relaxed">
                                &quot;{result.unsaidRisk}&quot;
                            </p>
                            <p className="text-xs text-neutral-500 pt-1">
                                *This is the critical risk factor our AI detected based on your specific combination of answers.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* 3. TRADITIONAL vs REALITY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Traditional Build</h3>
                        <p className="text-4xl font-bold text-white mb-2">{result.monthsToBuild} Months</p>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            {result.traditionalBuildRationale}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-ps-blue/20 to-ps-violet/20 p-8 rounded-3xl border border-ps-blue/30">
                        <h3 className="text-ps-blue text-sm uppercase tracking-wider mb-2">Rapid MVP Build</h3>
                        <p className="text-4xl font-bold text-white mb-2">
                            {rapidWeeks} Weeks
                        </p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-neutral-300">
                                <span>AI Accelerated</span>
                                <span>{result.aiHumanMix.aiPercent}%</span>
                            </div>
                            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-ps-blue" style={{ width: `${result.aiHumanMix.aiPercent}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-neutral-300 pt-1">
                                <span>Human Expert Led</span>
                                <span>{result.aiHumanMix.humanPercent}%</span>
                            </div>
                            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-ps-violet" style={{ width: `${result.aiHumanMix.humanPercent}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. GATED SECTION (Blur Filter) */}
                <div className="relative">
                    {/* The blurred content (Teaser of deep value) */}
                    <div className="blur-sm select-none opacity-50 pointer-events-none space-y-8">

                        {/* Fake Kill List */}
                        <div className="bg-neutral-900/30 p-8 rounded-3xl border border-red-900/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Ban className="w-6 h-6 text-red-400" />
                                <h3 className="text-xl font-bold text-red-400">Scope Kill List (Excluded from Phase 1)</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="h-4 bg-neutral-800/50 rounded w-3/4"></li>
                                <li className="h-4 bg-neutral-800/50 rounded w-1/2"></li>
                                <li className="h-4 bg-neutral-800/50 rounded w-5/6"></li>
                            </ul>
                        </div>

                        {/* Fake Roadmap */}
                        <div className="bg-neutral-900/30 p-8 rounded-3xl border border-green-900/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Map className="w-6 h-6 text-green-400" />
                                <h3 className="text-xl font-bold text-green-400">{rapidWeeks}-Week Execution Plan</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="h-20 bg-neutral-800/50 rounded-xl"></div>
                                <div className="h-20 bg-neutral-800/50 rounded-xl"></div>
                            </div>
                        </div>

                    </div>

                    {/* OVERLAY: Email Capture */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                        {!emailSent ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-neutral-900 border border-neutral-700 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6"
                            >
                                <div className="w-16 h-16 bg-ps-blue/20 text-ps-blue rounded-full flex items-center justify-center mx-auto text-3xl">
                                    <Lock className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Unlock the Full Report</h3>
                                    <p className="text-neutral-400 text-sm">
                                        Get the detailed <strong>Scope Kill List</strong>, <strong>{rapidWeeks}-Week Roadmap</strong>, and <strong>Buy/Build Recommendations</strong> sent to your inbox.
                                    </p>
                                </div>

                                <form className="space-y-3" onSubmit={handleEmailSubmit}>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-center focus:ring-2 focus:ring-ps-blue outline-none text-white placeholder:text-neutral-600"
                                            required
                                            disabled={sendingEmail}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-center focus:ring-2 focus:ring-ps-blue outline-none text-white placeholder:text-neutral-600"
                                            required
                                            disabled={sendingEmail}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={sendingEmail}
                                        className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {sendingEmail ? 'Sending...' : 'Send Me The Report'}
                                    </button>
                                </form>
                                <p className="text-xs text-neutral-600">
                                    We respect your inbox. No spam, just high-signal product thinking.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-neutral-900 border border-green-900/50 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6"
                            >
                                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                                    <Check className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Report Sent!</h3>
                                    <p className="text-neutral-400 text-sm">
                                        Check your inbox for the deep dive analysis.
                                    </p>
                                </div>
                                <button
                                    onClick={() => router.push('/validate')}
                                    className="text-neutral-400 hover:text-white text-sm underline"
                                >
                                    Analyze another idea
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

function ReadinessBar({ label, score, color, description }: { label: string, score: number, color: string, description: string }) {
    return (
        <div className="space-y-3 group/tooltip relative">

            {/* Tooltip Content (appears on hover of the entire block) */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 bg-neutral-800 text-xs text-neutral-300 p-3 rounded-lg border border-neutral-700 shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-20 text-center">
                {description}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-800 border-b border-r border-neutral-700 transform rotate-45"></div>
            </div>

            <div className="flex justify-between items-end h-32 pb-2 relative group overflow-hidden bg-neutral-900/50 rounded-lg border border-white/5">
                {/* Bar */}
                <div className="w-full relative h-full flex items-end">
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`w-full ${color} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />
                </div>
                {/* Score Label (absolute centered) */}
                <span className="absolute bottom-2 left-0 w-full text-center text-xs font-bold text-white/90 drop-shadow-md">
                    {score}
                </span>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-neutral-400 group-hover/tooltip:text-neutral-200 transition-colors cursor-help">
                <p className="text-xs font-medium uppercase tracking-tight text-center">{label}</p>
                <Info className="w-3 h-3 opacity-50" />
            </div>
        </div>
    )
}

function getScoreLabel(score: number) {
    if (score >= 90) return "🦄 Venture Ready";
    if (score >= 75) return "🚀 Strong Signal";
    if (score >= 60) return "⚠️ Execution Heavy";
    if (score >= 40) return "🚧 Risky Foundation";
    return "🛑 Back to Drawing Board";
}

function getComplexityColor(complexity: string = "High") {
    const c = complexity.toLowerCase();
    if (c.includes("low")) return "bg-green-500/10 border-green-500/30 text-green-400";
    if (c.includes("medium")) return "bg-blue-500/10 border-blue-500/30 text-blue-400";
    if (c.includes("high")) return "bg-orange-500/10 border-orange-500/30 text-orange-400";
    if (c.includes("rocket")) return "bg-red-500/10 border-red-500/30 text-red-400";
    return "bg-neutral-800 border-neutral-700 text-neutral-400";
}

function LoadingScreen() {
    const [text, setText] = useState("Analyzing market impact...");

    useEffect(() => {
        const texts = [
            "Calculating technical debt risk...",
            "Identifying scope creep...",
            "Optimizing for single-flow MVP...",
            "Benchmarking against competitors...",
            "Simulating 6-week build plan..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % texts.length;
            setText(texts[i]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-ps-blue border-t-transparent rounded-full animate-spin" />
            <p className="text-ps-blue animate-pulse font-mono text-lg">{text}</p>
        </div>
    );
}

// Unused for now, but kept if needed later
function getCongratulatoryMessage(score: number) {
    if (score >= 90) return "🚀 Absolutely Legendary!";
    if (score >= 80) return "✨ Incredible Potential!";
    if (score >= 70) return "🔥 Solid Concept!";
    if (score >= 60) return "👍 Good Foundation.";
    return "💡 Interesting Start...";
}
