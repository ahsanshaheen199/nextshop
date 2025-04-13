type Props = {
  currentPage: number;
  productsPerPage: number;
  total: number;
};
export const ProductCount = ({ currentPage, productsPerPage, total }: Props) => {
  const start = (currentPage - 1) * productsPerPage + 1;
  let end = currentPage * productsPerPage;
  const totalProducts = total;

  if (end > totalProducts) end = totalProducts;

  return (
    <p className="text-base text-black/60">
      {`Showing ${total === 0 ? 0 : start}-${end} of ${totalProducts} ${totalProducts > 1 ? 'Products' : 'Product'}`}
    </p>
  );
};
