// import { useState , useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getMyProfile,
//   getMyOrders,
//   getMyAddresses,
//   updateProfile,
// } from "../../api/customerApi";


// const CustomerProfileUI = () => {

//   const [customer, setCustomer] = useState({
//   name: "",
//   email: "",
// });

// const [orders, setOrders] = useState([]);
// const [addresses, setAddresses] = useState([]);

// const [isEditOpen, setIsEditOpen] = useState(false);
// const [activeTab, setActiveTab] = useState("overview");
// const [isAddressOpen, setIsAddressOpen] = useState(false);

// const [editingAddress, setEditingAddress] = useState(null);
// const [addressForm, setAddressForm] = useState({
//   type: "HOME",
//   address: "",
// });

// {/* ========================= LOAD DATA ======================== */}

//            useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const profileRes = await getMyProfile();
//       const ordersRes = await getMyOrders();
//       const addressRes = await getMyAddresses();

//       setCustomer(profileRes.data);
//       setOrders(ordersRes.data);
//       setAddresses(addressRes.data);
//     } catch (err) {
//       console.error("Customer fetch failed", err);
//     }
//   };

//   fetchData();
// }, []);


// const handleSaveProfile = async () => {
//   try {
//     await updateProfile({ name: customer.name });
//     const refreshed = await getMyProfile();
//     setCustomer(refreshed.data);
//     setIsEditOpen(false);
//   } catch (e) {
//     console.error(e);
//   }
// };


// /*=========================== Address ===========================*/
// const openAddAddress = () => {
//   setEditingAddress(null);
//   setAddressForm({ type: "HOME", address: "" });
//   setIsAddressOpen(true);
// };

// const openEditAddress = (address) => {
//   setEditingAddress(address);
//   setAddressForm({
//     type: address.type,
//     address: address.address,
//   });
//   setIsAddressOpen(true);
// };


// const handleSaveAddress = async () => {
//   try {
//     if (editingAddress) {
//       await updateAddress(editingAddress.id, addressForm);
//     } else {
//       await createAddress(addressForm);
//     }

//     const refreshed = await getMyAddresses();
//     setAddresses(refreshed.data);
//     setIsAddressOpen(false);
//   } catch (e) {
//     console.error(e);
//   }
// };






//   return (
//     <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8">

//       {/* ================= PROFILE HEADER ================= */}
//       <div className="bg-white rounded-xl border p-6 mb-8 shadow-sm">
//         <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">

//           <div className="flex gap-6 items-center">
//             {/* Avatar */}
//             <div className="relative">
//               <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-md">
//                 <img
//                   src="https://i.pravatar.cc/200?img=32"
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <span className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white uppercase">
//                 Active
//               </span>
//             </div>

//             {/* Info */}
//             <div>
//               <div className="flex items-center gap-3 mb-1">
//                 <h1 className="text-3xl font-bold">Alex Harrison</h1>
//                 <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1">
//                   ✓ VIP Member
//                 </span>
//               </div>

//               <p className="text-slate-500 text-sm flex items-center gap-4 mb-3">
//                 <span>ID: <span className="font-mono">#88291</span></span>
//                 <span className="w-1 h-1 bg-slate-300 rounded-full" />
//                 <span>Joined Jan 2022</span>
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 <div className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg">
//                   alex.harrison@email.com
//                 </div>
//                 <div className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg">
//                   +1 (555) 012-3456
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button
//   onClick={() => setIsEditOpen(true)}
//   className="px-6 py-2 border rounded-lg font-semibold"
// >
//   Edit Profile
// </button>
// {isEditOpen && (
//   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//     <div className="bg-white w-full max-w-lg rounded-xl p-6">

//       <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

//       <div className="space-y-4">
//         {/* Profile Image */}
//         <div className="flex items-center gap-4">
//           <img
//             src="https://i.pravatar.cc/100"
//             className="w-16 h-16 rounded-full border"
//           />
//           <button className="text-blue-600  text-sm font-semibold">
//             Change Photo (later)
//           </button>
//         </div>

