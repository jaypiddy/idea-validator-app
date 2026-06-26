'use client';
import { useFormContext } from 'react-hook-form';

export default function StepExecution() {
    const { register, watch } = useFormContext();
    const isInternal = watch('projectType') === 'internal';

    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">Step 4 &middot; Execution</h2>
                <p className="wiz-lead">Ideas are cheap. Execution is everything.</p>
            </div>

            <div className="wiz-fields">
                <div className="wiz-field">
                    <label>Estimated Timeline</label>
                    <p className="wiz-hint">
                        Speed costs money. If you need it in 1 month, we have to cut scope aggressively. If you have 6 months, we can build more robustness and features.
                    </p>
                    <select {...register('timeline', { required: true })}>
                        <option value="">Select a timeline...</option>
                        <option value="1 month">1 Month</option>
                        <option value="3 months">3 Months</option>
                        <option value="6 months+">6 Months+</option>
                        <option value="No idea">No idea</option>
                    </select>
                </div>

                <div className="wiz-field">
                    <label>Rough Budget</label>
                    <p className="wiz-hint">
                        This is a reality check to match the tech stack to your runway. We can&apos;t build Netflix on a WordPress budget.
                    </p>
                    <select {...register('budget', { required: true })}>
                        <option value="">Select a budget range...</option>
                        <option value="$20k - $30k">$20k - $30k</option>
                        <option value="$30k - $50k">$30k - $50k</option>
                        <option value="$50k - $100k">$50k - $100k</option>
                        <option value="$100k - $200k">$100k - $200k</option>
                    </select>
                </div>

                <div className="wiz-field">
                    <label>
                        {isInternal
                            ? 'Who owns this after launch — and who has to sign off?'
                            : 'Who would own this internally after launch?'}
                    </label>
                    <p className="wiz-hint">
                        {isInternal
                            ? 'Ownership and approvals drive timeline risk. IT, security, and stakeholder sign-off can add weeks before a line of code ships.'
                            : 'The “Owner” determines the long-term tech debt risk. A CTO ensures maintainability. A Marketing Manager prioritizes speed.'}
                    </p>
                    <input
                        {...register('execution_owner', { required: true })}
                        placeholder={isInternal
                            ? 'e.g. Owned by IT Ops; needs security + the COO to sign off'
                            : 'e.g. Me (Non-technical Founder), A hired PM, My Co-founder (CTO)'}
                    />
                </div>
            </div>
        </div>
    );
}
