import { verifySession } from '@/dal/session';
import { getCustomer } from '../api';
import { jwtDecode } from 'jwt-decode';
import { ShippingAddressForm } from './shipping-address-form';
import { Customer } from '@/types/user';

export async function ShippingAddress() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session as string) as { data: { user: { id: number } } };
  const customer = await getCustomer(decodedSession.data.user.id);

  return <ShippingAddressForm customer={customer as Customer} />;
}
