import { verifySession } from '@/dal/session';
import { getCustomerDetails } from '../api';
import { jwtDecode } from 'jwt-decode';
import { CustomerAccountForm } from './customer-account-form';
import { Customer } from '@/types/user';

export async function CustomerAccount() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session as string) as { data: { user: { id: number } } };
  const customer = await getCustomerDetails(decodedSession.data.user.id);
  return <CustomerAccountForm customer={customer as Customer} />;
}
