import React from "react";
import axios from "axios";
import Buttons from "./Buttons";

async function loadProduct(productId) {
  const { data } = await axios.get(
    "https://nextjs-mysql-crud-mu.vercel.app/api/products/" + productId
  );

  //"http://localhost:3000/api/products/"
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
