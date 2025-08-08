import { getProduct } from '../api';

export async function ProductShortDescription({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: product.short_description }}
      className="border-b border-black/10 pb-6 [&_p]:font-satoshi [&_p]:text-sm [&_p]:leading-[1.43] [&_p]:text-black/60 [&_p]:lg:text-base [&_p]:lg:leading-[1.38]"
    />
  );
}
