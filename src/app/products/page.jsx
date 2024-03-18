import React from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

async function loadProducts() {
  // http://localhost:3000
  const { data } = await axios.get(
    "https://nextjs-mysql-crud-mu.vercel.app/api/products"
  );
  return data;
}

const ProductsPage = async () => {
  const products = await loadProducts();

  return (
    <div className="grid gap-4 grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsPage;
