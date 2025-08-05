'use client';

import { ProgressProvider } from '@bprogress/next/app';

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider height="4px" color="#ee4e23" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
}
