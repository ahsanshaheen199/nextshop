'use server';

import { cookies } from 'next/headers';

export async function login(prevState: unknown, formData: FormData) {
  const username = formData.has('username') ? formData.get('username')?.toString() : '';
  const password = formData.has('password') ? formData.get('password')?.toString() : '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    const data = (await res.json()) as {
      token: string;
      user_email: string;
      user_nicename: string;
      user_display_name: string;
    };
    (await cookies()).set('session', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });
    return {
      success: true,
      username: '',
      password: '',
    };
  }

  return {
    error: 'Invalid username or password',
    username,
    password,
  };
}

export async function logout() {
  (await cookies()).delete('session');
  return {
    success: true,
  };
}
