'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            // Design System: Glass Canvas + Custom Radius + Soft Shadow
            className={`bg-[#101421]/72 border border-[rgba(255,255,255,0.10)] rounded-[22px] p-8 backdrop-blur-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
