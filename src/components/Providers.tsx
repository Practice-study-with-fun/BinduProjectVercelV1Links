'use client';

import React from 'react';
import { LinksProvider } from '../contexts/LinksContext';
import { ThemeProvider } from '../contexts/ThemeContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <LinksProvider>
        {children}
      </LinksProvider>
    </ThemeProvider>
  );
}