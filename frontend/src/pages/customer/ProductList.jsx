const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Grocery",
  "Home & Kitchen",
];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    stock: 12,
    image:
      "https://saltgears.com/cdn/shop/products/Rockster-01.jpg?v=1673958890",
     
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 0,
    image:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Men T-Shirt",
    category: "Fashion",
    price: 999,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    id: 4,
    name: "Kitchen Mixer",
    category: "Home & Kitchen",
    price: 3499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    stock: 12,
    image:
      "https://saltgears.com/cdn/shop/products/Rockster-01.jpg?v=1673958890",
     
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 0,
    image:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Men T-Shirt",
    category: "Fashion",
    price: 999,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    id: 4,
    name: "Kitchen Mixer",
    category: "Home & Kitchen",
    price: 3499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    stock: 12,
    image:
      "https://saltgears.com/cdn/shop/products/Rockster-01.jpg?v=1673958890",
     
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 0,
    image:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Men T-Shirt",
    category: "Fashion",
    price: 999,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    id: 4,
    name: "Kitchen Mixer",
    category: "Home & Kitchen",
    price: 3499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    stock: 12,
    image:
      "https://saltgears.com/cdn/shop/products/Rockster-01.jpg?v=1673958890",
     
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 0,
    image:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Men T-Shirt",
    category: "Fashion",
    price: 999,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    id: 4,
    name: "Kitchen Mixer",
    category: "Home & Kitchen",
    price: 3499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    stock: 12,
    image:
      "https://saltgears.com/cdn/shop/products/Rockster-01.jpg?v=1673958890",
     
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 0,
    image:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Men T-Shirt",
    category: "Fashion",
    price: 999,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    id: 4,
    name: "Kitchen Mixer",
    category: "Home & Kitchen",
    price: 3499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    stock: 12,
    image:
      "https://saltgears.com/cdn/shop/products/Rockster-01.jpg?v=1673958890",
     
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 0,
    image:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Men T-Shirt",
    category: "Fashion",
    price: 999,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    id: 4,
    name: "Kitchen Mixer",
    category: "Home & Kitchen",
    price: 3499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    stock: 12,
    image:
      "https://saltgears.com/cdn/shop/products/Rockster-01.jpg?v=1673958890",
     
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 0,
    image:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Men T-Shirt",
    category: "Fashion",
    price: 999,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    id: 4,
    name: "Kitchen Mixer",
    category: "Home & Kitchen",
    price: 3499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
];

export default function MainProductSection() {
  return (
    <main className="container mx-auto px-4 py-8 flex-1">

      {/* TITLE + SEARCH */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Products
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing latest products
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
            placeholder="Search products..."
          />
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="sticky top-16 z-40 mb-8">
      <div className="bg-white/90 backdrop-blur p-4 rounded-xl border border-slate-200 mb-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6">

        {/* CATEGORIES */}
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
            Categories:
          </span>
          {categories.map((cat, index) => (
            <button
              key={cat}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition
                ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRICE + STOCK */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">
              Price:
            </span>
            <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-lg">
              <input type="range" className="w-28" />
              <span className="text-xs font-bold text-blue-600">
                Max: ₹3,000
              </span>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" />
            In Stock Only
          </label>
        </div>
      </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition"
          >
            {/* IMAGE */}
            <div className="relative h-48 bg-slate-100">
              <img
                src={p.image}
                alt={p.name}
                className={`w-full h-full object-cover ${
                  p.stock === 0 ? "grayscale" : ""
                }`}
              />

              {p.stock === 0 && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="p-4 flex flex-col">
              <h3 className="font-bold text-slate-900 truncate">
                {p.name}
              </h3>

              <p className="text-xs text-slate-500 uppercase mt-1">
                Category: {p.category}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-blue-600">
                  ₹{p.price}
                </span>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    p.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.stock > 0
                    ? `${p.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              <button
                disabled={p.stock === 0}
                className={`mt-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    p.stock > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}