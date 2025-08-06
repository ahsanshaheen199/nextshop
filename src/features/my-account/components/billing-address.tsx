import { verifySession } from '@/dal/session';
import { getCustomer } from '../api';
import { jwtDecode } from 'jwt-decode';
import { BillingAddressForm } from './billing-address-form';
import { Customer } from '@/types/user';

export async function BillingAddress() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session) as { data: { user: { id: number } } };
  const customer = await getCustomer(decodedSession.data.user.id);

  return <BillingAddressForm customer={customer as Customer} />;
}
