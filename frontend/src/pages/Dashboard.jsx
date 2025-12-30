import {
  MdMoreVert,
  MdWarning,
  MdInventory,
  MdShoppingBag,
  MdAttachMoney,
} from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="h-full w-full bg-[#f6f7fb] flex overflow-hidden">

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col min-h-0">

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">

          {/* ================= STATS ================= */}
          <div className=" p-5 grid grid-cols-4 gap-6">

            <Stat
              icon={<MdInventory />}
              title="Total Products"
              value="452"
              badge="+5%"
            />
            <Stat
              icon={<MdShoppingBag />}
              title="Total Orders"
              value="1,240"
              badge="+12%"
            />
            <Stat
              icon={<MdAttachMoney />}
              title="Total Revenue"
              value="$12,450"
              badge="+8%"
            />
            <Stat
              icon={<MdWarning />}
              title="Low Stock Items"
              value="5"
              badge="Action Needed"
              danger
            />
          </div>

          {/* ================= CHARTS ================= */}
          <div className="grid grid-cols-3 gap-6">

            {/* LINE CHART */}
            <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">

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
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,150 C80,100 160,140 240,90 320,40 400,120 480,70 560,30 640,90 720,50 760,30 800,20 800,20"
                  fill="url(#g)"
                />
                <path
                  d="M0,150 C80,100 160,140 240,90 320,40 400,120 480,70 560,30 640,90 720,50 760,30 800,20 800,20"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
              </svg>

              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

            {/* BAR CHART */}
           <div className="bg-white rounded-xl border border-slate-200  shadow-sm p-6">
              <h3 className="font-semibold">Revenue Overview</h3>
              <p className="text-sm text-slate-500 mb-6">
                Sales by category
              </p>

              <div className="flex items-end gap-4 h-64">
                <Bar h="65%" label="Elec." />
                <Bar h="45%" label="Cloth" />
                <Bar h="85%" label="Home" />
                <Bar h="55%" label="Sport" />
              </div>
            </div>
      
          </div>

          {/* ================= RECENT ORDERS ================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold">Recent Orders</h3>
              <button className="text-blue-600 text-sm flex items-center gap-1">
                View All →
              </button>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 text-left">ORDER ID</th>
                  <th className="px-6 py-3 text-left">CUSTOMER</th>
                  <th className="px-6 py-3 text-left">DATE</th>
                  <th className="px-6 py-3 text-left">AMOUNT</th>
                  <th className="px-6 py-3 text-left">STATUS</th>
                  <th className="px-6 py-3 text-right">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-slate-200">
                    <td className="px-6 py-4 text-blue-600">{r.id}</td>
                    <td className="px-6 py-4">{r.name}</td>
                    <td className="px-6 py-4 text-slate-500">{r.date}</td>
                    <td className="px-6 py-4">{r.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs rounded-full ${r.badge}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400">
                      <MdMoreVert />
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

/* ================= HELPERS ================= */

const Stat = ({ icon, title, value, badge, danger }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 relative">

    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
        danger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
      }`}
    >
      {icon}
    </div>

    <span
      className={`absolute top-5 right-5 text-xs px-2 py-1 rounded-full ${
        danger
          ? "bg-red-100 text-red-600"
          : "bg-green-100 text-green-600"
      }`}
    >
      {badge}
    </span>

    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Bar = ({ h, label }) => (
  <div className="flex-1 flex flex-col items-center">
    <div className="w-full h-48 bg-slate-100 rounded-lg flex items-end">
      <div
        className="w-full rounded-lg bg-blue-500"
        style={{ height: h }}
      />
    </div>
    <span className="text-xs text-slate-500 mt-2">{label}</span>
  </div>
);

const rows = [
  { id: "#ORD-00124", name: "Jane Cooper", date: "Oct 24, 2023", amount: "$124.00", status: "Completed", badge: "bg-green-100 text-green-700" },
  { id: "#ORD-00123", name: "Wade Warren", date: "Oct 24, 2023", amount: "$450.00", status: "Pending", badge: "bg-yellow-100 text-yellow-700" },
  { id: "#ORD-00122", name: "Esther Howard", date: "Oct 23, 2023", amount: "$78.50", status: "Completed", badge: "bg-green-100 text-green-700" },
  { id: "#ORD-00121", name: "Cameron Williamson", date: "Oct 23, 2023", amount: "$32.00", status: "Cancelled", badge: "bg-red-100 text-red-700" },
  { id: "#ORD-00120", name: "Brooklyn Simmons", date: "Oct 22, 2023", amount: "$1,299.00", status: "Completed", badge: "bg-green-100 text-green-700" },
];

export default Dashboard;
