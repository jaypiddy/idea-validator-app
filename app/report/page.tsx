'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { AnalysisResult } from '@/lib/types';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import confetti from 'canvas-confetti';

import { Lock, Check, ArrowLeft } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

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
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FD2E90', '#121315', '#FAFAF7'] });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#FD2E90', '#121315', '#FAFAF7'] });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [result, loading]);

    if (loading) return <LoadingScreen />;
    if (error) return (
        <div className="rep-loading">
            <p className="rep-loading-text" style={{ color: 'var(--magenta)' }}>{error}</p>
        </div>
    );
    if (!result) return null;

    // Readiness dimensions are reframed for internal/enterprise builds.
    let projectType = 'gtm';
    try { if (ideaData) projectType = JSON.parse(ideaData).projectType || 'gtm'; } catch { /* default gtm */ }
    const readinessLabels = projectType === 'internal'
        ? { market: 'Adoption pressure', tech: 'Integration feasibility', diff: 'Process fit' }
        : { market: 'Market pressure', tech: 'Tech feasibility', diff: 'Differentiation' };

    return (
        <div className="rep-main">
            <div className="rep-shell">
                <button onClick={() => router.push('/validate')} className="rep-back">
                    <ArrowLeft className="w-4 h-4" /> Edit inputs
                </button>

                {/* Score hero */}
                <div className="rep-hero">
                    <motion.p
                        className="rep-eyebrow"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                    >
                        Analysis complete
                    </motion.p>
                    <motion.div
                        className="rep-score"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
                    >
                        <AnimatedNumber value={result.score} /><span className="out">/100</span>
                    </motion.div>
                    <p className="rep-verdict-label">{getScoreLabel(result.score)}</p>
                    <div className="rep-meta">
                        <span className="rep-chip pink">Tech complexity · {result.complexity}</span>
                        <span className="rep-note">This score predicts cost of unknowns, not market success.</span>
                    </div>
                </div>

                <div className="rep-sections">

                    {/* MVP Readiness */}
                    <section className="rep-card">
                        <p className="rep-card-kicker">Signal breakdown</p>
                        <h3 className="rep-card-h">MVP Readiness</h3>
                        <div className="rep-metrics">
                            <Metric label="Problem clarity" score={result.readiness.problem} />
                            <Metric label={readinessLabels.market} score={result.readiness.market} />
                            <Metric label={readinessLabels.tech} score={result.readiness.tech} />
                            <Metric label={readinessLabels.diff} score={result.readiness.diff} />
                            <Metric label="Execution risk" score={result.readiness.risk} />
                        </div>
                    </section>

                    {/* Blindspot / unsaid risk */}
                    {result.unsaidRisk && (
                        <section className="rep-card">
                            <p className="rep-card-kicker">The blindspot</p>
                            <p className="rep-quote">&ldquo;{result.unsaidRisk}&rdquo;</p>
                            <p className="rep-body" style={{ marginTop: 16 }}>
                                The critical non-technical risk our analysis surfaced from your specific combination of answers.
                            </p>
                        </section>
                    )}

                    {/* Traditional vs Rapid */}
                    <div className="rep-grid-2">
                        <section className="rep-card paper">
                            <p className="rep-card-kicker">Traditional build</p>
                            <p className="rep-big">{result.monthsToBuild} Months</p>
                            <p className="rep-body">{result.traditionalBuildRationale}</p>
                        </section>
                        <section className="rep-card">
                            <p className="rep-card-kicker">Rapid MVP build</p>
                            <p className="rep-big">{rapidWeeks} Weeks</p>
                            <div className="rep-metrics" style={{ marginTop: 18 }}>
                                <Metric label="AI accelerated" score={result.aiHumanMix.aiPercent} />
                                <Metric label="Human expert led" score={result.aiHumanMix.humanPercent} />
                            </div>
                        </section>
                    </div>

                    {/* Gated deep-dive */}
                    <div className="rep-gate-wrap">
                        <div className="rep-gate-blur">
                            <section className="rep-card paper">
                                <p className="rep-card-kicker">Scope kill list — excluded from phase 1</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
                                    <div className="rep-skel" style={{ width: '75%' }} />
                                    <div className="rep-skel" style={{ width: '52%' }} />
                                    <div className="rep-skel" style={{ width: '84%' }} />
                                </div>
                            </section>
                            <section className="rep-card paper">
                                <p className="rep-card-kicker">{rapidWeeks}-week execution plan</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
                                    <div className="rep-skel" style={{ height: 64 }} />
                                    <div className="rep-skel" style={{ height: 64 }} />
                                </div>
                            </section>
                        </div>

                        <div className="rep-gate">
                            {!emailSent ? (
                                <motion.div
                                    className="rep-gate-card"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                >
                                    <div className="rep-gate-icon"><Lock className="w-6 h-6" /></div>
                                    <h3 className="rep-gate-h">Unlock the full report</h3>
                                    <p className="rep-gate-p">
                                        Get the detailed <b>Scope Kill List</b>, <b>{rapidWeeks}-week roadmap</b>, and <b>Buy/Build recommendations</b> sent to your inbox.
                                    </p>
                                    <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <input
                                            className="rep-input"
                                            type="text"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            disabled={sendingEmail}
                                        />
                                        <input
                                            className="rep-input"
                                            type="email"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={sendingEmail}
                                        />
                                        <button className="rep-submit" type="submit" disabled={sendingEmail}>
                                            {sendingEmail ? 'Sending…' : 'Send me the report →'}
                                        </button>
                                    </form>
                                    <p className="rep-fineprint">No spam. Just high-signal product thinking.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="rep-gate-card"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                >
                                    <div className="rep-gate-icon"><Check className="w-6 h-6" /></div>
                                    <h3 className="rep-gate-h">Report sent</h3>
                                    <p className="rep-gate-p">Check your inbox for the deep-dive analysis.</p>
                                    <button className="rep-textlink" onClick={() => router.push('/validate')}>
                                        Analyze another idea
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function Metric({ label, score }: { label: string; score: number }) {
    return (
        <div>
            <div className="rep-metric-top">
                <span className="rep-metric-label">{label}</span>
                <span className="rep-metric-val">{score}</span>
            </div>
            <div className="rep-bar-track">
                <motion.div
                    className="rep-bar-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: Math.max(0, Math.min(100, score)) / 100 }}
                    transition={{ duration: 0.9, ease: EASE }}
                />
            </div>
        </div>
    );
}

function getScoreLabel(score: number) {
    if (score >= 90) return "Venture Ready";
    if (score >= 75) return "Strong Signal";
    if (score >= 60) return "Execution Heavy";
    if (score >= 40) return "Risky Foundation";
    return "Back to the Drawing Board";
}

function LoadingScreen() {
    const [text, setText] = useState("Analyzing market impact…");

    useEffect(() => {
        const texts = [
            "Calculating technical debt risk…",
            "Identifying scope creep…",
            "Optimizing for single-flow MVP…",
            "Benchmarking against competitors…",
            "Simulating 6-week build plan…"
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % texts.length;
            setText(texts[i]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rep-loading">
            <div className="rep-spinner" />
            <p className="rep-loading-text">{text}</p>
        </div>
    );
}
