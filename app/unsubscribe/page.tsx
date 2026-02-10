'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

function UnsubscribeContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Unsubscribing you from the list...');

    useEffect(() => {
        if (!email) {
            setStatus('error');
            setMessage('No email address provided.');
            return;
        }

        const unsubscribe = async () => {
            try {
                const res = await fetch('/api/unsubscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                if (res.ok) {
                    setStatus('success');
                    setMessage(`You have been successfully unsubscribed from the MVP Validator list.`);
                } else {
                    const data = await res.json();
                    throw new Error(data.error || 'Failed to unsubscribe');
                }
            } catch (err: unknown) {
                console.error(err);
                const errorMsg = err instanceof Error ? err.message : 'Unknown error';
                setStatus('error');
                setMessage(errorMsg === 'Failed to unsubscribe' ? 'Something went wrong. Please try again later.' : errorMsg);
            }
        };

        unsubscribe();
    }, [email]);

    return (
        <Card className="max-w-md w-full mx-auto p-8 text-center space-y-6 bg-neutral-900 border-neutral-800">
            <div className="flex justify-center">
                {status === 'loading' && <Loader2 className="w-12 h-12 text-ps-blue animate-spin" />}
                {status === 'success' && <CheckCircle2 className="w-12 h-12 text-green-500" />}
                {status === 'error' && <XCircle className="w-12 h-12 text-red-500" />}
            </div>

            <h1 className="text-2xl font-bold text-white">
                {status === 'loading' && 'Processing...'}
                {status === 'success' && 'Unsubscribed'}
                {status === 'error' && 'Error'}
            </h1>

            <p className="text-neutral-400">
                {message}
            </p>

            {status === 'success' && (
                <p className="text-sm text-neutral-500 pt-4">
                    We&apos;re sorry to see you go. You won&apos;t receive any more emails from this specific list.
                </p>
            )}
        </Card>
    );
}

export default function UnsubscribePage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <UnsubscribeContent />
            </Suspense>
        </div>
    );
}
