const AddCustomers = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:px-12 bg-background-light">
      <div className="max-w-5xl mx-auto space-y-8 pb-12">

        {/* ================= PAGE HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-main-light">
              Add New Customer
            </h1>
            <p className="mt-2 text-text-secondary-light">
              Create a new customer profile to track orders, shipping details, and history.
            </p>
          </div>

          <button className="px-4 py-2 text-sm font-medium border border-slate-300 shadow-sm rounded-lg bg-white">
            Cancel
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form className="space-y-6">

          {/* ===== BASIC INFORMATION ===== */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-300 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">person</span>
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>

            <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-6 gap-6">
              <div className="sm:col-span-3">
                <label className="text-sm font-medium">First name</label>
                <input
                  type="text"
                  placeholder="e.g. Jane"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-sm font-medium">Last name</label>
                <input
                  type="text"
                  placeholder="e.g. Doe"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-sm font-medium">Email address</label>
                <div className="relative mt-1">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
                    mail
                  </span>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full pl-10 rounded-lg border border-slate-300 p-2.5"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative mt-1">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
                    call
                  </span>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 rounded-lg border border-slate-300 p-2.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== ADDRESS DETAILS ===== */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-300 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">
                home_pin
              </span>
              <h3 className="text-lg font-semibold">Address Details</h3>
            </div>

            <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-6 gap-6">
              <div className="sm:col-span-6">
                <label className="text-sm font-medium">Street address</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">City</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">State / Province</label>
                <select className="mt-1 w-full rounded-lg border border-slate-300 p-2.5">
                  <option>California</option>
                  <option>New York</option>
                  <option>Texas</option>
                  <option>Florida</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">ZIP / Postal code</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"
                />
              </div>

              <div className="sm:col-span-6 flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">
                  Billing address is the same as shipping address
                </span>
              </div>
            </div>
          </div>

          {/* ===== ADDITIONAL NOTES ===== */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-300 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">
                note
              </span>
              <h3 className="text-lg font-semibold">Additional Notes</h3>
            </div>

            <div className="px-6 py-6">
              <label className="text-sm font-medium">Internal Notes</label>
              <textarea
                rows="3"
                placeholder="Add any specific preferences or notes about this customer..."
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"
              />
              <p className="mt-2 text-sm text-text-secondary-light">
                These notes are private and will not be shared with the customer.
              </p>
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-300">
            <button
              type="button"
              className="text-sm font-semibold hover:text-blue-600 border border-slate-300 rounded-lg px-6 py-2.5 shadow-sm"
            >
              Reset Form
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              Save Customer
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCustomers;