//         {/* Name */}
//         <input
//           value={customer.name}
//           onChange={(e) =>
//             setCustomer({ ...customer, name: e.target.value })
//           }
//           className="w-full border p-2 rounded"
//           placeholder="Name"
//         />

//         {/* Email (read-only) */}
//         <input
//           value={customer.email}
//           disabled
//           className="w-full border p-2 rounded bg-slate-100"
//         />

//         {/* Phone (future) */}
//         <input
//           disabled
//           placeholder="Phone (coming soon)"
//           className="w-full border p-2 rounded bg-slate-100"
//         />
//       </div>

//       <div className="flex justify-end gap-4 mt-6">
//         <button
//           onClick={() => setIsEditOpen(false)}
//           className="px-4 py-2 border rounded"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSaveProfile}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//         </div>
//       </div>

//       {/* ================= METRICS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white border p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between mb-4">
//             <p className="text-sm text-slate-500">Total Spent</p>
//             <span className="bg-green-100 text-green-700 text-xs font-bold px-2 rounded">
//               ↑ 12%
//             </span>
//           </div>
//           <p className="text-3xl font-bold text-blue-600">$4,250.00</p>
//           <p className="text-xs text-slate-400 mt-2">Life-time value</p>
//         </div>

//         <div className="bg-white border p-6 rounded-xl shadow-sm">
//           <p className="text-sm text-slate-500 mb-4">Total Orders</p>
//           <p className="text-3xl font-bold">24</p>
//           <p className="text-xs text-slate-400 mt-2">Avg 2.1 orders / mo</p>
//         </div>
//       </div>

//       {/* ================= TABS ================= */}
//  <div className="border-b flex gap-8 mb-6">


//   <button
//     onClick={() => setActiveTab("overview")}
//     className={activeTab === "overview"
//       ? "border-b-2 border-blue-600 pb-3 font-bold"
//       : "pb-3 text-slate-500"}
//   >
//     Overview
//   </button>

//   <button
//     onClick={() => setActiveTab("orders")}
//     className={activeTab === "orders"
//       ? "border-b-2 border-blue-600 pb-3 font-bold"
//       : "pb-3 text-slate-500"}
//   >
//     Order History
//   </button>

//   <button
//     onClick={() => setActiveTab("addresses")}
//     className={activeTab === "addresses"
//       ? "border-b-2 border-blue-600 pb-3 font-bold"
//       : "pb-3 text-slate-500"}
//   >
//     Addresses
//   </button>
// </div>

//       {/* ================= OVERVIEW ================= */}
//       {activeTab === "overview" && (
//         <>
//                 <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-8">
//         <div className="px-6 py-5 border-b flex justify-between items-center">
//           <h3 className="font-bold text-lg">Recent Orders</h3>
//         <button
//   onClick={() => setActiveTab("orders")}
//   className="text-blue-600 font-bold"
// >
//   View All
// </button>
// </div>

//         <table className="w-full text-sm">
//           <thead className="bg-slate-50 text-slate-500">
//             <tr>
//               <th className="px-6 py-3 text-left">Order ID</th>
//               <th>Date</th>
//               <th>Items</th>
//               <th>Status</th>
//               <th className="px-6 py-3 text-right">Total</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             <tr className="hover:bg-slate-50 cursor-pointer">
//               <td className="px-6 py-4 font-medium text-blue-600">ORD-29831</td>
//               <td>Oct 24, 2023</td>
//               <td>3 Items</td>
//               <td>
//                 <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
//                   Shipped
//                 </span>
//               </td>
//               <td className="px-6 py-4 text-right font-bold">$245.99</td>
//             </tr>

