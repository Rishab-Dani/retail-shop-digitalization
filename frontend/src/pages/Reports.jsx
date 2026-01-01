import {
  MdDescription,
  MdHourglassTop,
  MdSync,
  MdHelpOutline,
  MdBolt,
  MdVisibility,
  MdDownload,
  MdFilterList,
  MdSort,
} from "react-icons/md";

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">Business Reports</h2>
        <p className="text-sm text-slate-500">Home &gt; Reports</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Reports Generated"
          value="124"
          note="+12% this month"
          icon={<MdDescription />}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Processing Queue"
          value="2"
          note="Usually takes < 1 min"
          icon={<MdHourglassTop />}
          iconBg="bg-orange-50 text-orange-500"
        />
        <StatCard
          title="Data Freshness"
          value="Live"
          note="Updated 30s ago"
          icon={<MdSync />}
          iconBg="bg-green-50 text-green-600"
        />
      </div>

      {/* CREATE REPORT */}
      <div className="bg-white border border-slate-300 shadow-sm rounded-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-300">
          <div>
            <h3 className="text-lg font-semibold">Create New Report</h3>
            <p className="text-sm text-slate-500">
              Select parameters to generate a custom data export.
            </p>
          </div>
          <MdHelpOutline className="text-blue-600 text-xl cursor-pointer" />
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-sm font-medium">Report Type</label>
              <select className="w-full mt-1 p-2 border border-slate-300 rounded-lg bg-slate-50">
                <option>Sales Performance</option>
                <option>Inventory Status</option>
                <option>Customer Demographics</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Time Period</label>
              <input
                readOnly
                value="Oct 1, 2023 - Oct 31, 2023"
                className="w-full mt-1 p-2 border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Format</label>
              <div className="flex gap-4 mt-2 text-sm">
                <label className="flex gap-2">
                  <input type="radio" name="format" /> PDF
                </label>
                <label className="flex gap-2">
                  <input type="radio" name="format" defaultChecked /> CSV (Excel)
                </label>
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
              <MdBolt />
              Generate Report
            </button>
          </div>

          {/* QUICK SELECT */}
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-slate-500">Quick Select:</span>
            <QuickBtn>Last 7 Days</QuickBtn>
            <QuickBtn>This Month</QuickBtn>
            <QuickBtn>Last Quarter</QuickBtn>
            <QuickBtn active>Custom Range</QuickBtn>
          </div>
        </div>
      </div>

      {/* REPORT HISTORY */}
      <div className="bg-white border border-slate-300 shadow-sm rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-300">
          <h3 className="text-lg font-semibold">Report History</h3>
          <div className="flex gap-2">
            <ActionBtn icon={<MdFilterList />} label="Filter" />
            <ActionBtn icon={<MdSort />} label="Sort" />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-300">
            <tr>
              <th className="px-6 py-3 text-left">Report Name</th>
              <th>Date Range</th>
              <th>Generated On</th>
              <th>Status</th>
              <th className="text-right px-6">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {reports.map((r) => (
              <tr key={r.name} className="hover:bg-slate-50 border-b border-slate-300">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${r.iconBg}`}>
                    {r.icon}
                  </div>
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.meta}</p>
                  </div>
                </td>
                <td>{r.range}</td>
                <td>{r.time}</td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-6 text-right">
                  {r.status !== "Processing" ? (
                    <div className="flex justify-end gap-2">
                      <MdVisibility className="cursor-pointer text-slate-500 hover:text-blue-600" />
                      <MdDownload className="cursor-pointer text-slate-500 hover:text-green-600" />
                    </div>
                  ) : (
                    <span className="text-xs italic text-slate-400">
                      Please wait...
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-slate-300 text-sm text-slate-500 flex justify-between">
          <span>
            Showing <b>1–4</b> of <b>124</b> reports
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg">Previous</button>
            <button className="px-3 py-1 border rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ title, value, note, icon, iconBg }) {
  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-xl p-5 flex justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className="text-xs text-slate-500 mt-1">{note}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
    </div>
  );
}

function QuickBtn({ children, active }) {
  return (
    <button
      className={`px-3 py-1 rounded-full text-xs border border-slate-300 ${
        active
          ? "bg-blue-50 text-blue-600 border-blue-200"
          : "bg-slate-100 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

function ActionBtn({ icon, label }) {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm text-slate-600 hover:bg-slate-50">
      {icon}
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Ready: "bg-green-100 text-green-700",
    Processing: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      ● {status}
    </span>
  );
}

/* ---------- MOCK DATA ---------- */

const reports = [
  {
    name: "Q3 Sales Performance",
    meta: "PDF • 2.4 MB",
    range: "Oct 1 - Dec 31, 2023",
    time: "Today, 10:42 AM",
    status: "Ready",
    icon: <MdDescription />,
    iconBg: "bg-red-50 text-red-600",
  },
  {
    name: "Low Stock Alert",
    meta: "CSV • 145 KB",
    range: "Current Status",
    time: "Yesterday, 4:15 PM",
    status: "Ready",
    icon: <MdDescription />,
    iconBg: "bg-green-50 text-green-600",
  },
  {
    name: "Monthly Employee Sales",
    meta: "PDF • Generating...",
    range: "Sep 1 - Sep 30, 2023",
    time: "Just now",
    status: "Processing",
    icon: <MdHourglassTop />,
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    name: "Customer Demographics",
    meta: "PDF • 5.1 MB",
    range: "Lifetime",
    time: "Oct 2, 2023, 9:00 AM",
    status: "Ready",
    icon: <MdDescription />,
    iconBg: "bg-red-50 text-red-600",
  },
];
