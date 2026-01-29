import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const navigate = useNavigate();

  // ================= UI STATE =================
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditOpen, setIsEditOpen] = useState(false);

  // ================= DATA STATE =================
  const [profilePhoto, setProfilePhoto] = useState(
    "https://i.pravatar.cc/120?img=12"
  );

  const [customer, setCustomer] = useState({
    name: "Alex Harrison",
    id: "#88291",
    joined: "Jan 2022",
    email: "alex.harrison@email.com",
    phone: "+1 (555) 012-3456",
    totalSpent: 4250,
    totalOrders: 24,
  });

const [addresses, setAddresses] = useState([]);


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

  // ================= SAVE HANDLER =================
  const handleSaveProfile = () => {
    setIsEditOpen(false);
    // Later: PUT /customers/:id
  };

  const [editingIndex, setEditingIndex] = useState(null);
const [tempAddress, setTempAddress] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-xl p-6 mb-8 flex justify-between items-center">
        <div className="flex items-center gap-6">

          {/* PHOTO UPLOAD */}
          <div className="relative group">
            <img
              src={profilePhoto}
              alt="Customer"
              className="w-20 h-20 rounded-full border object-cover"
            />
            <label className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfilePhoto(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <p className="text-sm text-slate-500">
              ID: {customer.id} • Joined {customer.joined}
            </p>
            <div className="flex gap-4 mt-2 text-sm text-slate-600">
              <span>{customer.email}</span>
              <span>{customer.phone}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditOpen(true)}
          className="px-5 py-2 border rounded-lg font-semibold hover:bg-slate-50"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= METRICS ================= */}
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

      {/* ================= TABS ================= */}
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

      {/* ================= OVERVIEW ================= */}
      {activeTab === "overview" && (
        <>
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
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="border-t hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="p-4 font-medium text-primary">{order.id}</td>
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
        </>
      )}

      {/* ================= ORDER HISTORY ================= */}
      {activeTab === "orders" && (
        <div className="border rounded-xl p-6">
          {orders.map((o) => (
            <div
              key={o.id}
              onClick={() => navigate(`/orders/${o.id}`)}
              className="border-b py-4 cursor-pointer hover:bg-slate-50"
            >
              <p className="font-semibold text-primary">{o.id}</p>
              <p className="text-sm text-slate-500">
                {o.date} • {o.status} • ${o.total}
              </p>
            </div>
          ))}
        </div>
      )}


      {/* ================= ADDRESSES ================= */}
{activeTab === "addresses" && (
  <div className="border rounded-xl p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold">Saved Addresses</h3>
      <button
        onClick={() => {
          setEditingIndex(addresses.length);
          setAddresses([...addresses, { type: "New", address: "" }]);
          setTempAddress("");
        }}
        className="text-sm font-semibold text-primary"
      >
        + Add Address
      </button>
    </div>

    {addresses.map((addr, index) => (
      <div key={index} className="border rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-semibold mb-1">{addr.type}</p>

            {editingIndex === index ? (
              <textarea
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                className="w-full border rounded p-2 text-sm"
              />
            ) : (
              <p className="text-sm text-slate-500">{addr.address}</p>
            )}
          </div>

          <div className="flex gap-3 text-sm">
            {editingIndex === index ? (
              <>
                <button
                  onClick={() => {
                    const updated = [...addresses];
                    updated[index].address = tempAddress;
                    setAddresses(updated);
                    setEditingIndex(null);
                  }}
                  className="text-green-600 font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="text-slate-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setTempAddress(addr.address);
                  }}
                  className="text-primary font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setAddresses(addresses.filter((_, i) => i !== index))
                  }
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)}


      {/* ================= EDIT PROFILE MODAL ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-xl p-6">

            <h2 className="text-xl font-bold mb-6">Edit Customer</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={profilePhoto}
                  className="w-16 h-16 rounded-full border object-cover"
                />
                <label className="text-sm font-semibold text-primary cursor-pointer">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfilePhoto(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>

              <input
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Name"
              />
              <input
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Email"
              />
              <input
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Phone"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
