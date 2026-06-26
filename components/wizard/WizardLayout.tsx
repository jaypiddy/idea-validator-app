'use client';
import { ReactNode } from 'react';

export default function Wizard({ children }: { children: ReactNode }) {
  return (
    <div className="wiz-main">
      <div className="wiz-shell">
        {children}
      </div>
    </div>
  );
}
