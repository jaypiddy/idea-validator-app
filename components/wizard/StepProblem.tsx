'use client';
import { useFormContext } from 'react-hook-form';

export default function StepProblem() {
    const { register } = useFormContext();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ps-blue to-ps-violet">
                Step 1: The Problem
            </h2>
            <p className="text-gray-400">Every great product starts with a painful problem. Be specific.</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">What specific problem are you solving?</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        We ask this because technical complexity often hides in the details. A simple data problem allows for simple tech, while real-time coordination or heavy processing requires complex architectures.
                    </p>
                    <textarea
                        {...register('problem', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-purple-500 outline-none min-h-[100px]"
                        placeholder="e.g. Freelancers struggle to track expenses across multiple accounts..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">What happens if this problem remains unsolved for 12 months?</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        High-pain problems justify higher technical risk. Low-pain problems require frictionless, low-complexity solutions.
                    </p>
                    <textarea
                        {...register('problem_impact', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-purple-500 outline-none min-h-[80px]"
                        placeholder="e.g. They lose thousands in taxes or spend weekends manually entering data..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Who is experiencing this pain most acutely?</label>
                    <p className="text-xs text-neutral-400 mb-2">
                        Enterprise users often demand rigid security (SSO, Audit Logs) and legacy compatibility, whereas consumer apps prioritize extreme design polish and instant scalability.
                    </p>
                    <input
                        {...register('audience', { required: true })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded p-3 focus:ring-2 focus:ring-ps-blue outline-none"
                        placeholder="e.g. Remote creative agencies with 5-10 employees"
                    />
                </div>
            </div>
        </div>
    );
}
