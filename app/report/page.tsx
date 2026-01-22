'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { AnalysisResult } from '@/lib/types';

export default function ReportPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState('');

    // Email Gating State
    const [email, setEmail] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    async function handleEmailSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSendingEmail(true);

        try {
            const res = await fetch('/api/send-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, report: result }),
            });

            if (!res.ok) throw new Error('Failed to send email');

            setEmailSent(true);
        } catch (err) {
            console.error(err);
            alert('Failed to send email. Check console.');
        } finally {
            setSendingEmail(false);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const dataStr = localStorage.getItem('ideaData');
            if (!dataStr) {
                router.push('/validate');
                return;
            }

            try {
                // Check cache first
                const cacheStr = localStorage.getItem('lastAnalysis');
                if (cacheStr) {
                    const cache = JSON.parse(cacheStr);
                    // Compare current inputs (dataStr) with cached inputs
                    // We simply compare the strings since they are both stringified JSON of the same shape
                    if (cache.inputs === dataStr) {
                        console.log("Using cached analysis result");
                        setResult(cache.result);
                        setLoading(false);
                        return;
                    }
                }

                const data = JSON.parse(dataStr);
                const res = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!res.ok) throw new Error('Analysis failed');

                const json = await res.json();
                setResult(json);

                // Save to cache
                localStorage.setItem('lastAnalysis', JSON.stringify({
                    inputs: dataStr,
                    result: json
                }));

            } catch (err) {
                console.error(err);
                setError('Failed to analyze your idea. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [router]);

    if (loading) return <LoadingScreen />;
    if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;
    if (!result) return null;

    const rapidWeeks = Math.max(2, Math.ceil(result.monthsToBuild));

    return (
        <div className="min-h-screen p-6 md:p-12 relative overflow-x-hidden">
            <button
                onClick={() => router.push('/validate')}
                className="fixed top-6 left-6 text-sm text-neutral-400 hover:text-white flex items-center gap-2 transition-colors z-50 bg-neutral-900/50 backdrop-blur px-4 py-2 rounded-full border border-neutral-800"
            >
                ← Edit Inputs
            </button>

            <div className="max-w-4xl mx-auto space-y-16">

                {/* 1. HERO SECTION: Score & Interpretation */}
                <div className="text-center space-y-6 pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-medium text-blue-400 mb-2 tracking-wide uppercase">
                            Analysis Complete
                        </h2>
                    </motion.div>

                    <div className="relative inline-block">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 tracking-tighter"
                        >
                            {result.score}
                            <span className="text-4xl text-neutral-600 font-normal">/100</span>
                        </motion.h1>
                    </div>

                    <div className="space-y-2">
                        <p className="text-2xl text-white font-medium">
                            {getScoreLabel(result.score)}
                        </p>
                        <div className="pt-2">
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium ${getComplexityColor(result.complexity)}`}>
                                <span>⚡ Tech Complexity:</span>
                                <span>{result.complexity}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                            <span>ℹ️</span>
                            <p>This score predicts cost of unknowns, not market success.</p>
                        </div>
                    </div>
                </div>

                {/* 2. MVP READINESS (Teaser) */}
                <div className="bg-neutral-900/40 p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6">MVP Readiness Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <ReadinessBar label="Problem Clarity" score={result.readiness.problem} color="bg-blue-500" />
                        <ReadinessBar label="Market Pressure" score={result.readiness.market} color="bg-purple-500" />
                        <ReadinessBar label="Tech Feasibility" score={result.readiness.tech} color="bg-green-500" />
                        <ReadinessBar label="Differentiation" score={result.readiness.diff} color="bg-orange-500" />
                        <ReadinessBar label="Execution Risk" score={result.readiness.risk} color="bg-red-500" />
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
                            👁️
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

                    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-3xl border border-blue-500/30">
                        <h3 className="text-blue-400 text-sm uppercase tracking-wider mb-2">Rapid MVP Build</h3>
                        <p className="text-4xl font-bold text-white mb-2">
                            {rapidWeeks} Weeks
                        </p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-neutral-300">
                                <span>AI Accelerated</span>
                                <span>{result.aiHumanMix.aiPercent}%</span>
                            </div>
                            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${result.aiHumanMix.aiPercent}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-neutral-300 pt-1">
                                <span>Human Expert Led</span>
                                <span>{result.aiHumanMix.humanPercent}%</span>
                            </div>
                            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${result.aiHumanMix.humanPercent}%` }} />
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
                            <h3 className="text-xl font-bold text-red-400 mb-4">🚫 Scope Kill List (Excluded from Phase 1)</h3>
                            <ul className="space-y-3">
                                <li className="h-4 bg-neutral-800/50 rounded w-3/4"></li>
                                <li className="h-4 bg-neutral-800/50 rounded w-1/2"></li>
                                <li className="h-4 bg-neutral-800/50 rounded w-5/6"></li>
                            </ul>
                        </div>

                        {/* Fake Roadmap */}
                        <div className="bg-neutral-900/30 p-8 rounded-3xl border border-green-900/20">
                            <h3 className="text-xl font-bold text-green-400 mb-4">🗺️ {rapidWeeks}-Week Execution Plan</h3>
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
                                <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                                    🔒
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Unlock the Full Report</h3>
                                    <p className="text-neutral-400 text-sm">
                                        Get the detailed <strong>Scope Kill List</strong>, <strong>{rapidWeeks}-Week Roadmap</strong>, and <strong>Buy/Build Recommendations</strong> sent to your inbox.
                                    </p>
                                </div>

                                <form className="space-y-3" onSubmit={handleEmailSubmit}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-center focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder:text-neutral-600"
                                        required
                                        disabled={sendingEmail}
                                    />
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
                                    ✓
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

function ReadinessBar({ label, score, color }: { label: string, score: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end h-32 pb-2 relative group">
                {/* Bar */}
                <div className="w-full bg-neutral-800 rounded-t-lg relative h-full flex items-end overflow-hidden">
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`w-full ${color} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />
                </div>
                {/* Score Label (absolute centered) */}
                <span className="absolute bottom-2 left-0 w-full text-center text-xs font-bold text-black/50 mix-blend-overlay">
                    {score}
                </span>
            </div>
            <p className="text-xs text-center text-neutral-400 font-medium uppercase tracking-tight">{label}</p>
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
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-400 animate-pulse font-mono text-lg">{text}</p>
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
