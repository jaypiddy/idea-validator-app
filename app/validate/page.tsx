'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import WizardLayout from '@/components/wizard/WizardLayout';
import StepProblem from '@/components/wizard/StepProblem';
import StepSolution from '@/components/wizard/StepSolution';
import StepMarket from '@/components/wizard/StepMarket';
import StepExecution from '@/components/wizard/StepExecution';
import { FormData } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';

import StepIntro from '@/components/wizard/StepIntro';

const steps = [StepIntro, StepProblem, StepSolution, StepMarket, StepExecution];

export default function ValidatePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [initialData, setInitialData] = useState<FormData | null>(null);
    const [showNoChangesModal, setShowNoChangesModal] = useState(false);

    const methods = useForm<FormData>();
    const router = useRouter();

    useEffect(() => {
        const savedData = localStorage.getItem('ideaData');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                methods.reset(parsed);
                // eslint-disable-next-line
                setInitialData(parsed); // Store what we started with
            } catch (e) {
                console.error("Failed to parse saved data", e);
            }
        }
    }, [methods]);

    const CurrentStepComponent = steps[currentStep];

    const handleNext = async () => {
        const isLastStep = currentStep === steps.length - 1;
        // Don't validate form on intro step
        const valid = currentStep === 0 ? true : await methods.trigger();

        if (valid) {
            if (isLastStep) {
                const currentData = methods.getValues();

                // Compare with initial data
                if (initialData && JSON.stringify(currentData) === JSON.stringify(initialData)) {
                    setShowNoChangesModal(true);
                    return;
                }

                // If changed (or new), save and proceed
                localStorage.setItem('ideaData', JSON.stringify(currentData));
                router.push('/report');
            } else {
                window.scrollTo(0, 0);
                setCurrentStep((prev) => prev + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <WizardLayout>
            <FormProvider {...methods}>
                {/* Progress Bar (Hidden on Intro) */}
                {currentStep > 0 && (
                    <div className="mb-8 space-y-2 animate-in fade-in duration-300">
                        <div className="flex justify-between text-xs text-neutral-400">
                            <span>Step {currentStep} of {steps.length - 1}</span>
                            <span>{Math.round(((currentStep) / (steps.length - 1)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                )}

                <Card className="mb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <CurrentStepComponent />
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex flex-col items-end mt-8 pt-8 border-t border-[rgba(255,255,255,0.10)]">
                        <div className="flex justify-between w-full">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}
                            >
                                Back
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleNext}
                                className={currentStep === 0 ? 'bg-blue-600 hover:bg-blue-500 px-8' : ''}
                            >
                                {currentStep === 0 ? 'Start MVP Analysis' : (currentStep === steps.length - 1 ? 'Analyze Idea' : 'Next Step')}
                            </Button>
                        </div>
                        {currentStep === 0 && (
                            <p className="text-xs text-neutral-500 mt-3 mr-1">
                                Takes ~5 minutes. No obligation.
                            </p>
                        )}
                    </div>
                </Card>

                {/* No Changes Modal */}
                <Modal
                    isOpen={showNoChangesModal}
                    onClose={() => setShowNoChangesModal(false)}
                    title="No Changes Detected"
                    actionLabel="Go to Report"
                    onAction={() => router.push('/report')}
                >
                    <p>It looks like you haven&apos;t changed any inputs. We won&apos;t re-run the analysis since the result will be the same.</p>
                </Modal>
            </FormProvider>
        </WizardLayout>
    );
}
