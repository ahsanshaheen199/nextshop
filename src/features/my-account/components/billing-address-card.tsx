import { verifySession } from '@/dal/session';
import { getCustomer } from '../api';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { getCountryStates } from '@/utlis/states';
import { getCountryName } from '@/utlis/countries';
import { isEmpty } from '@/utlis';

export async function BillingAddressCard() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session as string) as { data: { user: { id: number } } };
  const user = await getCustomer(decodedSession.data.user.id);

  // Check if user has essential billing address fields filled
  const noBillingAddress =
    !user?.billing ||
    isEmpty(user.billing.first_name) ||
    isEmpty(user.billing.last_name) ||
    isEmpty(user.billing.address_1) ||
    isEmpty(user.billing.city) ||
    isEmpty(user.billing.postcode) ||
    isEmpty(user.billing.country) ||
    isEmpty(user.billing.state);

  return (
    <div>
      <Link className="block text-right text-base text-black underline" href="/my-account/edit-address/billing">
        {noBillingAddress ? 'Add' : 'Edit'} Billing Address
      </Link>

      {noBillingAddress ? (
        <div>
          <p className="mt-3 text-base text-black/60">You have not set up this type of address yet.</p>
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-base text-black/60">
            {user?.billing?.first_name} {user?.billing?.last_name}
          </p>
          <p className="text-base text-black/60">{user?.billing?.address_1}</p>
          <p className="text-base text-black/60">{user?.billing?.city}</p>
          <p className="text-base text-black/60">
            {getCountryStates(user?.billing?.country || '').find((state) => state.code === user?.billing?.state)?.name}
          </p>
          <p className="text-base text-black/60">{user?.billing?.postcode}</p>
          <p className="text-base text-black/60">{getCountryName(user?.billing?.country || '')}</p>
        </div>
      )}
    </div>
  );
}
