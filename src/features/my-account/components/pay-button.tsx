'use client';

import { Button } from '@/components/form/button';

export function PayButton({ payment_url, className }: { payment_url: string; className?: string }) {
  return (
    <Button
      onClick={() => {
        window.location.href = payment_url;
      }}
      className={className}
    >
      Pay Now
    </Button>
  );
}