//             <tr className="hover:bg-slate-50 cursor-pointer">
//               <td className="px-6 py-4 font-medium text-blue-600">ORD-29750</td>
//               <td>Oct 12, 2023</td>
//               <td>1 Item</td>
//               <td>
//                 <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
//                   Delivered
//                 </span>
//               </td>
//               <td className="px-6 py-4 text-right font-bold">$89.00</td>
//             </tr>

//             <tr className="hover:bg-slate-50 cursor-pointer">
//               <td className="px-6 py-4 font-medium text-blue-600">ORD-29622</td>
//               <td>Sep 28, 2023</td>
//               <td>5 Items</td>
//               <td>
//                 <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
//                   Delivered
//                 </span>
//               </td>
//               <td className="px-6 py-4 text-right font-bold">$512.45</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//         </>
//       )}

//       {/* ================= ORDER HISTORY ================= */}
//   {activeTab === "orders" && (
//   <div className="bg-white rounded-xl border overflow-hidden">
//     <table className="w-full text-sm">
//       <thead className="bg-slate-50">
//         <tr>
//           <th className="p-4 text-left">Order ID</th>
//           <th>Date</th>
//           <th>Items</th>
//           <th>Status</th>
//           <th className="p-4 text-right">Total</th>
//         </tr>
//       </thead>
//       <tbody>
//         {orders.map(o => (
//           <tr key={o.id} className="border-t">
//             <td className="p-4 text-blue-600 font-semibold">{o.id}</td>
//             <td>{new Date(o.createdAt).toLocaleDateString()}</td>
//             <td>{o.items.length}</td>
//             <td>{o.status}</td>
//             <td className="p-4 text-right font-bold">₹{o.totalAmount}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}


//       {/* ================= ADDRESSES ================= */}
//   {activeTab === "addresses" && (
//   <>
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-bold text-lg">Saved Addresses</h3>
//           <button
//   onClick={() => {
//     setEditingAddress(null);
//     setIsAddressOpen(true);
//   }}
//   className="text-blue-600  font-bold"
// >
//   + Add New
// </button>
// {isAddressOpen && (
//   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//     <div className="bg-white w-full max-w-md rounded-xl p-6">

//       <h2 className="font-bold text-lg mb-4">
//         {editingAddress ? "Edit Address" : "Add Address"}
//       </h2>

//       <select
//   value={addressForm.type}
//   onChange={(e) =>
//     setAddressForm({ ...addressForm, type: e.target.value })
//   }
//   className="w-full border p-2 rounded mb-3"
// >
//   <option value="HOME">HOME</option>
//   <option value="WORK">WORK</option>
// </select>

// <textarea
//   value={addressForm.address}
//   onChange={(e) =>
//     setAddressForm({ ...addressForm, address: e.target.value })
//   }
//   className="w-full border p-2 rounded"
//   placeholder="Full address"
// />


//       <div className="flex justify-end gap-4 mt-6">
//         <button
//           onClick={() => setIsAddressOpen(false)}
//           className="px-4 py-2 border rounded"
//         >
//           Cancel
//         </button>
//         <button
//   onClick={handleSaveAddress}
//   className="px-4 py-2 bg-blue-600 text-white rounded"
// >
//   Save
// </button>

//       </div>
//     </div>
//   </div>
// )}

//         </div>

//       </div>
//   </>
// )}

//     </main>
//   );
// };

// export default CustomerProfileUI;





// New UI


import { useEffect, useState } from "react";
import {
  getMyProfile,
  getMyOrders,
  getMyAddresses,
  updateProfile,
  createAddress,
  updateAddress,
  removeAddress,
} from "../../api/customerApi";


