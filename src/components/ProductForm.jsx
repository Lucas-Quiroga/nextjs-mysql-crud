"use client";
import React, { useRef, useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const form = useRef(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/products", product);
    console.log(res);
    form.current.reset();
  };
  return (
    <form
      className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
      ref={form}
    >
      <label
        htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2 mb"
      >
        Product Name
      </label>
      <input
        name="name"
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        placeholder="name"
        onChange={handleChange}
      />

      <label
        htmlFor="price"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Price
      </label>
      <input
        name="price"
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        placeholder="00.00"
        onChange={handleChange}
      />

      <label
        htmlFor="description"
        className="block text-gray-700 text-sm font-bold mb-2 "
      >
        Product dEscription
      </label>
      <textarea
        name="description"
        rows={3}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        placeholder="description"
        onChange={handleChange}
      />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
