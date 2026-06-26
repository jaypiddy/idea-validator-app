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
    const totalSteps = steps.length - 1;
    const pct = Math.round((currentStep / totalSteps) * 100);
    const isLastStep = currentStep === steps.length - 1;

    const handleNext = async () => {
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
                <div className="wiz-kicker">
                    <span className="eyebrow">Power Shifter · MVP Validator</span>
                </div>

                {/* Progress (hidden on intro) */}
                {currentStep > 0 && (
                    <div className="wiz-progress">
                        <div className="wiz-progress-top">
                            <span>Step {currentStep} of {totalSteps}</span>
                            <span>{pct}%</span>
                        </div>
                        <div className="wiz-track">
                            <motion.div
                                className="wiz-fill"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: currentStep / totalSteps }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>
                    </div>
                )}

                <Card>
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

                    <div className="wiz-nav">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                        >
                            ← Back
                        </Button>
                        <Button variant="primary" onClick={handleNext}>
                            {currentStep === 0 ? 'Start MVP Analysis →' : (isLastStep ? 'Analyze Idea →' : 'Next Step →')}
                        </Button>
                    </div>
                </Card>

                {currentStep === 0 && (
                    <p className="wiz-note">Takes ~5 minutes · No obligation</p>
                )}

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
