export type Download = {
  download_id: string;
  download_url: string;
  product_id: number;
  product_name: string;
  download_name: string;
  order_id: number;
  order_key: string;
  downloads_remaining: number;
  access_expires: string;
  file: {
    name: string;
    file: string;
  };
};
