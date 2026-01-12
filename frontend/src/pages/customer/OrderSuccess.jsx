import { useOutletContext,useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

const OrderSuccess = () => {
  const { cart, setCart } = useOutletContext();
  const {state} = useLocation();
  const navigate = useNavigate();

  // Redirect if someone opens directly
useEffect(() => {
  if (!state || !cart || cart.length === 0) {
    navigate("/customer/products");
  }
}, [state, cart, navigate]);


  const orderId = useMemo(
    () => `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    []
  );

  const subtotal = cart.reduce(
    (sum, i) => sum + i.price * (i.quantity || 1),
    0
  );
  const tax = subtotal * 0.08;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  return (
    <main className="max-w-[960px] mx-auto px-6 py-12">

      {/* SUCCESS HEADER */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="size-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 ring-8 ring-blue-600/5">
          <span className="material-symbols-outlined text-4xl text-blue-600">
            check_circle
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Order Successful!
        </h1>

        <p className="text-slate-500 text-lg">
          Thank you for your purchase. We've sent a confirmation to your email.
        </p>

        <div className="mt-4 px-4 py-1 rounded-full bg-slate-100 text-xs font-semibold border">
          ORDER ID: #{orderId}
        </div>
      </div>

      {/* ORDER CARD */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        {/* DETAILS */}
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-bold mb-6">Order Details</h3>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-slate-400 uppercase border-b">
                  <th className="pb-4">Product</th>
                  <th className="pb-4 px-4">Quantity</th>
                  <th className="pb-4 text-right">Price</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {cart.map(item => (
                  <tr key={item.id}>
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="size-16 rounded-lg border overflow-hidden bg-slate-50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-slate-500">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-6 px-4 text-sm text-slate-600">
                      {item.quantity || 1}
                    </td>

                    <td className="py-6 text-right font-medium">
                      ₹{item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTALS */}
          <div className="mt-8 pt-8 border-t flex justify-end">
            <div className="w-full md:w-64 space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>Taxes (8%)</span>
                <span className="text-slate-900">
                  ₹{tax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-emerald-500 font-medium">
                  Free
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold pt-3 border-t">
                <span>Total Paid</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="bg-slate-50 border-t p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                local_shipping
              </span>
              Shipping Address
            </h4>

            <address className="not-italic text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Jonathan Miller</strong><br />
              1230 Professional Dr, Suite 400<br />
              Palo Alto, CA 94304<br />
              United States
            </address>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                event
              </span>
              Estimated Delivery
            </h4>

            <p className="text-sm text-slate-600">
              Thursday, Oct 24 – Saturday, Oct 26
            </p>

            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-blue-600">
              <span className="material-symbols-outlined text-base">
                payment
              </span>
              Visa ending in 4242
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
        <button className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 flex items-center gap-2">
          <span className="material-symbols-outlined">download</span>
          Download Receipt
        </button>

        <button
          onClick={() => {
            setCart([]);
            navigate("/customer/products");
          }}
          className="px-8 py-3.5 bg-white border rounded-lg font-bold hover:bg-slate-50 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">home</span>
          Return to Home
        </button>
      </div>

      {/* SUPPORT */}
      <p className="mt-12 text-center text-sm text-slate-500">
        Need help with your order?{" "}
        <span className="text-blue-600 font-medium underline cursor-pointer">
          Contact our Support Team
        </span>
      </p>
    </main>
  );
};

export default OrderSuccess;
