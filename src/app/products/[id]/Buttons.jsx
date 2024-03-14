"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Buttons = ({ productId }) => {
  const ROUTER = useRouter();
  return (
    <div className="flex gap-x-2 justify-end mt-2">
      <button
        className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded text-white"
        onClick={async () => {
          if (confirm("are you sure you want to delete this product?")) {
            const res = await axios.delete("/api/products/" + productId);
            if (res.status === 204) {
              ROUTER.push("/products");
              ROUTER.refresh();
            }
          }
        }}
      >
        Delete
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded text-white"
        onClick={() => ROUTER.push("/products/edit/" + productId)}
      >
        Edit
      </button>
    </div>
  );
};

export default Buttons;
