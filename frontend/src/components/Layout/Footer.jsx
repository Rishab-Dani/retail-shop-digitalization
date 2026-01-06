const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <span className="material-symbols-outlined">storefront</span>
              </div>
              <span className="text-lg font-bold">RetailFlow</span>
            </div>
            <p className="text-sm text-slate-500">
              Helping local retailers transform into digital-first businesses.
            </p>
          </div>

          {/* CUSTOMER */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Customer
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Products</li>
              <li>Cart</li>
              <li>Orders</li>
              <li>Profile</li>
            </ul>
          </div>

          {/* SELLER */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Seller
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Become a Seller</li>
              <li>Seller Dashboard</li>
              <li>Manage Products</li>
              <li>Orders</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © 2026 RetailFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            System Operational
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
