'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import WizardLayout from '@/components/wizard/WizardLayout';
import StepIntro from '@/components/wizard/StepIntro';
import StepType from '@/components/wizard/StepType';
import StepProblem from '@/components/wizard/StepProblem';
import StepProblemInternal from '@/components/wizard/StepProblemInternal';
import StepSolution from '@/components/wizard/StepSolution';
import StepPositioning from '@/components/wizard/StepPositioning';
import StepSystems from '@/components/wizard/StepSystems';
import StepExecution from '@/components/wizard/StepExecution';
import { FormData } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';

// Each flow is intro + type picker + 4 content steps. Only the 4 content
// steps differ between go-to-market and internal builds.
const gtmFlow = [StepProblem, StepSolution, StepPositioning, StepExecution];
const internalFlow = [StepProblemInternal, StepSolution, StepSystems, StepExecution];
const CONTENT_STEPS = 4;

function buildSteps(projectType: string | undefined) {
    if (projectType === 'internal') return [StepIntro, StepType, ...internalFlow];
    if (projectType === 'gtm') return [StepIntro, StepType, ...gtmFlow];
    return [StepIntro, StepType]; // before a type is chosen
}

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

    const projectType = methods.watch('projectType');
    const steps = buildSteps(projectType);
    const CurrentStepComponent = steps[currentStep];
    // Only a chosen flow can have a "last" step — guards the type picker (step 1)
    // from showing the Analyze label before a project type is selected.
    const isLastStep = Boolean(projectType) && currentStep === steps.length - 1;

    // Progress only covers the 4 content steps (intro + type picker are setup).
    const showProgress = currentStep >= 2;
    const contentStep = currentStep - 1; // step 2 => 1 ... step 5 => 4
    const pct = Math.round((contentStep / CONTENT_STEPS) * 100);

    const handleNext = async () => {
        // Intro has no fields to validate.
        if (currentStep === 0) {
            window.scrollTo(0, 0);
            setCurrentStep(1);
            return;
        }

        // Validate the fields rendered so far (incl. the required project type).
        const valid = await methods.trigger();
        if (!valid) return;

        // Recompute the flow from the freshly-validated value to avoid stale state.
        const pt = methods.getValues('projectType');
        const effectiveSteps = buildSteps(pt);
        const atLastStep = currentStep >= effectiveSteps.length - 1;

        if (atLastStep) {
            const currentData = methods.getValues();
            if (initialData && JSON.stringify(currentData) === JSON.stringify(initialData)) {
                setShowNoChangesModal(true);
                return;
            }
            localStorage.setItem('ideaData', JSON.stringify(currentData));
            router.push('/report');
        } else {
            window.scrollTo(0, 0);
            setCurrentStep((prev) => prev + 1);
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

                {/* Progress (content steps only) */}
                {showProgress && (
                    <div className="wiz-progress">
                        <div className="wiz-progress-top">
                            <span>Step {contentStep} of {CONTENT_STEPS}</span>
                            <span>{pct}%</span>
                        </div>
                        <div className="wiz-track">
                            <motion.div
                                className="wiz-fill"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: contentStep / CONTENT_STEPS }}
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
