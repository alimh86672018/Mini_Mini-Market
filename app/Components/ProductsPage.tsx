"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CategoriesBar from "./CategoriesBar";
import ProductsList from "./ProductsList";
import { Product } from "@/types";

const ProductsPage = ({ initialProducts }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return fetch("/api/products")
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
        });
    },
    initialData: initialProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const products = data?.products || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const categories = Array.from(
    new Set(products.map((product: Product) => product.category))
  );

  const visibleProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product: Product) => product.category === selectedCategory
        );
  return (
    <div className="max-w-6xl mx-auto">
      <CategoriesBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories as unknown as string[]}
        products={products}
      />
      <ProductsList products={visibleProducts} />
    </div>
  );
};

export default ProductsPage;
