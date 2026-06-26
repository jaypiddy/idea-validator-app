'use client';
import { useFormContext } from 'react-hook-form';

export default function StepProblem() {
    const { register } = useFormContext();

    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">Step 1 &middot; The Problem</h2>
                <p className="wiz-lead">Every great product starts with a painful problem. Be specific.</p>
            </div>

            <div className="wiz-fields">
                <div className="wiz-field">
                    <label>What specific problem are you solving?</label>
                    <p className="wiz-hint">
                        We ask this because technical complexity often hides in the details. A simple data problem allows for simple tech, while real-time coordination or heavy processing requires complex architectures.
                    </p>
                    <textarea
                        {...register('problem', { required: true })}
                        placeholder="e.g. Freelancers struggle to track expenses across multiple accounts..."
                    />
                </div>

                <div className="wiz-field">
                    <label>What happens if this problem remains unsolved for 12 months?</label>
                    <p className="wiz-hint">
                        High-pain problems justify higher technical risk. Low-pain problems require frictionless, low-complexity solutions.
                    </p>
                    <textarea
                        {...register('problem_impact', { required: true })}
                        placeholder="e.g. They lose thousands in taxes or spend weekends manually entering data..."
                    />
                </div>

                <div className="wiz-field">
                    <label>Who is experiencing this pain most acutely?</label>
                    <p className="wiz-hint">
                        Enterprise users often demand rigid security (SSO, Audit Logs) and legacy compatibility, whereas consumer apps prioritize extreme design polish and instant scalability.
                    </p>
                    <input
                        {...register('audience', { required: true })}
                        placeholder="e.g. Remote creative agencies with 5-10 employees"
                    />
                </div>
            </div>
        </div>
    );
}
