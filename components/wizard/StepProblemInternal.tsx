'use client';
import { useFormContext } from 'react-hook-form';

export default function StepProblemInternal() {
    const { register } = useFormContext();

    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">Step 1 &middot; The Problem</h2>
                <p className="wiz-lead">Internal tools live or die on solving a real, costly workflow. Be specific.</p>
            </div>

            <div className="wiz-fields">
                <div className="wiz-field">
                    <label>What process or workflow are you trying to fix?</label>
                    <p className="wiz-hint">
                        The shape of the workflow dictates the build. A reporting bottleneck is simple data work; multi-team coordination or real-time operations need far more complex architecture.
                    </p>
                    <textarea
                        {...register('problem', { required: true })}
                        placeholder="e.g. Finance manually reconciles expenses across 4 systems every month-end..."
                    />
                </div>

                <div className="wiz-field">
                    <label>What&apos;s it costing the business today &mdash; time, money, errors, or risk?</label>
                    <p className="wiz-hint">
                        A high-cost, high-risk process justifies more engineering investment. A minor annoyance does not &mdash; it needs a frictionless, low-complexity fix.
                    </p>
                    <textarea
                        {...register('problem_impact', { required: true })}
                        placeholder="e.g. ~40 hours/month of analyst time, plus reporting errors that delay the close..."
                    />
                </div>

                <div className="wiz-field">
                    <label>Which teams or roles will use this, and roughly how many people?</label>
                    <p className="wiz-hint">
                        A tool for 5 power users is very different from one for 500 occasional users. Scale and role shape permissions, training, and the polish bar.
                    </p>
                    <input
                        {...register('internal_users', { required: true })}
                        placeholder="e.g. The 6-person finance team + ~30 department managers who approve"
                    />
                </div>
            </div>
        </div>
    );
}
