import { getUser } from '@/dal/get-user';

export async function User() {
  const user = await getUser();

  return (
    <p className="mb-4 text-base text-black/60">
      Hello, <span className="font-bold">{user.name}</span>
    </p>
  );
}
