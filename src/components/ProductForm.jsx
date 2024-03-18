"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [file, setFile] = useState(null);
  const router = useRouter();
  const params = useParams();
  const form = useRef(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (file) {
      formData.append("image", file);
    }
    if (!params.id) {
      await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.put("/api/products/" + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/products");
  };

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
      });
    }
  }, []);

  return (
    <div className="flex">
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
          autoFocus
          value={product.name}
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
          value={product.price}
        />

        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2 "
        >
          Product Description
        </label>
        <textarea
          name="description"
          rows={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          placeholder="description"
          onChange={handleChange}
          value={product.description}
        />
        <label
          htmlFor="productImage"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Image
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <img
            src={URL.createObjectURL(file)}
            className="w-96 my-4  object-contain mx-auto"
          />
        )}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Update" : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
