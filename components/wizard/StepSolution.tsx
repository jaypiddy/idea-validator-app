'use client';
import { useFormContext } from 'react-hook-form';

export default function StepSolution() {
    const { register } = useFormContext();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Step 2: The Solution
            </h2>
            <p className="text-gray-400">How do you solve it differently? What&apos;s your secret sauce?</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Describe your solution in one sentence.</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        The &quot;how&quot; dictates the stack. A mobile app, a web dashboard, and a chrome extension all have vastly different engineering costs and complexity profiles.
                    </p>
                    <input
                        {...register('solution', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-pink-500 outline-none"
                        placeholder="e.g. An AI-powered dashboard that auto-categorizes expenses via bank API."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">What part of this solution MUST work for the idea to survive?</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        Every MVP has a &quot;Critical Path&quot;. This is the feature we cannot cut, no matter what.
                    </p>
                    <textarea
                        {...register('solution_critical_path', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-pink-500 outline-none min-h-[80px]"
                        placeholder="e.g. The bank API connection must be reliable and secure..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Key features for the MVP?</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        Feature creep kills MVPs. We need to know the absolute &quot;must-haves&quot; to estimate the leanest possible build time.
                    </p>
                    <textarea
                        {...register('features', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-pink-500 outline-none min-h-[100px]"
                        placeholder="List 3-5 core features..."
                    />
                </div>
            </div>
        </div>
    );
}
