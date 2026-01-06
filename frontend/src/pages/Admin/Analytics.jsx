const Analytics = () => {
     const salesData = [
          { day: 1, value: 4200 },
          { day: 6, value: 6800 },
          { day: 11, value: 5100 },
          { day: 16, value: 9200 }, // 👈 this matches your screenshot
          { day: 21, value: 6000 },
          { day: 26, value: 11500 },
          { day: 31, value: 8400 },
     ];
     const topProducts = [
          {
               name: "Nike Air Zoom",
               price: "$120.00",
               sold: 324,
               revenue: "$38,880",
               image:
                    "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/5bd30c3e-63e8-4ac8-862a-ff141ab37e72/AIR+MAX+TL+2.5.png",
          },
          {
               name: "Adidas Ultraboost",
               price: "$180.00",
               sold: 210,
               revenue: "$37,800",
               image:
                    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=200",
          },
          {
               name: "Puma Essential Hoodie",
               price: "$45.00",
               sold: 540,
               revenue: "$24,300",
               image:
                    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=200",
          },
          {
               name: "Leather Belt",
               price: "$25.00",
               sold: 412,
               revenue: "$10,300",
               image:
                    "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=200",
          },
     ];


     return (
          <div className="flex-1 bg-background-light dark:bg-background-dark p-6">
               <div className="max-w-7xl mx-auto space-y-6">

                    {/* HEADER */}
                    <div className="flex justify-between items-start">
                         <div>
                              <h1 className="text-2xl font-bold text-slate-900">
                                   Advanced Analytics
                              </h1>
                              <p className="text-sm text-slate-500">
                                   Overview of business performance and key insights for January 2024
                              </p>
                         </div>

                         <div className="flex gap-3">
                              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm">
                                   <span className="material-symbols-outlined text-[18px]">
                                        calendar_month
                                   </span>
                                   Jan 1 - Jan 31
                              </button>

                              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                                   <span className="material-symbols-outlined text-[18px]">
                                        download
                                   </span>
                                   Export Report
                              </button>
                         </div>
                    </div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                         {/* CARD */}
                         <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-5">
                              <div className="flex justify-between">
                                   <p className="text-sm text-slate-500">Total Sales</p>
                                   <span className="material-symbols-outlined text-green-500">
                                        trending_up
                                   </span>
                              </div>
                              <h3 className="text-2xl font-bold mt-2">$124,592</h3>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
                                   +12%
                              </span>
                              <p className="text-xs text-slate-400 mt-1">vs. previous period</p>
                         </div>

                         <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-5">
                              <div className="flex justify-between">
                                   <p className="text-sm text-slate-500">Active Users</p>
                                   <span className="material-symbols-outlined text-green-500">
                                        trending_up
                                   </span>
                              </div>
                              <h3 className="text-2xl font-bold mt-2">8,432</h3>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
                                   +5%
                              </span>
                              <p className="text-xs text-slate-400 mt-1">vs. previous period</p>
                         </div>

                         <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-5">
                              <div className="flex justify-between">
                                   <p className="text-sm text-slate-500">Total Orders</p>
                                   <span className="material-symbols-outlined text-red-500">
                                        trending_down
                                   </span>
                              </div>
                              <h3 className="text-2xl font-bold mt-2">1,240</h3>
                              <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded">
                                   -2%
                              </span>
                              <p className="text-xs text-slate-400 mt-1">vs. previous period</p>
                         </div>

                         <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-5">
                              <div className="flex justify-between">
                                   <p className="text-sm text-slate-500">Avg. Order Value</p>
                                   <span className="material-symbols-outlined text-green-500">
                                        trending_up
                                   </span>
                              </div>
                              <h3 className="text-2xl font-bold mt-2">$85</h3>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
                                   +8%
                              </span>
                              <p className="text-xs text-slate-400 mt-1">vs. previous period</p>
                         </div>
                    </div>

                    {/* SALES TRENDS */}
                    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6">
                         <div className="flex justify-between items-center mb-4">
                              <h3 className="font-semibold">Sales Trends</h3>

                              <div className="flex gap-4 text-xs text-slate-500">
                                   <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                        Current Period
                                   </span>
                                   <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                        Previous Period
                                   </span>
                              </div>
                         </div>

                         {/* CHART */}
                         <div className="relative h-56">
                              {/* Grid lines */}
                              <div className="absolute inset-0 flex flex-col justify-between z-0">
                                   {[...Array(5)].map((_, i) => (
                                        <div
                                             key={i}
                                             className="border-t border-dashed border-slate-200"
                                        />
                                   ))}
                              </div>

                              {/* Bars */}
                              <div className="absolute inset-0 flex items-end justify-between px-6 pb-8 z-10">
                                   {salesData.map((item, i) => (
                                        <div
                                             key={i}
                                             className="relative flex flex-col items-center group"
                                        >
                                             {/* Tooltip */}
                                             <div className="absolute -top-9 scale-0 group-hover:scale-100 transition-transform">
                                                  <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md shadow">
                                                       ${item.value / 1000}k
                                                  </div>
                                             </div>

                                             {/* Bar */}
                                             <div
                                                  className="w-6 rounded bg-blue-300 group-hover:bg-blue-600 transition-all cursor-pointer"
                                                  style={{ height: `${item.value / 100}px` }}
                                             />
                                        </div>
                                   ))}
                              </div>


                              {/* X-axis */}
                              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 text-xs text-slate-400">
                                   {[1, 6, 11, 16, 21, 26, 31].map((d) => (
                                        <span key={d}>{d}</span>
                                   ))}
                              </div>
                         </div>
                    </div>




                    {/* PRODUCTS + SEGMENTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                         {/* TOP PRODUCTS */}
                         <div className="lg:col-span-2 bg-white rounded-xl border border-slate-300 shadow-sm p-6">
                              <div className="flex justify-between mb-4">
                                   <h3 className="font-semibold">Top Selling Products</h3>
                                   <button className="text-primary text-sm">View All</button>
                              </div>

                              <table className="w-full text-sm">
                                   <thead className="text-slate-500">
                                        <tr>
                                             <th className="text-left">Product</th>
                                             <th>Price</th>
                                             <th>Sold</th>
                                             <th className="text-right">Revenue</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {topProducts.map((p, i) => (
                                             <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                                                  <td className="py-3">
                                                       <div className="flex items-center gap-3">
                                                            <img
                                                                 src={p.image}
                                                                 alt={p.name}
                                                                 className="w-10 h-10 rounded-md object-cover border border-slate-300"
                                                            />
                                                            <span className="font-medium">{p.name}</span>
                                                       </div>
                                                  </td>

                                                  <td>{p.price}</td>
                                                  <td>{p.sold}</td>
                                                  <td className="text-right font-semibold">{p.revenue}</td>
                                             </tr>
                                        ))}
                                   </tbody>

                              </table>
                         </div>

                         {/* CUSTOMER SEGMENTS */}
                         <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6">
                              <h3 className="font-semibold mb-6">Customer Segments</h3>

                              <div className="relative w-44 h-44 mx-auto rounded-full"
                                   style={{
                                        background:
                                             "conic-gradient(#1349ec 0% 45%, #60a5fa 45% 70%, #e2e8f0 70% 100%)",
                                   }}
                              >
                                   <div className="absolute inset-8 bg-white rounded-full flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold">8.4k</span>
                                        <span className="text-xs text-slate-400">TOTAL USERS</span>
                                   </div>
                              </div>

                              <div className="mt-6 space-y-3 text-sm">
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                             <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                                             <span>Returning (45%)</span>
                                        </div>
                                        <span className="font-semibold">3,794</span>
                                   </div>

                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                             <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                                             <span>New (25%)</span>
                                        </div>
                                        <span className="font-semibold">2,108</span>
                                   </div>

                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                             <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                                             <span>Inactive (30%)</span>
                                        </div>
                                        <span className="font-semibold">2,530</span>
                                   </div>
                              </div>

                         </div>
                    </div>

                    {/* INVENTORY STATUS */}
                    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6">
                         <div className="flex justify-between mb-4">
                              <h3 className="font-semibold">Inventory Status</h3>
                              <button className="text-sm text-slate-500 flex items-center gap-1">
                                   Filter
                                   <span className="material-symbols-outlined text-[16px]">
                                        filter_list
                                   </span>
                              </button>
                         </div>

                         <div className="grid md:grid-cols-3 gap-8">
                              {/* MEN */}
                              <div>
                                   <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Men's Apparel</span>
                                        <span className="text-slate-500">85% Stocked</span>
                                   </div>
                                   <div className="h-3 bg-slate-200 rounded-full">
                                        <div className="h-3 bg-blue-600 rounded-full w-[85%]" />
                                   </div>
                                   <p className="text-xs text-slate-400 mt-1">
                                        1,240 items remaining
                                   </p>
                              </div>

                              {/* WOMEN */}
                              <div>
                                   <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Women's Apparel</span>
                                        <span className="text-slate-500">62% Stocked</span>
                                   </div>
                                   <div className="h-3 bg-slate-200 rounded-full">
                                        <div className="h-3 bg-blue-400 rounded-full w-[62%]" />
                                   </div>
                                   <p className="text-xs text-slate-400 mt-1">
                                        890 items remaining
                                   </p>
                              </div>

                              {/* ACCESSORIES */}
                              <div>
                                   <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Accessories</span>
                                        <span className="text-slate-500">24% Stocked</span>
                                   </div>
                                   <div className="h-3 bg-slate-200 rounded-full">
                                        <div className="h-3 bg-red-500 rounded-full w-[24%]" />
                                   </div>
                                   <p className="text-xs text-red-500 mt-1 font-medium">
                                        Low stock warning
                                   </p>
                              </div>
                         </div>
                    </div>


               </div>

          </div >
     );
};

export default Analytics;
