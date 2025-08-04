'use server';

export async function forgotPassword(prevState: unknown, formData: FormData) {
  const userLogin = formData.has('user_login') ? formData.get('user_login')?.toString() : '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/headless/v1/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_login: userLogin }),
  });

  if (res.ok) {
    return { success: true };
  }

  return { error: true, message: 'Failed to send reset password email' };
}
