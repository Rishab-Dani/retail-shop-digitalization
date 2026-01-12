import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Checkout = () => {
  const { cart } = useOutletContext();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
  (sum, item) => sum + item.price * (item.quantity || 1),
  0
);

const tax = subtotal * 0.08;
const total = subtotal + tax;

 useEffect(()=> {

if (cart.length === 0) {
    navigate("/customer/products");
  }
 },[cart, navigate]) 

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

  console.log("ORDER DATA", {
    cart,
    shipping: form,
    total
  });

  navigate("/customer/order-success");
};

   const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");


  return (
    <main className="w-full max-w-[1440px] mx-auto p-4 md:px-8 lg:px-12 xl:px-20 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">

          {/* INTRO */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-slate-500">
              Please fill in your details below to complete your order.
            </p>
          </div>

          {/* SHIPPING ADDRESS */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b">
              <div className="size-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <h3 className="text-lg font-bold">Shipping Address</h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <input className="input" placeholder="First Name" />
              <input className="input" placeholder="Last Name" />
              <input className="input md:col-span-2" placeholder="Address" />
              <input className="input" placeholder="City" />
              <input className="input" placeholder="Postal Code" />
              <select className="input md:col-span-2">
                <option>United States</option>
                <option>India</option>
                <option>Canada</option>
              </select>
            </div>
          </section>

         
           {/* DELIVERY */}
        <section className="bg-white rounded-xl py-3 shadow-sm border overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-2 border-b">
           <div className="size-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined">location_on</span>
              </div>
          <h3 className="font-bold mb-4">Delivery Method</h3>
          </div>
       <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
           {[
            { id: "standard", label: "Standard Delivery", sub: "4–6 business days", price: "Free" },
            { id: "express", label: "Express Delivery", sub: "1–2 business days", price: "$15.00" }
          ].map(o => (
            <label key={o.id}
              className={`flex items-center justify-between border rounded-lg p-4 mb-6 cursor-pointer
              ${delivery === o.id ? "border-blue-600 bg-blue-50" : ""}`}>
              <div className="flex gap-3">
                <input
                  type="radio"
                  checked={delivery === o.id}
                  onChange={() => setDelivery(o.id)}
                />
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
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">Payment Details</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
             {["card", "paypal"].map(p => (
              <button
                key={p}
                onClick={() => setPayment(p)}
                className={`border rounded-lg py-3 font-medium
                ${payment === p ? "border-blue-600 bg-blue-50" : ""}`}>
                {p === "card" ? "Credit Card" : "PayPal"}
              </button>
            ))}
          </div>

          {payment === "card" && (
            <div className="grid grid-cols-2 gap-4">
              <input className="input col-span-2" placeholder="Card Number" />
              <input className="input" placeholder="MM / YY" />
              <input className="input" placeholder="CVC" />
              <input className="input col-span-2" placeholder="Cardholder Name" />
            </div>

             
          )}
            <label className="flex items-center gap-2 text-sm text-slate-500">
                <input type="checkbox" />
                Save card securely for future purchases
              </label>
        </section>
        </div>

        {/* RIGHT COLUMN – ORDER SUMMARY */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
            <div className="p-6 border-b bg-slate-50">
              <h3 className="text-lg font-bold">Order Summary</h3>
            </div>

            {/* CART ITEMS */}
            <div className="space-y-6 mb-8 max-h-[320px] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden border relative">
                    <img src={item.image} className="w-full h-full object-cover" />
                    <span className="absolute top-0 right-0 bg-slate-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl">
                      x{item.quantity || 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-slate-500">
                      {item.variant?.color} {item.variant?.size && `/ ${item.variant.size}`}
                    </p>
                    <p className="font-bold">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>


            <div className="p-6 space-y-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">$348.00</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Taxes</span>
                <span>$16.00</span>
              </div>

              <div className="flex justify-between items-end pt-6 mb-8">
                <span className="text-base font-bold">Total</span>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block mb-1">INR</span>
                  <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
                </div>
              </div>


              <button onClick={placeOrder} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2">
                Place Order
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">
                  lock_clock
                </span>
                <span className="text-xs font-medium">Secured by Stripe</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Checkout;




