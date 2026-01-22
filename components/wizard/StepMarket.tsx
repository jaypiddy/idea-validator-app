'use client';
import { useFormContext } from 'react-hook-form';

export default function StepMarket() {
    const { register } = useFormContext();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
                Step 3: The Market
            </h2>
            <p className="text-gray-400">Who else is doing this? Why now?</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Existing Competitors</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        If competitors are 10-year-old giants, you might need feature parity to compete. If they are spreadsheets, the engineering bar is significantly lower.
                    </p>
                    <input
                        {...register('competitors', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-red-500 outline-none"
                        placeholder="e.g. Expensify, Excel, QuickBooks"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">What behavior must change for this to succeed?</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        Asking users to install a new app is hard. Asking them to switch from Excel to SaaS is harder. This friction dictates usage risk.
                    </p>
                    <textarea
                        {...register('market_behavior_change', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-red-500 outline-none min-h-[80px]"
                        placeholder="e.g. They need to stop emailing invoices and start uploading them..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Why will they switch to you?</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        If your differentiator is &quot;AI magic&quot;, that&apos;s high technical risk. If it&apos;s &quot;better UX&quot;, that&apos;s high frontend effort. We need to know where to spend the engineering tokens.
                    </p>
                    <textarea
                        {...register('market', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-red-500 outline-none min-h-[100px]"
                        placeholder="e.g. We are 10x faster because we use AI to..."
                    />
                </div>
            </div>
        </div>
    );
}
