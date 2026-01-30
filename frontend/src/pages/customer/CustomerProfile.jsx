import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyProfile,
  getMyOrders,
  getMyAddresses,
  updateProfile,
} from "../../api/customerApi";


const CustomerProfile = () => {
  const navigate = useNavigate();


  useEffect(() => {
  fetchCustomerData();
}, []);

// const fetchCustomerData = async () => {
//   try {
//     const [profileRes, ordersRes, addressRes] = await Promise.all([
//       getMyProfile(),
//       getMyOrders(),
//       getMyAddresses(),
//     ]);

//     setCustomer(profileRes.data);
//     setOrders(ordersRes.data.content || []);
//     setAddresses(addressRes.data.content || addressRes.data || []);
//   } catch (err) {
//     console.error("Customer fetch failed", err);
//   } finally {
//     setLoading(false);
//   }
// };
const fetchCustomerData = async () => {
  try {
    const profileRes = await getMyProfile();

    console.log("PROFILE API RESPONSE:", profileRes.data);

    setCustomer(profileRes.data);
  } catch (err) {
    console.error("Profile API failed", err);
  } finally {
    setLoading(false);
  }
};


  // ================= UI STATE =================
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditOpen, setIsEditOpen] = useState(false);

 

const [customer, setCustomer] = useState({
  name: "",
  email: "",
  enabled: true,
});

const [orders, setOrders] = useState([]);
const [addresses, setAddresses] = useState([]);
const [loading, setLoading] = useState(true);


  // ================= SAVE HANDLER =================
 const handleSaveProfile = async () => {
  try {
    await updateProfile({
  name: customer.name,
});

    setIsEditOpen(false);
  } catch (err) {
    console.error("Update failed", err);
  }
};


  const [editingIndex, setEditingIndex] = useState(null);
const [tempAddress, setTempAddress] = useState("");

if (loading) {
  return <p className="text-center py-10">Loading profile...</p>;
}

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">

      {/* ================= HEADER ================= */}

      <div className="bg-white border rounded-xl p-6 mb-8 flex justify-between items-center">
  <div className="flex items-center gap-6">

    {/* STATIC AVATAR (no upload yet) */}
    <img
      src="https://i.pravatar.cc/120?img=12"
      alt="Customer"
      className="w-20 h-20 rounded-full border object-cover"
    />

    <div>
      <h1 className="text-2xl font-bold">{customer.name}</h1>

      <p className="text-sm text-slate-500">{customer.email}</p>

      <span
        className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
          customer.enabled
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {customer.enabled ? "Active Account" : "Disabled Account"}
      </span>
    </div>
  </div>

  <button
    onClick={() => setIsEditOpen(true)}
    className="px-5 py-2 border rounded-lg font-semibold hover:bg-slate-50"
  >
    Edit Profile
  </button>
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

  <td>
    {new Date(order.createdAt).toLocaleDateString()}
  </td>

  <td>{order.items.length}</td>

  <td>
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        order.status === "DELIVERED"
          ? "bg-green-100 text-green-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      {order.status}
    </span>
  </td>

  <td className="p-4 text-right font-semibold">
    ₹{order.totalAmount.toFixed(2)}
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
  {new Date(o.createdAt).toLocaleDateString()} • {o.status} • ₹{o.totalAmount}
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

  {/* NAME — editable */}
  <input
    value={customer.name}
    onChange={(e) =>
      setCustomer({ ...customer, name: e.target.value })
    }
    className="w-full border p-2 rounded"
    placeholder="Name"
  />

  {/* EMAIL — read-only */}
  <input
    value={customer.email}
    disabled
    className="w-full border p-2 rounded bg-slate-100 text-slate-500 cursor-not-allowed"
    placeholder="Email"
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
