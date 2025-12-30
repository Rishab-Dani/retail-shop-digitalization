import { MdNotifications, MdHelpOutline } from "react-icons/md";

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between bg-white border-b border-slate-200 px-6">
      
      {/* LEFT: Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span>Application</span>
        <span className="text-slate-400">›</span>
        <span className="font-medium text-slate-900">
          Dashboard
        </span>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-slate-400">
            🔍
          </span>
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-slate-100">
          <MdNotifications size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Support */}
        <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600">
          <MdHelpOutline size={20} />
          <span className="hidden sm:inline">Support</span>
        </button>

      </div>
    </header>
  );
};

export default Header;
