import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link
      className="bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer"
      href={`/products/${product.id}`}
    >
      {product.image && (
        <img src={product.image} alt="" className="w-full rounded-t-lg" />
      )}
      <div className="p-4">
        <h1 className="text-lg font-bold text-black">{product.name}</h1>
        <h2 className="text-2xl text-slate-600">{product.price}</h2>
        <p className="text-slate-400">{product.description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
