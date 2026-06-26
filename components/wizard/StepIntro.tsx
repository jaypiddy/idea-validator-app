import React from 'react';
import { ShieldCheck, Clock, AlertTriangle, FileText } from 'lucide-react';

export default function StepIntro() {
    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">Before we start&hellip;</h2>
                <p className="wiz-lead">A quick overview of what happens next and why it matters.</p>
            </div>

            <div className="wiz-intro-grid">
                {/* What's about to happen */}
                <div className="wiz-info">
                    <div className="wiz-tag pink">
                        <Clock className="w-4 h-4" />
                        <span>What&apos;s about to happen</span>
                    </div>
                    <p>
                        You&apos;ll answer a short series of questions about your problem, solution, and complexity.
                        These aren&apos;t generic prompts&mdash;they are designed to surface <b>hidden risks</b> and <b>scope inflation</b>.
                    </p>
                </div>

                {/* The Goal */}
                <div className="wiz-info">
                    <div className="wiz-tag pink">
                        <AlertTriangle className="w-4 h-4" />
                        <span>The Goal</span>
                    </div>
                    <p>
                        We use 20 years of shipping experience to give you an <b>honest signal on risk</b>, not optimism.
                        Identify where teams typically overbuild or mis-sequence.
                    </p>
                </div>
            </div>

            <div className="wiz-rule" />

            <div className="wiz-intro-grid">
                {/* Reassurance */}
                <div className="wiz-info boxed">
                    <div className="wiz-tag pink">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Your Idea is Safe</span>
                    </div>
                    <p>
                        Your idea remains 100% yours. Submissions are never treated as IP.
                        This tool exists to reduce waste, not extract concepts.
                    </p>
                </div>

                {/* Expectation */}
                <div className="wiz-info boxed">
                    <div className="wiz-tag">
                        <FileText className="w-4 h-4" />
                        <span>What You Get</span>
                    </div>
                    <ul>
                        <li>An MVP validation score</li>
                        <li>Key execution risks to watch for</li>
                        <li>Plain-English feasibility check</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
