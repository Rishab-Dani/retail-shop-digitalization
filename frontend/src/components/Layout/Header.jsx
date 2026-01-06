import { Link } from "react-router-dom";

const Header = ({ cartCount, searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="h-16 flex items-center justify-between gap-4">

          {/* LEFT — LOGO */}
          <Link to="/customer/products" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">
                storefront
              </span>
            </div>
            <span className="text-lg font-bold text-slate-900">
              RetailFlow
            </span>
          </Link>

          {/* CENTER — SEARCH */}
          <div className="hidden md:flex flex-1 max-w-[420px]">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                search
              </span>
              <input
  type="text"
  placeholder="Search products..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-sm"
/>

            </div>
          </div>

          {/* RIGHT — ACTIONS */}
          <div className="flex items-center gap-4">

            {/* BECOME A SELLER */}
            <Link
              to="/seller/register"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium text-sm hover:bg-blue-600 hover:text-white transition"
            >
              <span className="material-symbols-outlined text-[18px]">
                store
              </span>
              Become a Seller
            </Link>

            {/* CART */}
            <Link
              to="/customer/cart"
              className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100"
            >
              <span className="material-symbols-outlined text-slate-700">
                shopping_cart
              </span>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE */}
            <Link
              to="/customer/profile"
              className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300"
            >
              <span className="material-symbols-outlined text-slate-700">
                person
              </span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
