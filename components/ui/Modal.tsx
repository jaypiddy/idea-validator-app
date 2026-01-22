'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}

export function Modal({ isOpen, onClose, title, children, actionLabel, onAction }: ModalProps) {
    if (typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 shadow-2xl pointer-events-auto"
                        >
                            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                            <div className="text-neutral-400 mb-6">
                                {children}
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button variant="secondary" onClick={onClose}>
                                    {actionLabel ? 'Cancel' : 'Close'}
                                </Button>
                                {actionLabel && onAction && (
                                    <Button variant="primary" onClick={onAction}>
                                        {actionLabel}
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
