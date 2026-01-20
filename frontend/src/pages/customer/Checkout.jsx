import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Checkout = () => {
  const { cart } = useOutletContext();
  const navigate = useNavigate();

  /* ---------------- CALCULATIONS ---------------- */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  /* ---------------- REDIRECT IF CART EMPTY ---------------- */
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/customer/products");
    }
  }, [cart, navigate]);

  /* ---------------- STATE ---------------- */
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: ""
  });

  const [errors, setErrors] = useState({});

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const selectPayment = (method) => {
    setPayment(method);
    setForm(prev => ({ ...prev, paymentMethod: method }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.address) e.address = "Required";

    if (form.paymentMethod === "card") {
      if (!form.cardNumber) e.cardNumber = "Required";
      if (!form.expiry) e.expiry = "Required";
      if (!form.cvc) e.cvc = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;

    const orderData = {
      cart,
      shipping: form,
      delivery,
      payment,
      subtotal,
      tax,
      total,
      createdAt: new Date().toISOString()
    };

    navigate("/customer/order-success", {
      state: orderData
    });
  };

  /* ---------------- UI ---------------- */
  return (
    <main className="w-full max-w-[1440px] mx-auto p-4 md:px-8 lg:px-12 xl:px-20 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">

        {/* LEFT */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">

          <div>
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-slate-500">
              Please fill in your details below to complete your order.
            </p>
          </div>

          {/* SHIPPING */}
          <section className="bg-white rounded-xl border border-slate-300">
            <div className="px-6 py-4 border-b font-bold">Shipping Address</div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <input className="input" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
              <input className="input" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
              <input className="input md:col-span-2" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
              <input className="input" name="city" value={form.city} onChange={handleChange} placeholder="City" />
              <input className="input" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" />
            </div>
          </section>

          {/* DELIVERY */}
          <section className="bg-white rounded-xl border border-slate-300">
            <div className="px-6 py-4 border-b font-bold">Delivery Method</div>
            <div className="p-6 space-y-4">
              {[
                { id: "standard", label: "Standard Delivery", sub: "4–6 business days", price: "Free" },
                { id: "express", label: "Express Delivery", sub: "1–2 business days", price: "$15.00" }
              ].map(o => (
                <label key={o.id} className={`flex justify-between p-4 border rounded-lg cursor-pointer ${delivery === o.id ? "border-blue-600 bg-blue-50" : ""}`}>
                  <div className="flex gap-3">
                    <input type="radio" name="delivery" checked={delivery === o.id} onChange={() => setDelivery(o.id)} />
                    <div>
                      <p className="font-medium">{o.label}</p>
                      <p className="text-sm text-slate-500">{o.sub}</p>
                    </div>
                  </div>
                  <span className="font-bold">{o.price}</span>
                </label>
              ))}
            </div>
          </section>

          {/* PAYMENT */}
          <section className="bg-white rounded-xl border border-slate-300">
            <div className="px-6 py-4 border-b font-bold">Payment Method</div>

            <div className="grid grid-cols-2 gap-4 p-6">
              {["card", "paypal"].map(p => (
                <button
                  key={p}
                  onClick={() => selectPayment(p)}
                  className={`border rounded-lg py-3 font-medium ${payment === p ? "border-blue-600 bg-blue-50" : ""}`}
                >
                  {p === "card" ? "Credit Card" : "PayPal"}
                </button>
              ))}
            </div>

            {payment === "card" && (
              <div className="grid grid-cols-2 gap-4 px-6 pb-6">
                <input className="input col-span-2" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Card Number" />
                <input className="input" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM / YY" />
                <input className="input" name="cvc" value={form.cvc} onChange={handleChange} placeholder="CVC" />
                <input className="input col-span-2" name="nameOnCard" value={form.nameOnCard} onChange={handleChange} placeholder="Cardholder Name" />
              </div>
            )}
          </section>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
          <div className="bg-white rounded-xl border border-slate-300">
            <div className="p-6 border-b font-bold">Order Summary</div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>

              <button onClick={placeOrder} className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold">
                Place Order →
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Checkout;
