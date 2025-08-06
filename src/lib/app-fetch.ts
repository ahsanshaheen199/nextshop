export function apiFetch(url: string, config: RequestInit = {}) {
  return fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json${url}`, {
    ...config,
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(`${process.env.STIE_USERNAME}:${process.env.APPLICATION_PASSWORD}`),
      ...config.headers,
    },
  });
}

export function apiFetchWithoutAuth(url: string, config: RequestInit = {}) {
  return fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL}/wp-json${url}`, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config.headers,
    },
  });
}
