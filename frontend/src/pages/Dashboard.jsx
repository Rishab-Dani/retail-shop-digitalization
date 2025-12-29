import React from "react";


const Dashboard = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 h-screen w-full overflow-hidden flex font-display antialiased">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-surface-dark border-r border-border-light dark:border-border-dark hidden lg:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">storefront</span>
            </div>
            <h1 className="text-lg font-bold">RetailAdmin</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            ["dashboard", "Dashboard", true],
            ["inventory_2", "Products"],
            ["shopping_cart", "Orders"],
            ["group", "Customers"],
            ["analytics", "Reports"],
          ].map(([icon, label, active]) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-primary text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined">{icon}</span>
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-surface-dark border-b">
          <h2 className="text-lg font-bold">Dashboard Overview</h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm outline-none"
            />
            <button className="relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["inventory_2", "Total Products", "452", "+5%"],
              ["shopping_bag", "Total Orders", "1,240", "+12%"],
              ["payments", "Total Revenue", "$12,450", "+8%"],
              ["warning", "Low Stock Items", "5", "Action Needed", true],
            ].map(([icon, title, value, badge, danger]) => (
              <div
                key={title}
                className="bg-white dark:bg-surface-dark p-5 rounded-xl border shadow-soft"
              >
                <div className="flex justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      danger ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
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
                <p className="text-sm text-slate-500">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Orders Overview */}
            <div className="lg:col-span-2 bg-white dark:bg-surface-dark p-6 rounded-xl border shadow-soft">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-bold">Orders Overview</h3>
                  <p className="text-sm text-slate-500">
                    Order trends over the last 30 days
                  </p>
                </div>
                <button className="text-primary text-sm font-medium">
                  View Report
                </button>
              </div>

              <div className="h-64 flex items-center justify-center text-slate-400">
                📈 SVG Chart goes here
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border shadow-soft">
              <h3 className="font-bold mb-1">Revenue Overview</h3>
              <p className="text-sm text-slate-500 mb-6">Sales by category</p>

              <div className="flex items-end justify-between h-64 gap-3">
                {["Elec", "Cloth", "Home", "Sport"].map((c) => (
                  <div key={c} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-40 rounded-md relative">
                      <div className="absolute bottom-0 w-full bg-primary/70 h-3/4 rounded-md"></div>
                    </div>
                    <span className="text-xs text-slate-500">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-surface-dark rounded-xl border shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between">
              <h3 className="font-bold">Recent Orders</h3>
              <button className="text-sm text-slate-500 hover:text-primary">
                View All →
              </button>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-4 text-primary">#ORD-00124</td>
                  <td className="px-6 py-4">Jane Cooper</td>
                  <td className="px-6 py-4">Oct 24, 2023</td>
                  <td className="px-6 py-4">$124.00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
