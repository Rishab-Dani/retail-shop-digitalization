import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory2,
  MdShoppingCart,
  MdPeople,
  MdBarChart,
  MdSettings,
} from "react-icons/md";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">

      {/* LOGO */}
      <div className="h-16 px-6 flex items-center gap-2 border-b border-slate-200 font-semibold text-lg">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          🏬
        </div>
        RetailAdmin
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
        <NavItem to="/" icon={<MdDashboard />} label="Dashboard" />
        <NavItem to="/products" icon={<MdInventory2 />} label="Products" />
        <NavItem to="/orders" icon={<MdShoppingCart />} label="Orders" />
        <NavItem to="/customers" icon={<MdPeople />} label="Customers" />
        <NavItem to="/reports" icon={<MdBarChart />} label="Reports" />
        

        <div className="border-t border-slate-200 my-4" />

        <NavItem to="/settings" icon={<MdSettings />} label="Settings" />
      </nav>

      {/* USER PROFILE */}
      <div className="border-t border-slate-200 p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
          👤
        </div>
        <div className="text-sm">
          <p className="font-medium">Alex Morgan</p>
          <p className="text-xs text-slate-400">Store Manager</p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;

/* -------- NAV ITEM -------- */

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);
