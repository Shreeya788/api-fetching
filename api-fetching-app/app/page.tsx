"use client";
import axios from "axios";
import Image from "next/image";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: [rate: number, count: number];
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    "https://fakestoreapi.com/products"
  );

  return response.data;
};

export default async function Home() {
  const products = await fetchProducts();
  const clickHandler = () => {
    console.log("clicked");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
              width={400}
              height={400}
              priority
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-black">
                {product.title}
              </h2>
              <p className="text-black">Price: ${product.price}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={clickHandler}
              >
                view more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