const CustomerProfileUI = () => {
  /* ======================= STATE ======================= */

  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    type: "HOME",
    address: "",
    isDefault: false,
  });

  /* ======================= LOAD DATA ======================= */

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [profileRes, ordersRes, addressRes] = await Promise.all([
        getMyProfile(),
        getMyOrders(),
        getMyAddresses(),
      ]);

      setCustomer(profileRes.data);
      setOrders(ordersRes.data);
      setAddresses(addressRes.data);
    } catch (err) {
      console.error("Failed loading profile data", err);
    }
  };

  /* ======================= PROFILE ======================= */

  const handleSaveProfile = async () => {
    try {
      await updateProfile({ name: customer.name });
      const refreshed = await getMyProfile();
      setCustomer(refreshed.data);
      setIsEditOpen(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  /* ======================= ADDRESS ======================= */

  const openAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({ type: "HOME", address: "", isDefault: false });
    setIsAddressOpen(true);
  };

  const openEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({
      type: addr.type,
      address: addr.address,
      isDefault: addr.isDefault,
    });
    setIsAddressOpen(true);
  };

  const handleSaveAddress = async () => {
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, addressForm);
      } else {
        await createAddress(addressForm);
      }
      const refreshed = await getMyAddresses();
      setAddresses(refreshed.data);
      setIsAddressOpen(false);
    } catch (err) {
      console.error("Address save failed", err);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await removeAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete address failed", err);
    }
  };

  /* ======================= UI ======================= */

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8">

      {/* ================= PROFILE HEADER ================= */}
      <div className="bg-white rounded-xl border p-6 mb-8 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
  {customer.name || "—"}
</h1>

<div className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg">
  {customer.email || "—"}
</div>

        </div>
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-6 py-2 border rounded-lg font-semibold"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

            <input
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Name"
            />

            <input
              value={customer.email}
              disabled
              className="w-full border p-2 rounded bg-slate-100 mb-6"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABS ================= */}
      <div className="border-b flex gap-8 mb-6">
        {["overview", "orders", "addresses"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={
              activeTab === tab
                ? "border-b-2 border-blue-600 pb-3 font-bold"
                : "pb-3 text-slate-500"
            }
          >
            {tab === "overview"
              ? "Overview"
              : tab === "orders"
              ? "Order History"
              : "Addresses"}
          </button>
        ))}
      </div>

      {/* ================= OVERVIEW ================= */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Status</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-4 text-blue-600 font-semibold">{o.id}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.items.length}</td>
                  <td>{o.status}</td>
                  <td className="p-4 text-right font-bold">
                    ₹{o.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ORDER HISTORY ================= */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Status</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-4 text-blue-600 font-semibold">{o.id}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.items.length}</td>
                  <td>{o.status}</td>
                  <td className="p-4 text-right font-bold">
                    ₹{o.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ADDRESSES ================= */}
      {activeTab === "addresses" && (
        <>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-lg">Saved Addresses</h3>
            <button
              onClick={openAddAddress}
              className="text-blue-600 font-bold"
            >
              + Add New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((a) => (
              <div
                key={a.id}
                className={`border rounded-xl p-5 ${
                  a.isDefault ? "border-blue-600" : ""
                }`}
              >
                {a.isDefault && (
                  <span className="text-xs bg-blue-600 text-white px-2 rounded">
                    DEFAULT
                  </span>
                )}
                <p className="font-bold mt-2">{a.type}</p>
                <p className="text-sm text-slate-500">{a.address}</p>

                <div className="flex gap-4 mt-4 text-xs font-bold">
                  <button onClick={() => openEditAddress(a)}>EDIT</button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteAddress(a.id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= ADDRESS MODAL ================= */}
      {isAddressOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">
              {editingAddress ? "Edit Address" : "Add Address"}
            </h2>

            <select
              value={addressForm.type}
              onChange={(e) =>
                setAddressForm({ ...addressForm, type: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            >
              <option value="HOME">HOME</option>
              <option value="WORK">WORK</option>
            </select>

            <textarea
              value={addressForm.address}
              onChange={(e) =>
                setAddressForm({ ...addressForm, address: e.target.value })
              }
              className="w-full border p-2 rounded mb-6"
              placeholder="Full address"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsAddressOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CustomerProfileUI;
