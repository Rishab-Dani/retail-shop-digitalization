import { FiSearch, FiPlus, FiTrash2, FiCheck } from "react-icons/fi";

const AddOrders = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Create New Order</h2>
          <p className="text-sm text-slate-500">
            Fill in the details below to generate a new customer order.
          </p>
        </div>

        <button className="px-4 py-2 border border-slate-300 shadow-sm rounded-lg text-sm bg-white">
          Save as Draft
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ================= LEFT SECTION ================= */}
        <div className="xl:col-span-2 space-y-6">

          {/* CUSTOMER DETAILS */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-300 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold">👤 Customer Details</h3>
              <button className="text-sm text-blue-600 font-medium">
                New Customer
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">
                  Search Customer
                </label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-slate-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="Type name, email, or phone number..."
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="customer@example.com"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">
                  Phone Number
                </label>
                <input
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">
                  Shipping Address
                </label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                  placeholder="Enter full address..."
                />
              </div>
            </div>
          </div>

          {/* ORDER ITEMS */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-300 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold">🛍 Order Items</h3>
              <button className="flex items-center gap-2 text-sm bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg">
                <FiPlus /> Add Product
              </button>
            </div>

            {/* TABLE HEADER */}
            <div className="hidden md:grid grid-cols-12 px-6 py-3 text-xs font-semibold text-slate-500 bg-slate-100">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* ITEM ROW */}
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-slate-300 items-center"
              >
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg" />
                  <div>
                    <p className="font-medium text-sm">
                      {i === 0 ? "Nike Air Max 90" : "Minimalist Leather Watch"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Size: {i === 0 ? "10" : "One Size"} | Color:{" "}
                      {i === 0 ? "White" : "Brown"}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 text-right text-sm">
                  ${i === 0 ? "120.00" : "85.00"}
                </div>

                <div className="col-span-2 flex justify-center">
                  <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                    <button className="px-2">-</button>
                    <input
                      className="w-10 text-center text-sm border-x border-slate-300"
                      value={i === 0 ? 1 : 2}
                      readOnly
                    />
                    <button className="px-2">+</button>
                  </div>
                </div>

                <div className="col-span-2 flex justify-end items-center gap-3">
                  <span className="font-semibold text-sm">
                    ${i === 0 ? "120.00" : "170.00"}
                  </span>
                  <FiTrash2 className="text-red-400 cursor-pointer" />
                </div>
              </div>
            ))}

            <div className="p-4 text-center text-xs text-slate-500">
              Search and add products above
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="space-y-6">

          {/* ORDER SETTINGS */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-300 bg-slate-50 font-semibold">
              ⚙ Order Settings
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">
                  Order ID
                </label>
                <input
                  disabled
                  value="#ORD-2023-8842"
                  className="w-full px-4 py-2 bg-slate-100 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">
                  Order Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">
                  Payment Method
                </label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm">
                    <option>Credit Card (Stripe)</option>
                    <option>PayPal</option>
                    <option>Bank Transfer</option>
                    <option>Cash on Delivery</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-green-50 text-green-700">
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>

                <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-blue-50 text-blue-700">
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <textarea
                rows="3"
                placeholder="Add private notes..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm resize-none"
              />
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-300 bg-slate-50 font-semibold">
              🧾 Summary
            </div>

            <div className="p-6 space-y-3 text-sm">
              <Row label="Subtotal" value="$290.00" />
              <Row label="Discount (0%)" value="-$0.00" />
              <Row label="Shipping" value="$15.00" />
              <Row label="Tax (10%)" value="$29.00" />

              <hr className="border-slate-300"/>

              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total</span>
                <span className="text-blue-600">$334.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 border border-slate-300 shadow-sm rounded-lg text-sm">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
          <FiCheck /> Confirm Order
        </button>
      </div>
    </div>
  );
};

export default AddOrders;

/* ===== SUMMARY ROW ===== */
const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-slate-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
