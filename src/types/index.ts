export type Menu = {
  id: number;
  slug: string;
  status: 'publish' | 'draft';
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export type SiteSettings = {
  title: string;
};

export type Params<T> = Promise<T>;

export type SearchParams = { [key: string]: string | string[] | undefined };
