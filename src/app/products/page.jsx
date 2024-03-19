import React from "react";
import ProductCard from "@/components/ProductCard";
import { conn } from "@/libs/mysql";

async function loadProducts() {
  const products = await conn.query("SELECT * FROM product");
  return products;
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
