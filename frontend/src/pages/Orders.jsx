import { useNavigate } from "react-router-dom";
import {
  MdSearch,
  MdFilterList,
  MdCalendarToday,
  MdMoreVert,
  MdDownload,
  MdAdd,
} from "react-icons/md";

/* ---------------- MOCK DATA (STATIC FOR NOW) ---------------- */

const orders = [
  {
    id: "#1024",
    date: "Oct 24, 2023",
    time: "14:30",
    name: "John Doe",
    email: "john@example.com",
    avatar: "JD",
    avatarBg: "bg-orange-100 text-orange-600",
    amount: "$120.50",
    status: "COMPLETED",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    id: "#1023",
    date: "Oct 24, 2023",
    time: "09:15",
    name: "Jane Smith",
    email: "jane.s@example.com",
    avatar: "JS",
    avatarBg: "bg-blue-100 text-blue-600",
    amount: "$45.00",
    status: "CREATED",
    statusStyle: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "#1022",
    date: "Oct 23, 2023",
    time: "16:45",
    name: "Mike Ross",
    email: "mike.ross@legal.com",
    avatar: "MR",
    avatarBg: "bg-purple-100 text-purple-600",
    amount: "$310.00",
    status: "CANCELLED",
    statusStyle: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: "#1021",
    date: "Oct 23, 2023",
    time: "11:20",
    name: "Rachel Green",
    email: "rachel.g@fashion.com",
    avatar: "RG",
    avatarBg: "bg-teal-100 text-teal-600",
    amount: "$89.99",
    status: "COMPLETED",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    id: "#1020",
    date: "Oct 22, 2023",
    time: "10:00",
    name: "John Doe",
    email: "john@example.com",
    avatar: "JD",
    avatarBg: "bg-slate-100 text-slate-600",
    amount: "$215.00",
    status: "COMPLETED",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function Orders() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track all your store orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 shadow-sm rounded-lg bg-white text-sm">
            <MdDownload size={18} /> Export
          </button>

          <button 
           onClick={() => navigate("/addOrders")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white shadow-sm rounded-lg text-sm font-semibold">
            <MdAdd size={18} /> Create Order
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search orders by ID, customer or status..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 shadow-sm bg-white text-sm"
          />
        </div>

        <div className="relative">
          <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select className="w-full pl-10 pr-8 py-2.5 rounded-lg border border-slate-200 shadow-sm bg-white text-sm">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Created</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="relative">
          <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select className="w-full pl-10 pr-8 py-2.5 rounded-lg border border-slate-200 shadow-sm bg-white text-sm">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Today</option>
          </select>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-400">
            <tr className="text-xs uppercase text-slate-500">
              <th className="px-6 py-4 text-center">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-right">Total Amount</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 border border-slate-200">
                <td className="px-6 py-4 text-center">
                  <input type="checkbox" />
                </td>

                <td className="px-6 py-4 font-semibold text-blue-600">
                  {o.id}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {o.date} <span className="text-xs text-slate-400 ml-1">{o.time}</span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${o.avatarBg}`}>
                      {o.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{o.name}</p>
                      <p className="text-xs text-slate-500">{o.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-right font-medium">
                  {o.amount}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${o.statusStyle}`}>
                    {o.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button className="p-1.5 hover:bg-slate-100 rounded-full">
                    <MdMoreVert />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <span className="text-slate-500">
            Showing <b>1</b> to <b>5</b> of <b>50</b> entries
          </span>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1">Previous</button>
            <button className="w-8 h-8 bg-blue-600 text-white rounded">1</button>
            <button className="w-8 h-8 rounded hover:bg-slate-100">2</button>
            <button className="w-8 h-8 rounded hover:bg-slate-100">3</button>
            <span>…</span>
            <button className="w-8 h-8 rounded hover:bg-slate-100">10</button>
            <button className="px-3 py-1 text-blue-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
