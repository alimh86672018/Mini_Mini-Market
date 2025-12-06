import ProductCard from "./ProductCard";
import { Product } from "@/types";

const ProductsList = ({ products }: { products: Product[] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">محصولی وجود ندارد.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
