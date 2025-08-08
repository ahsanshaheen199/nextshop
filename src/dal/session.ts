import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) {
    return null;
  }

  return session.value;
});
