'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) {
    // Design System: Pill shape, label typography
    const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-ps-blue/50";

    const variants = {
        // Primary: Accent Blue + Glow Shadow
        primary: "bg-[#4F8CFF] text-[#F4F6FB] hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(79,140,255,0.5),0_20px_40px_rgba(79,140,255,0.20)] shadow-[0_0_0_1px_rgba(79,140,255,0.35),0_12px_36px_rgba(79,140,255,0.10)]",
        // Secondary: Transparent + Strong Border
        secondary: "bg-transparent text-[#F4F6FB] hover:bg-white/5 border border-[rgba(255,255,255,0.18)]",
        // Ghost: Subtle hover
        ghost: "bg-transparent text-[rgba(244,246,251,0.72)] hover:text-[#F4F6FB] hover:bg-white/5"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
