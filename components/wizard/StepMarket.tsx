'use client';
import { useFormContext } from 'react-hook-form';

export default function StepMarket() {
    const { register } = useFormContext();

    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">Step 3 &middot; The Market</h2>
                <p className="wiz-lead">Who else is doing this? Why now?</p>
            </div>

            <div className="wiz-fields">
                <div className="wiz-field">
                    <label>Existing Competitors</label>
                    <p className="wiz-hint">
                        If competitors are 10-year-old giants, you might need feature parity to compete. If they are spreadsheets, the engineering bar is significantly lower.
                    </p>
                    <input
                        {...register('competitors', { required: true })}
                        placeholder="e.g. Expensify, Excel, QuickBooks"
                    />
                </div>

                <div className="wiz-field">
                    <label>What behavior must change for this to succeed?</label>
                    <p className="wiz-hint">
                        Asking users to install a new app is hard. Asking them to switch from Excel to SaaS is harder. This friction dictates usage risk.
                    </p>
                    <textarea
                        {...register('market_behavior_change', { required: true })}
                        placeholder="e.g. They need to stop emailing invoices and start uploading them..."
                    />
                </div>

                <div className="wiz-field">
                    <label>Why will they switch to you?</label>
                    <p className="wiz-hint">
                        If your differentiator is &quot;AI magic&quot;, that&apos;s high technical risk. If it&apos;s &quot;better UX&quot;, that&apos;s high frontend effort. We need to know where to spend the engineering tokens.
                    </p>
                    <textarea
                        {...register('market', { required: true })}
                        placeholder="e.g. We are 10x faster because we use AI to..."
                    />
                </div>
            </div>
        </div>
    );
}
