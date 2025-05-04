import Axios from 'axios';

const appAxios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL
    ? process.env.NEXT_PUBLIC_WOOCOMMERCE_SITE_URL + '/wp-json'
    : '',
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
});

export default appAxios;
