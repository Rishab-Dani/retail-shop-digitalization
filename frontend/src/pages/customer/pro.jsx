// import { useOutletContext, Link, useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cart, setCart } = useOutletContext();
//   const navigate = useNavigate();

//   const increase = id =>
//     setCart(c => c.map(i => i.id === id ? { ...i, quantity: (i.quantity || 1) + 1 } : i));

//   const decrease = id =>
//     setCart(c => c.map(i =>
//       i.id === id && (i.quantity || 1) > 1
//         ? { ...i, quantity: i.quantity - 1 }
//         : i
//     ));

//   const remove = id => setCart(c => c.filter(i => i.id !== id));

//   const subtotal = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
//   const tax = subtotal * 0.08;
//   const total = subtotal + tax;

//   if (cart.length === 0) {
//     return (
//       <main className="py-24 text-center">
//         <h2 className="text-2xl font-bold">Your cart is empty</h2>
//         <Link to="/customer/products" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">
//           Continue Shopping
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
      
//       {/* ITEMS */}
//       <div className="lg:col-span-2 space-y-6">
//         {cart.map(item => (
//           <div key={item.id} className="bg-white rounded-xl p-6 flex gap-6 shadow-sm">
//             <img src={item.image} className="w-28 h-28 rounded-lg object-cover" />

//             <div className="flex-1">
//               <h3 className="font-bold">{item.name}</h3>
//               <p className="text-sm text-slate-500">{item.category}</p>

//               <div className="flex items-center gap-3 mt-4">
//                 <button onClick={() => decrease(item.id)} className="px-2 border rounded">−</button>
//                 <span>{item.quantity || 1}</span>
//                 <button onClick={() => increase(item.id)} className="px-2 border rounded">+</button>
//               </div>
//             </div>

//             <div className="text-right">
//               <p className="font-bold">₹{item.price}</p>
//               <button onClick={() => remove(item.id)} className="text-red-500 text-sm mt-4">
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* SUMMARY */}
//       <aside className="bg-white rounded-xl p-6 h-fit shadow-sm sticky top-24">
//         <h3 className="font-bold text-lg mb-4">Order Summary</h3>

//         <div className="flex justify-between text-sm mb-2">
//           <span>Subtotal</span>
//           <span>₹{subtotal.toFixed(2)}</span>
//         </div>

//         <div className="flex justify-between text-sm mb-2">
//           <span>Tax</span>
//           <span>₹{tax.toFixed(2)}</span>
//         </div>

//         <hr className="my-4" />

//         <div className="flex justify-between font-bold text-lg mb-6">
//           <span>Order Total</span>
//           <span className="text-blue-600">₹{total.toFixed(2)}</span>
//         </div>

//         <button
//           onClick={() => navigate("/customer/checkout")}
//           className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold"
//         >
//           Proceed to Checkout →
//         </button>
//       </aside>
//     </main>
//   );
// };

// export default Cart;


// import { useOutletContext, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Checkout = () => {
//   const { cart } = useOutletContext();
//   const navigate = useNavigate();

//   const subtotal = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
//   const tax = subtotal * 0.08;
//   const total = subtotal + tax;

//   const [delivery, setDelivery] = useState("standard");
//   const [payment, setPayment] = useState("card");

//   useEffect(() => {
//     if (cart.length === 0) navigate("/customer/products");
//   }, [cart, navigate]);

//   return (
//     <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-10">

//       {/* LEFT */}
//       <div className="col-span-8 space-y-8">

//         {/* SHIPPING */}
//         <section className="bg-white rounded-xl p-6 shadow-sm">
//           <h3 className="font-bold mb-4">Shipping Address</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <input className="input" placeholder="First Name" />
//             <input className="input" placeholder="Last Name" />
//             <input className="input col-span-2" placeholder="Address" />
//             <input className="input" placeholder="City" />
//             <input className="input" placeholder="Postal Code" />
//             <select className="input col-span-2">
//               <option>United States</option>
//               <option>India</option>
//             </select>
//           </div>
//         </section>

//         {/* DELIVERY */}
//         <section className="bg-white rounded-xl p-6 shadow-sm">
//           <h3 className="font-bold mb-4">Delivery Method</h3>

//           {[
//             { id: "standard", label: "Standard Delivery", sub: "4–6 business days", price: "Free" },
//             { id: "express", label: "Express Delivery", sub: "1–2 business days", price: "$15.00" }
//           ].map(o => (
//             <label key={o.id}
//               className={`flex items-center justify-between border rounded-lg p-4 mb-3 cursor-pointer
//               ${delivery === o.id ? "border-blue-600 bg-blue-50" : ""}`}>
//               <div className="flex gap-3">
//                 <input
//                   type="radio"
//                   checked={delivery === o.id}
//                   onChange={() => setDelivery(o.id)}
//                 />
//                 <div>
//                   <p className="font-medium">{o.label}</p>
//                   <p className="text-sm text-slate-500">{o.sub}</p>
//                 </div>
//               </div>
//               <span className="font-bold">{o.price}</span>
//             </label>
//           ))}
//         </section>

//         {/* PAYMENT */}
//         <section className="bg-white rounded-xl p-6 shadow-sm">
//           <h3 className="font-bold mb-4">Payment Details</h3>

//           <div className="grid grid-cols-2 gap-4 mb-6">
//             {["card", "paypal"].map(p => (
//               <button
//                 key={p}
//                 onClick={() => setPayment(p)}
//                 className={`border rounded-lg py-3 font-medium
//                 ${payment === p ? "border-blue-600 bg-blue-50" : ""}`}>
//                 {p === "card" ? "Credit Card" : "PayPal"}
//               </button>
//             ))}
//           </div>

//           {payment === "card" && (
//             <div className="grid grid-cols-2 gap-4">
//               <input className="input col-span-2" placeholder="Card Number" />
//               <input className="input" placeholder="MM / YY" />
//               <input className="input" placeholder="CVC" />
//               <input className="input col-span-2" placeholder="Cardholder Name" />
//             </div>
//           )}
//         </section>
//       </div>

//       {/* RIGHT */}
//       <aside className="col-span-4 bg-white rounded-xl p-6 shadow-sm h-fit">
//         <h3 className="font-bold mb-4">Order Summary</h3>

//         {cart.map(i => (
//           <div key={i.id} className="flex justify-between mb-2">
//             <span>{i.name} × {i.quantity || 1}</span>
//             <span>₹{i.price}</span>
//           </div>
//         ))}

//         <hr className="my-4" />

//         <div className="flex justify-between text-sm mb-2">
//           <span>Subtotal</span>
//           <span>₹{subtotal.toFixed(2)}</span>
//         </div>

//         <div className="flex justify-between text-sm mb-2">
//           <span>Tax</span>
//           <span>₹{tax.toFixed(2)}</span>
//         </div>

//         <div className="flex justify-between font-bold text-lg mt-4">
//           <span>Total</span>
//           <span className="text-blue-600">₹{total.toFixed(2)}</span>
//         </div>

//         <button className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg font-bold">
//           Place Order →
//         </button>
//       </aside>
//     </main>
//   );
// };

// export default Checkout;