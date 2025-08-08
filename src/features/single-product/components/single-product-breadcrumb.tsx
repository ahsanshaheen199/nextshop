import { Breadcrumb } from '@/components/breadcrumb';
import { getProduct } from '../api';

export async function SingleProductBreadcrumb({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="border-t border-black/10 pt-6 pb-9">
      <Breadcrumb
        links={[
          { title: 'Home', href: '/' },
          ...product.categories.map((category) => ({ title: category.name, href: `/categories/${category.slug}` })),
          { title: product.name, href: '#' },
        ]}
      />
    </div>
  );
}
