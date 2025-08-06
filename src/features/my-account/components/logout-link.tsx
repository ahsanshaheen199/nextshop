'use client';

import { logout } from '@/features/login/actions';
import { useActionState } from 'react';

export function LogoutLink() {
  const [state, formAction, isPending] = useActionState(logout, null);
  return (
    <form className="block" action={formAction}>
      <button
        type="submit"
        className="block w-full cursor-pointer border-l-4 border-transparent px-6 py-4 text-left text-base text-black/60 hover:border-[#EBEBEB] hover:bg-[#F0F0F0]"
        disabled={isPending}
      >
        {isPending ? 'Logging out...' : 'Logout'}
      </button>
    </form>
  );
}
