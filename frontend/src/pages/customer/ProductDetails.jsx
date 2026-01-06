import { useParams, Link, useNavigate, useOutletContext } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    stock: 12,
    image:
      "https://saltgears.com/cdn/shop/products/Rockster-01.jpg?v=1673958890",
    description:
      "Premium wireless headphones with noise cancellation and long battery life.",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 0,
    image:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg",
    description:
      "Smart watch with fitness tracking, heart rate monitoring and notifications.",
  },
  {
    id: 3,
    name: "Men T-Shirt",
    category: "Fashion",
    price: 999,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322",
    description:
      "Comfortable cotton t-shirt perfect for everyday wear.",
  },
  {
    id: 4,
    name: "Kitchen Mixer",
    category: "Home & Kitchen",
    price: 3499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description:
      "Powerful kitchen mixer for baking and cooking needs.",
  },
];


const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold">Product not found</h2>
      </div>
    );
  }

  // 🔁 Related products (same category, excluding current product)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const navigate = useNavigate();
const { cart, setCart } = useOutletContext();

const handleBuyNow = () => {
  const alreadyInCart = cart.some(item => item.id === product.id);

  if (!alreadyInCart) {
    setCart([...cart, product]);
  }

  navigate("/customer/checkout");
};

  return (
    <div className="container mx-auto px-4 py-10">

      {/* SINGLE PRODUCT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        {/* IMAGE */}
        <div className="bg-white border rounded-xl p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[380px] object-cover rounded-lg"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {product.name}
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Category: {product.category}
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-4">
            ₹{product.price}
          </p>

          <p className="mt-4 text-slate-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-red-600 font-medium">
                Out of stock
              </span>
            )}
          </div>

        <div className="mt-6 flex gap-4">
  {/* ADD TO CART */}
  <button
    disabled={product.stock === 0}
    onClick={() => setCart([...cart, product])}
    className={`px-6 py-3 rounded-lg text-sm font-medium transition
      ${
        product.stock > 0
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-slate-200 text-slate-400 cursor-not-allowed"
      }`}
  >
    Add to Cart
  </button>

  {/* BUY NOW */}
  <button
    disabled={product.stock === 0}
    onClick={handleBuyNow}
    className={`px-6 py-3 rounded-lg text-sm font-medium border transition
      ${
        product.stock > 0
          ? "border-blue-600 text-blue-600 hover:bg-blue-50"
          : "border-slate-300 text-slate-400 cursor-not-allowed"
      }`}
  >
    Buy Now
  </button>
</div>


        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link
                to={`/customer/product/${p.id}`}
                key={p.id}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <div className="h-40 bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 truncate">
                    {p.name}
                  </h3>

                  <p className="text-sm text-blue-600 font-bold mt-1">
                    ₹{p.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
