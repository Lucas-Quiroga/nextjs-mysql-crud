import React from "react";
import Buttons from "./Buttons";
import { conn } from "@/libs/mysql";

async function loadProduct(productId) {
  const [data] = await conn.query("SELECT * FROM product WHERE id = ?", [
    productId,
  ]);
  return data;
}

const ProductPage = async ({ params }) => {
  const product = await loadProduct(params.id);
  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 h-2/6 justify-center">
        <div className="p-6 bg-white text-black w-1/3">
          <p className="text-2xl font-bold mb-3">Name: {product.name}</p>
          <p className="text-4xl font-bold">Price: {product.price}</p>
          <p className="text-slate-700">Description: {product.description}</p>
          im
          <Buttons productId={product.id} />
        </div>
        <img src={product.image} className="w-1/3" alt="" />
      </div>
    </section>
  );
};

export default ProductPage;
