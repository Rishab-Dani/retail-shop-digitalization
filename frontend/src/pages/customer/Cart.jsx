import { useOutletContext, Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useOutletContext();
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // ✅ EMPTY CART
  if (cart.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center">

        {/* ICON */}
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[48px] text-slate-400">
            shopping_cart
          </span>
        </div>

        {/* TEXT */}
        <h2 className="text-2xl font-bold mb-2">
          Your cart is empty
        </h2>

        <p className="text-slate-500 mb-8 max-w-md">
          Looks like you haven’t added anything to your cart yet.
          Start exploring products and add what you love.
        </p>

        {/* ACTION */}
        <Link
          to="/customer/products"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  // ✅ NORMAL CART
  return (
     <main className="max-w-7xl mx-auto px-4 py-8">

     {/* HEADER */}
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

        {/* LEFT — CART ITEMS */}
        <div className="lg:w-2/3 space-y-6">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg p-6 flex gap-6"
            >
              {/* IMAGE */}
              <div className="w-32 h-32 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-slate-500">{item.category}</p>

                  <div className="flex gap-3 mt-2 text-sm items-center">
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        check_circle
                      </span>
                      In Stock
                    </span>
                  </div>
                </div>

                {/* QTY */}
                <div className="flex items-center border border-slate-300 rounded-lg w-fit overflow-hidden">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>

                  <span className="w-10 text-center font-medium">
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>

              {/* PRICE */}
              <div className="text-right flex flex-col justify-between">
                <p className="text-lg font-bold">₹{item.price}</p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl p-6 sticky top-24 border border-slate-300 shadow-sm">

            <h2 className="text-xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Shipping estimate</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Tax estimate</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-slate-300 my-6"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Order Total</span>
              <span className="text-2xl font-extrabold text-blue-600">
                ₹{total.toFixed(2)}
              </span>
            </div>

            {/* COUPON */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Gift Card or Discount Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 text-sm"
                />
                <button className="px-4 py-2 rounded-lg border border-slate-300 font-medium hover:bg-slate-50">
                  Apply
                </button>
              </div>
            </div>

            {/* CHECKOUT */}
            <button
              onClick={() => navigate("/customer/checkout")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2"
            >
              Proceed to Checkout →
            </button>

            {/* SECURE */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1 text-slate-500 text-xs font-medium uppercase">
                <span className="material-symbols-outlined text-[16px]">
                  lock
                </span>
                Secure Checkout
              </div>

              <div className="flex gap-4 text-slate-400">
                <span className="material-symbols-outlined">credit_card</span>
                <span className="material-symbols-outlined">account_balance_wallet</span>
                <span className="material-symbols-outlined">payments</span>
                <span className="material-symbols-outlined">verified_user</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Cart;

