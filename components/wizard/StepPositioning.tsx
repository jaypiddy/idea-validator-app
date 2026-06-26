'use client';
import { useFormContext } from 'react-hook-form';

export default function StepPositioning() {
    const { register } = useFormContext();

    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">Step 3 &middot; Market &amp; Positioning</h2>
                <p className="wiz-lead">Who else is doing this, and why would anyone switch?</p>
            </div>

            <div className="wiz-fields">
                <div className="wiz-field">
                    <label>What do people use today instead?</label>
                    <p className="wiz-hint">
                        If the status quo is 10-year-old giants, you may need feature parity to compete. If it&apos;s spreadsheets and duct tape, the engineering bar is much lower.
                    </p>
                    <input
                        {...register('competitors', { required: true })}
                        placeholder="e.g. Expensify, QuickBooks, or just Excel and email"
                    />
                </div>

                <div className="wiz-field">
                    <label>Why will they switch to you?</label>
                    <p className="wiz-hint">
                        Your edge sets the technical risk. &quot;AI magic&quot; is high R&amp;D risk; &quot;far better UX&quot; is heavy frontend effort; &quot;cheaper&quot; is a margin question. We need to know where to spend the build.
                    </p>
                    <textarea
                        {...register('differentiation', { required: true })}
                        placeholder="e.g. We auto-categorize via bank API, so it's 10x faster with zero manual entry"
                    />
                </div>

                <div className="wiz-field">
                    <label>What behavior has to change for them to adopt it?</label>
                    <p className="wiz-hint">
                        Installing a new app is hard. Switching off a tool a team already trusts is harder. This friction is your biggest usage risk.
                    </p>
                    <textarea
                        {...register('behavior_change', { required: true })}
                        placeholder="e.g. They need to stop emailing invoices and start uploading them..."
                    />
                </div>
            </div>
        </div>
    );
}
