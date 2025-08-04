export async function register(prevState: unknown, formData: FormData) {
  const username = formData.has('username') ? formData.get('username')?.toString() : '';
  const firstName = formData.has('first_name') ? formData.get('first_name')?.toString() : '';
  const lastName = formData.has('last_name') ? formData.get('last_name')?.toString() : '';
  const email = formData.has('email') ? formData.get('email')?.toString() : '';
  const password = formData.has('password') ? formData.get('password')?.toString() : '';
  const confirmPassword = formData.has('confirm_password') ? formData.get('confirm_password')?.toString() : '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json/headless/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_password: confirmPassword,
    }),
  });

  if (res.ok) {
    return { success: true };
  }

  const result = (await res.json()) as {
    message: string;
  };

  console.log(result);

  return {
    success: false,
    error: result.message,
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };
}
