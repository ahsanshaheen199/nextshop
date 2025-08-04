import { cache } from 'react';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

export const getUser = cache(async () => {
  const session = (await cookies()).get('session');

  const user = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/wp/v2/users/me`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  if (!user.ok) {
    throw new Error('Failed to fetch user');
  }

  const userData = (await user.json()) as User;

  return {
    id: userData.id,
    name: userData.first_name + ' ' + userData.last_name,
    email: userData.email,
  };
});
