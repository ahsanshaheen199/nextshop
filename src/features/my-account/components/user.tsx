import { getCustomerDetails } from '../api';
import { verifySession } from '@/dal/session';
import { jwtDecode } from 'jwt-decode';

export async function User() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session as string) as { data: { user: { id: number } } };
  const user = await getCustomerDetails(decodedSession.data.user.id);

  return (
    <p className="mb-4 text-base text-black/60">
      Hello, <span className="font-bold">{user?.username}</span>
    </p>
  );
}
