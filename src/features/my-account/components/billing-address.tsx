import { verifySession } from '@/dal/session';
import { getCustomer } from '../api';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { countryStateOptions } from '@/utlis/countryStates';

export async function BillingAddress() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session) as { data: { user: { id: number } } };
  const user = await getCustomer(decodedSession.data.user.id);

  //check if user has  billing all properties are not empty
  const noBillingAddress = Object.values(user?.billing || {}).every((value) => value === '');

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
            {
              countryStateOptions
                .find((option) => option.key === `${user?.billing?.country}:${user?.billing?.state}`)
                ?.label.split(' — ')[1]
            }
          </p>
          <p className="text-base text-black/60">{user?.billing?.postcode}</p>
          <p className="text-base text-black/60">
            {
              countryStateOptions
                .find((option) => option.key === `${user?.billing?.country}:${user?.billing?.state}`)
                ?.label.split(' — ')[0]
            }
          </p>
        </div>
      )}
    </div>
  );
}
