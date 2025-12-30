import { useNavigate } from "react-router-dom";
import {
  MdEdit,
  MdDelete,
  MdSearch,
  MdFilterList,
} from "react-icons/md";
// STEP 4: Temporary mock data (required to avoid crash)
// ✅ TEMP MOCK DATA (will replace with API later)
const products = [
  {
    name: "Wireless Headphones",
    sku: "WH-001",
    category: "Electronics",
    price: "$129.00",
    stock: "45 units",
    status: "In Stock",
    statusStyle: "bg-green-50 text-green-700 border-green-200",
  },
  {
    name: "Smart Watch Gen 2",
    sku: "SW-022",
    category: "Wearables",
    price: "$249.00",
    stock: "12 units",
    status: "Low Stock",
    statusStyle: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    name: "Classic Denim Jacket",
    sku: "DJ-890",
    category: "Apparel",
    price: "$89.50",
    stock: "156 units",
    status: "In Stock",
    statusStyle: "bg-green-50 text-green-700 border-green-200",
  },
  {
    name: "Urban Runners",
    sku: "UR-332",
    category: "Footwear",
    price: "$112.00",
    stock: "0 units",
    status: "Out of Stock",
    statusStyle: "bg-red-50 text-red-700 border-red-200",
  },
  {
    name: "Artisan Mug",
    sku: "AM-999",
    category: "Home & Living",
    price: "$22.00",
    stock: "89 units",
    status: "In Stock",
    statusStyle: "bg-green-50 text-green-700 border-green-200",
  },
];


export default function Products() {
  const navigate = useNavigate();

  return (
    <>
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Product List</h2>
          <p className="text-sm text-slate-500">
            Manage your product catalog, inventory, and pricing.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-lg text-sm bg-white">
            Export
          </button>

          <button
            onClick={() => navigate("/products/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search by name, SKU..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 outline-none text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <select className="border border-slate-300 px-4 py-2.5 rounded-lg text-sm bg-white">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Wearables</option>
            <option>Apparel</option>
          </select>

          <select className="border border-slate-300 px-4 py-2.5 rounded-lg text-sm bg-white">
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>

          <button className="border border-slate-300 p-2.5 rounded-lg hover:bg-slate-50">
            <MdFilterList />
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-xs uppercase text-slate-500 tracking-wider">
              <th className="px-6 py-4"><input type="checkbox" /></th>
              <th className="px-6 py-4 text-left">Product Name</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Stock</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.sku} className="hover:bg-slate-50 group">
                <td className="px-6 py-4"><input type="checkbox" /></td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold">
                      IMG
                    </div>
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-slate-500">SKU: {p.sku}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-600">{p.category}</td>
                <td className="px-6 py-4 font-medium">{p.price}</td>
                <td className="px-6 py-4 text-slate-600">{p.stock}</td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${p.statusStyle}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {p.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100">
                    <button className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-md">
                      <MdEdit />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-md">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-between text-sm">
          <span className="text-slate-500">
            Showing <b>1</b> to <b>5</b> of <b>52</b> results
          </span>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border rounded-lg">‹</button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 rounded-lg">2</button>
            <button className="px-3 py-2 rounded-lg">3</button>
            <span>…</span>
            <button className="px-3 py-2 rounded-lg">10</button>
            <button className="px-3 py-2 border rounded-lg">›</button>
          </div>
        </div>
      </div>
    </>
  );
}
