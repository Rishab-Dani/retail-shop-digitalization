import { MdSave, MdErrorOutline } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

export default function AddProduct() {
  return (
    <main className="flex-1 overflow-y-auto bg-[#f6f6f8] p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">Add New</span>
        </nav>

        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Add New Product
            </h1>
            <p className="text-slate-500 mt-1">
              Create a new item in your inventory layout.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <MdSave size={18} />
              Save Product
            </button>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            {/* GENERAL INFO */}
            <div className="md:col-span-2 border-b pb-2">
              <h3 className="text-lg font-semibold">General Information</h3>
            </div>

            {/* PRODUCT NAME */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Wireless Headphones"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50">
                <option>Select category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Living</option>
              </select>
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                SKU / Code
              </label>
              <input
                className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50"
                placeholder="e.g. WH-1000XM4"
              />
            </div>

            {/* STOCK */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50"
                placeholder="0"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 resize-none"
                placeholder="Write a short description about the product..."
              />
              <p className="text-xs text-slate-500 mt-1">
                Do not exceed 200 characters.
              </p>
            </div>

            {/* PRICING */}
            <div className="md:col-span-2 border-b pt-4 pb-2">
              <h3 className="text-lg font-semibold">Pricing</h3>
            </div>

            {/* BASE PRICE (ERROR STATE) */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Base Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500">$</span>
                <input
                  className="w-full h-11 pl-7 pr-10 rounded-lg border border-red-400 bg-red-50 text-red-600 focus:ring-red-500"
                  placeholder="0.00"
                />
                <MdErrorOutline
                  className="absolute right-3 top-3 text-red-500"
                  size={18}
                />
              </div>
              <p className="text-sm text-red-500 mt-1">
                Price is required.
              </p>
            </div>

            {/* DISCOUNT PRICE */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Discount Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500">$</span>
                <input
                  className="w-full h-11 pl-7 rounded-lg border border-slate-300 bg-slate-50"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* IMAGES */}
            <div className="md:col-span-2 border-b pt-4 pb-2">
              <h3 className="text-lg font-semibold">Product Images</h3>
            </div>

            <div className="md:col-span-2">
              <div className="border-2 border-dashed border-slate-300 rounded-xl px-6 py-10 text-center hover:bg-slate-50 cursor-pointer">
                <FiUpload className="mx-auto text-slate-400" size={40} />
                <div className="mt-4 text-sm text-slate-600">
                  <span className="text-blue-600 font-medium">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="bg-slate-50 px-6 py-4 flex justify-end">
            <button className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Save Product
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
