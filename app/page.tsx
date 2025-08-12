"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCartCount((c) => c + 1);
    toast.success(`${product.title} added to cart!`, { autoClose: 2000 });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <header
        className="
          max-w-6xl mx-auto 
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
          mb-8
        "
      >
        {/* Logo + Site Name */}
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 rounded-md p-2">
            {/* SVG Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M3 14h18M3 6h18M3 18h18"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 select-none cursor-default">
            F/Store
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        </div>

        {/* Cart Icon with Badge */}
        <button
          type="button"
          className="relative flex items-center justify-center p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer"
          aria-label="View cart"
        >
          <FiShoppingCart className="text-white w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Products */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading products…</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority={true}
                />
              </div>
              <h3 className="text-gray-800 font-semibold line-clamp-2">
                {product.title}
              </h3>
              <p className="text-indigo-600 font-bold text-lg mt-2">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Toast notifications container */}
      <ToastContainer position="top-right" />
    </main>
  );
}