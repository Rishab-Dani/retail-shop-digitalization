import {
  MdSearch,
  MdFilterList,
  MdDownload,
  MdMoreVert,
  MdPersonAdd,
} from "react-icons/md";

export default function Customers() {
  return (
    <div className="flex flex-col gap-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-slate-500">
            Manage your customer base and view order history.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow">
          <MdPersonAdd className="text-xl" />
          Add Customer
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Customers" value="2,420" note="+12% this month" />
        <StatCard title="Active Members" value="1,210" note="+5% this week" />
        <StatCard title="New Signups" value="340" note="Since last month" />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-slate-300 ">

        {/* FILTER BAR */}
        <div className="p-5 border-b border-slate-300 flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto">
            {["All", "Active", "VIP", "New"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1.5 rounded-full text-sm ${
                  tab === "All"
                    ? "bg-slate-100 font-medium"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

          
          <button className="border border-slate-300 p-2.5 rounded-lg hover:bg-slate-50">
            <MdFilterList />
          </button>

          <button className="border border-slate-300 p-2.5 rounded-lg hover:bg-slate-50">
            <MdDownload />
          </button>

          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 border-b border-slate-300">
              <tr className="text-xs uppercase text-slate-500">
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left hidden sm:table-cell">Email</th>
                <th className="p-4 text-left hidden md:table-cell">Phone</th>
                <th className="p-4 text-center">Orders</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50  border-b border-slate-300">
                  <td className="p-4">
                    <input type="checkbox" />
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar avatar={c.avatar} initials={c.initials} />
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs text-slate-500 sm:hidden">
                          {c.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <StatusBadge status={c.status} />
                  </td>

                  <td className="p-4 hidden sm:table-cell text-slate-600">
                    {c.email}
                  </td>

                  <td className="p-4 hidden md:table-cell text-slate-600">
                    {c.phone}
                  </td>

                  <td className="p-4 text-center font-medium">
                    {c.orders}
                  </td>

                  <td className="p-4 text-right opacity-0 group-hover:opacity-100">
                    <button className="p-1 hover:text-blue-600">
                      <MdMoreVert />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-4 border-t border-slate-300 flex justify-between text-sm text-slate-500">
          <span>
            Showing <b>1</b> to <b>5</b> of <b>1,210</b> results
          </span>

          <div className="flex gap-2">
            <button className="border px-3 py-1.5 rounded">Previous</button>
            <button className="border px-3 py-1.5 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const StatCard = ({ title, value, note }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm">
    <p className="text-sm text-slate-500">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
    <p className="text-xs text-green-600 mt-2">{note}</p>
  </div>
);

const IconButton = ({ icon }) => (
  <button className="p-2 border rounded-lg hover:bg-slate-50">
    {icon}
  </button>
);

const Avatar = ({ avatar, initials }) =>
  avatar ? (
    <img src={avatar} alt="" className="w-10 h-10 rounded-full" />
  ) : (
    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">
      {initials}
    </div>
  );

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-100 text-green-700",
    New: "bg-blue-100 text-blue-700",
    VIP: "bg-purple-100 text-purple-700",
    Inactive: "bg-slate-100 text-slate-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

/* ---------- MOCK DATA ---------- */

const customers = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 555-0101",
    orders: 12,
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_NW4OVyAFYuVvl0es3nwwhtp4EWHu-Vgu-jWg8VdBXvz_jdx-E0HoNyqmNgC9T4h5IMyGM-7Hxehax9VQjhEVsZJCqewOrZl5azrttrJ-Lsc8amoDDFpVR18LOw7KlIrXRoFuDGII21-zhWebOoinOkTLY1Bz8oB0Cjsgq5FPjPLK5tPPtErj83qBNfjrUaQaNC2KNwsZAMVl2-BrrYHhr_cgXW5l9a30fau1-UeFxyX98AzJHGuDHyE_xKThrFCUfUxTTnKwX6Gt",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@test.com",
    phone: "+1 555-0102",
    orders: 5,
    status: "New",
    initials: "JS",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@retail.com",
    phone: "+1 555-0103",
    orders: 34,
    status: "VIP",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael@retail.com",
    phone: "+1 555-0104",
    orders: 0,
    status: "Inactive",
    initials: "MB",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 555-0105",
    orders: 8,
    status: "Active",
  },
];
