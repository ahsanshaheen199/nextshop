'use server';

export async function resetPassword(prevState: unknown, formData: FormData) {
  const key = formData.has('key') ? formData.get('key')?.toString() : '';
  const login = formData.has('login') ? formData.get('login')?.toString() : '';
  const password = formData.has('password') ? formData.get('password')?.toString() : '';
  const confirmPassword = formData.has('confirm_password') ? formData.get('confirm_password')?.toString() : '';

  // Validate password match
  if (password !== confirmPassword) {
    return { error: true, message: 'Passwords do not match' };
  }

  // Validate token exists
  if (!key || !login) {
    return { error: true, message: 'Invalid or missing reset token or login' };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/headless/v1/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: key,
      password: password,
      login: login,
    }),
  });

  console.log(await res.json());

  if (res.ok) {
    return { success: true };
  }
  return { error: true, message: 'Failed to reset password' };
}
