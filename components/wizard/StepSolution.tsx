'use client';
import { useFormContext } from 'react-hook-form';

export default function StepSolution() {
    const { register } = useFormContext();

    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">Step 2 &middot; The Solution</h2>
                <p className="wiz-lead">How do you solve it differently? What&apos;s your secret sauce?</p>
            </div>

            <div className="wiz-fields">
                <div className="wiz-field">
                    <label>Describe your solution in one sentence.</label>
                    <p className="wiz-hint">
                        The &quot;how&quot; dictates the stack. A mobile app, a web dashboard, and a chrome extension all have vastly different engineering costs and complexity profiles.
                    </p>
                    <input
                        {...register('solution', { required: true })}
                        placeholder="e.g. An AI-powered dashboard that auto-categorizes expenses via bank API."
                    />
                </div>

                <div className="wiz-field">
                    <label>What part of this solution MUST work for the idea to survive?</label>
                    <p className="wiz-hint">
                        Every MVP has a &quot;Critical Path&quot;. This is the feature we cannot cut, no matter what.
                    </p>
                    <textarea
                        {...register('solution_critical_path', { required: true })}
                        placeholder="e.g. The bank API connection must be reliable and secure..."
                    />
                </div>

                <div className="wiz-field">
                    <label>Key features for the MVP?</label>
                    <p className="wiz-hint">
                        Feature creep kills MVPs. We need to know the absolute &quot;must-haves&quot; to estimate the leanest possible build time.
                    </p>
                    <textarea
                        {...register('features', { required: true })}
                        placeholder="List 3-5 core features..."
                    />
                </div>
            </div>
        </div>
    );
}
