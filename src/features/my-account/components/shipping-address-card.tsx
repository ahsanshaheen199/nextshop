import { verifySession } from '@/dal/session';
import { getCustomer } from '../api';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { getCountryStates } from '@/utlis/states';
import { getCountryName } from '@/utlis/countries';

export async function ShippingAddressCard() {
  const session = await verifySession();
  const decodedSession = jwtDecode(session as string) as { data: { user: { id: number } } };
  const user = await getCustomer(decodedSession.data.user.id);

  //check if user has  shipping all properties are not empty
  const noShippingAddress = Object.values(user?.shipping || {}).every((value) => value === '');

  return (
    <div>
      <Link className="block text-right text-base text-black underline" href="/my-account/edit-address/shipping">
        {noShippingAddress ? 'Add' : 'Edit'} Shipping Address
      </Link>

      {noShippingAddress ? (
        <div>
          <p className="mt-3 text-base text-black/60">You have not set up this type of address yet.</p>
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-base text-black/60">
            {user?.shipping?.first_name} {user?.shipping?.last_name}
          </p>
          <p className="text-base text-black/60">{user?.shipping?.address_1}</p>
          <p className="text-base text-black/60">{user?.shipping?.city}</p>
          <p className="text-base text-black/60">
            {
              getCountryStates(user?.shipping?.country || '').find((state) => state.code === user?.shipping?.state)
                ?.name
            }
          </p>
          <p className="text-base text-black/60">{user?.shipping?.postcode}</p>
          <p className="text-base text-black/60">{getCountryName(user?.shipping?.country || '')}</p>
        </div>
      )}
    </div>
  );
}
