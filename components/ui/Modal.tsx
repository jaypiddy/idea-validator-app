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
                <div className="wiz-modal">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="wiz-modal-backdrop"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="wiz-modal-card"
                    >
                        <h3>{title}</h3>
                        <div>{children}</div>
                        <div className="wiz-modal-actions">
                            <Button variant="ghost" onClick={onClose}>
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
            )}
        </AnimatePresence>,
        document.body
    );
}
