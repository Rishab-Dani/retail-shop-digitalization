import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const customer = {
    name: "Alex Harrison",
    id: "#88291",
    joined: "Jan 2022",
    email: "alex.harrison@email.com",
    phone: "+1 (555) 012-3456",
    totalSpent: 4250,
    totalOrders: 24,
  };

  const orders = [
    {
      id: "ORD-29831",
      date: "Oct 24, 2023",
      items: 3,
      status: "Shipped",
      total: 245.99,
    },
    {
      id: "ORD-29750",
      date: "Oct 12, 2023",
      items: 1,
      status: "Delivered",
      total: 89.0,
    },
    {
      id: "ORD-29622",
      date: "Sep 28, 2023",
      items: 5,
      status: "Delivered",
      total: 512.45,
    },
  ];

  const addresses = [
    {
      type: "Home",
      address: "4521 Maple Avenue, Suite 204, Los Angeles, CA 90024",
      default: true,
    },
    {
      type: "Work",
      address: "Tech Park West, Bldg 4, Santa Monica, CA 90401",
      default: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">

      {/* ================= Header ================= */}
      <div className="bg-white border rounded-xl p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{customer.name}</h1>
          <p className="text-sm text-slate-500">
            ID: {customer.id} • Joined {customer.joined}
          </p>
          <div className="flex gap-4 mt-3 text-sm text-slate-600">
            <span>{customer.email}</span>
            <span>{customer.phone}</span>
          </div>
        </div>
        <button className="px-5 py-2 border rounded-lg font-semibold hover:bg-slate-50">
          Edit Profile
        </button>
      </div>

      {/* ================= Metrics ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="border rounded-xl p-6">
          <p className="text-sm text-slate-500">Total Spent</p>
          <p className="text-2xl font-bold text-primary">
            ${customer.totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="border rounded-xl p-6">
          <p className="text-sm text-slate-500">Total Orders</p>
          <p className="text-2xl font-bold">{customer.totalOrders}</p>
        </div>
      </div>

      {/* ================= Tabs ================= */}
      <div className="border-b flex gap-8 mb-6">
        {["overview", "orders", "addresses"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-semibold capitalize ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-slate-500 hover:text-primary"
            }`}
          >
            {tab === "orders" ? "Order History" : tab}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENT ================= */}

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <>
          {/* Orders */}
          <div className="border rounded-xl mb-8 overflow-hidden">
            <div className="p-5 border-b font-bold">Recent Orders</div>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th className="p-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-slate-50 cursor-pointer"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <td className="p-4 font-medium text-primary">
                      {order.id}
                    </td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold">
                      ${order.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Addresses */}
          <div>
            <h3 className="font-bold mb-4">Saved Addresses</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {addresses.map((addr, index) => (
                <div
                  key={index}
                  className={`border rounded-xl p-5 ${
                    addr.default ? "border-primary" : ""
                  }`}
                >
                  <p className="font-semibold">{addr.type}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {addr.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ORDER HISTORY */}
      {activeTab === "orders" && (
        <div className="border rounded-xl p-6 text-slate-500">
          Full Order History page coming next 🚀
        </div>
      )}

      {/* ADDRESSES */}
      {activeTab === "addresses" && (
        <div className="border rounded-xl p-6">
          {addresses.map((addr, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{addr.type}</p>
              <p className="text-sm text-slate-500">{addr.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
