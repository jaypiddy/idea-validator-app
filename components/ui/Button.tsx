'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'btn paper',
        secondary: 'btn ghost',
        ghost: 'btn ghost',
    };

    return (
        <button className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}
