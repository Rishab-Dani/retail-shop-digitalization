import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  MdDashboard,
  MdInventory2,
  MdShoppingCart,
  MdGroup,
  MdBarChart,
  MdNotifications,
  MdWarning,
  MdStore,
} from "react-icons/md";

/* ---------------- DATA ---------------- */

const sales = [
  { label: "Elec.", value: 65 },
  { label: "Cloth", value: 45 },
  { label: "Home", value: 85 },
  { label: "Sport", value: 55 },
];

const orders = [
  { id: "#ORD-00124", customer: "Jane Cooper", date: "Oct 24, 2023", amount: "$124.00", status: "Completed", color: "bg-green-100 text-green-700" },
  { id: "#ORD-00123", customer: "Wade Warren", date: "Oct 24, 2023", amount: "$450.00", status: "Pending", color: "bg-yellow-100 text-yellow-700" },
  { id: "#ORD-00122", customer: "Esther Howard", date: "Oct 23, 2023", amount: "$78.50", status: "Completed", color: "bg-green-100 text-green-700" },
  { id: "#ORD-00121", customer: "Cameron Williamson", date: "Oct 23, 2023", amount: "$32.00", status: "Cancelled", color: "bg-red-100 text-red-700" },
];

const App = () => {
  return (
    <div className="h-screen flex bg-[#f6f7fb] overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="h-16 flex items-center gap-2 px-6 border-b font-bold">
          <MdStore className="text-blue-600" size={22} />
          RetailAdmin
        </div>

        <nav className="px-4 py-6 space-y-2 text-sm">
          <NavItem icon={<MdDashboard />} label="Dashboard" active />
          <NavItem icon={<MdInventory2 />} label="Products" />
          <NavItem icon={<MdShoppingCart />} label="Orders" />
          <NavItem icon={<MdGroup />} label="Customers" />
          <NavItem icon={<MdBarChart />} label="Reports" />
        </nav>

        <div className="mt-auto border-t p-4 text-sm text-slate-600">
          Alex Morgan
          <div className="text-xs text-slate-400">Store Manager</div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h2 className="font-semibold">Dashboard Overview</h2>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                className="pl-10 pr-4 py-2 rounded-lg bg-slate-100 text-sm outline-none"
                placeholder="Search..."
              />
              <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
            </div>

            <div className="relative">
              <MdNotifications size={22} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">

          {/* STATS */}
          <div className="grid grid-cols-4 gap-6">
            <Stat title="Total Products" value="452" badge="+5%" />
            <Stat title="Total Orders" value="1,240" badge="+12%" />
            <Stat title="Total Revenue" value="$12,450" badge="+8%" />
            <Stat title="Low Stock Items" value="5" danger badge="Action Needed" />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-3 gap-6">

            {/* LINE CHART */}
            <div className="col-span-2 bg-white rounded-xl border p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Orders Overview</h3>
                  <p className="text-sm text-slate-500">
                    Order trends over the last 30 days
                  </p>
                </div>
                <button className="text-blue-600 text-sm font-medium">
                  View Report
                </button>
              </div>

              <svg viewBox="0 0 800 200" className="w-full h-64">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,150 C120,100 240,160 360,90 480,40 600,120 720,80"
                  fill="url(#area)"
                />
                <path
                  d="M0,150 C120,100 240,160 360,90 480,40 600,120 720,80"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
              </svg>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

            {/* SALES BAR CHART */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold">Revenue Overview</h3>
              <p className="text-sm text-slate-500 mb-6">Sales by category</p>

              <div className="flex items-end justify-between h-64 gap-4">
                {sales.map((item) => (
                  <div key={item.label} className="flex flex-col items-center w-full">
                    <div className="w-full h-48 bg-slate-100 rounded-lg flex items-end">
                      <div
                        className="w-full bg-blue-500 rounded-lg"
                        style={{ height: `${item.value}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 mt-2">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RECENT ORDERS */}
          <div className="bg-white rounded-xl border">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="font-semibold">Recent Orders</h3>
              <button className="text-sm text-blue-600">View All →</button>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 text-left">ORDER ID</th>
                  <th className="px-6 py-3 text-left">CUSTOMER</th>
                  <th className="px-6 py-3 text-left">DATE</th>
                  <th className="px-6 py-3 text-left">AMOUNT</th>
                  <th className="px-6 py-3 text-left">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="px-6 py-4 text-blue-600">{o.id}</td>
                    <td className="px-6 py-4">{o.customer}</td>
                    <td className="px-6 py-4">{o.date}</td>
                    <td className="px-6 py-4">{o.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${o.color}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
};

/* ---------------- SUB COMPONENTS ---------------- */

const NavItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
      active
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-slate-100"
    }`}
  >
    {icon}
    {label}
  </div>
);

const Stat = ({ title, value, badge, danger }) => (
  <div className="bg-white rounded-xl border p-5 relative">
    <div
      className={`absolute top-5 left-5 w-9 h-9 rounded-lg flex items-center justify-center ${
        danger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
      }`}
    >
      {danger ? <MdWarning /> : <MdBarChart />}
    </div>

    <div className="flex justify-end mb-4">
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          danger
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {badge}
      </span>
    </div>

    <p className="text-sm text-slate-500 text-center">{title}</p>
    <p className="text-2xl font-bold text-center">{value}</p>
  </div>
);


export default App
