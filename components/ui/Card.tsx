'use client';

import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
    return (
        <div className={`wiz-card ${className}`} {...props}>
            {children}
        </div>
    );
}
