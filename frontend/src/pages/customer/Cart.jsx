import { useOutletContext, Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useOutletContext();

  // quantity update
  const updateQty = (id, qty) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, qty) } : item
    ));
  };

  // remove item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">
          Shopping Cart{" "}
          <span className="text-lg font-medium text-slate-500">
            ({cart.length} items)
          </span>
        </h1>

        <Link
          to="/customer/products"
          className="text-blue-600 font-medium flex items-center gap-2"
        >
          ← Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT – CART ITEMS */}
        <div className="lg:w-2/3 space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl border p-6 flex gap-6"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />

              {/* INFO */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-slate-500">
                      {item.category}
                    </p>
                  </div>
                  <span className="font-bold text-lg">
                    ₹{item.price}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {/* QTY */}
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-3 py-1"
                    >
                      −
                    </button>
                    <span className="px-4 font-medium">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="lg:w-1/3">
          <div className="bg-white border rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t my-6"></div>

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-blue-600">
                ₹{total.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition">
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
