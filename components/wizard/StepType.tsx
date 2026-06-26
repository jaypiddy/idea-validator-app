'use client';
import { useFormContext } from 'react-hook-form';
import { Rocket, Building2 } from 'lucide-react';

export default function StepType() {
    const { register, watch } = useFormContext();
    const selected = watch('projectType');

    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">What are you building?</h2>
                <p className="wiz-lead">This shapes the questions — the risks that matter are different for each.</p>
            </div>

            <div className="wiz-choices">
                <label className={`wiz-choice ${selected === 'gtm' ? 'is-selected' : ''}`}>
                    <input type="radio" value="gtm" {...register('projectType', { required: true })} />
                    <Rocket className="wiz-choice-icon" />
                    <span className="wiz-choice-title">Go-to-market product</span>
                    <span className="wiz-choice-desc">
                        Customers choose whether to use it. You&apos;re competing for adoption in a market.
                    </span>
                </label>

                <label className={`wiz-choice ${selected === 'internal' ? 'is-selected' : ''}`}>
                    <input type="radio" value="internal" {...register('projectType', { required: true })} />
                    <Building2 className="wiz-choice-icon" />
                    <span className="wiz-choice-title">Internal / enterprise tool</span>
                    <span className="wiz-choice-desc">
                        A defined group is expected to use it. Risk lives in integration and adoption, not the market.
                    </span>
                </label>
            </div>
        </div>
    );
}
