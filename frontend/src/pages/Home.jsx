const Home = () => {
  return (
    <div className="bg-background-light text-gray-900 font-display min-h-screen overflow-x-hidden">
      
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-neutral-50 backdrop-blur-md">
        <div className="px-4 md:px-10 lg:px-40 py-3 flex justify-center">
          <div className="max-w-[1280px] w-full flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 text-3xl">
                storefront
              </span>
              <h2 className="text-xl font-bold">RetailFlow</h2>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-8">
                <a href="#features" className="text-md font-medium hover:text-blue-600">
                  Features
                </a>
                <a href="#how-it-works" className="text-md font-medium hover:text-blue-600">
                  How it Works
                </a>
                <a href="#" className="text-md font-medium hover:text-blue-600">
                  Pricing
                </a>
              </nav>

              <div className="flex gap-3">
               
                <a
                href="/login"
              >
                <button className="h-10 px-5 rounded-3xl border border-gray-200 font-bold hover:bg-gray-100">
                  Login
                </button>
              </a>
                <button className="h-10 px-5 rounded-3xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile Menu Icon (ONLY ICON, NO MENU YET) */}
            {/* <span className="material-symbols-outlined md:hidden lg:hidden text-2xl cursor-pointer">
              menu
            </span> */}
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="px-4 md:px-10 lg:px-40 py-20 flex justify-center bg-neutral-50">
        <div className="max-w-[1280px] w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Transform Your Local Shop into a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Digital Powerhouse
              </span>
            </h1>

            <p className="text-gray-600 text-lg max-w-xl">
              Manage inventory, track sales in real-time, and grow your customer
              base with one simple platform designed for independent retailers.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-3xl font-bold shadow-lg hover:bg-blue-700 transition-all hover:scale-105">
                Start Free Trial
              </button>
              <button className="border border-slate-300 px-8 py-3 rounded-3xl font-bold flex items-center gap-2 bg-white">
                <span className="material-symbols-outlined">play_circle</span>
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="material-symbols-outlined text-blue-600">check_circle</span>
              No credit card required
              <span>•</span>
              <span className="material-symbols-outlined text-blue-600">check_circle</span>
              14-day free trial
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBM8-oRCTa68NgfUMu5V8zROuw1BUe_dRedtn9NYVpZzzq07vpUkgo8dha0sxTlefT16NoDie5HXBWYY6FEUHID7A6oxEwkalEnoWy8p16N84k_wB0ag6Lew0Py4s1e7BGk07qpEKTmzpnjZuLa2y5-jumellDnW8Kj8NMbfugxsan80QMi2A5kdhaOT6f_54F3fMxiT4Lfz8EHEj1YL2vZwP-0YoIrOnJD8LoPDMBQh9NAuFhfbmbUHHAjD1EEbmT2O-rIfw5Hdd9y')",
              }}
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-white py-20 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">
            Features
          </span>
          <h2 className="text-3xl font-bold mt-3">Platform Benefits</h2>
          <p className="text-gray-600 mt-2">
            Everything you need to streamline your retail operations.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              ["warehouse", "Real-time Inventory","Keep accurate track of stock across all your locations. Get low stock alerts automatically."],
              ["analytics", "Smart Analytics","Visualize sales trends and get actionable insights to optimize your revenue."],
              ["point_of_sale", "POS Integration","Seamlessly connect with your existing point of sale hardware. No expensive upgrades needed."],
            ].map(([icon, title, description], i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-300 hover:shadow-lg bg-neutral-50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-gray-600 mt-2">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
     <section
  id="how-it-works"
  className="py-20 px-4 md:px-10 lg:px-40 bg-neutral-50"
>
  <div className="max-w-[900px] mx-auto">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">How it works</h2>
      <p className="text-gray-600">
        Get up and running in minutes, not days.
      </p>
    </div>

    {/* Timeline */}
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-[18px] top-0 h-full w-px bg-gray-300" />

      {[
        [
          "person_add",
          "Sign Up in Seconds",
          "Create your account with just your email. No long forms or credit card details required to start exploring.",
        ],
        [
          "inventory_2",
          "Upload Your Inventory",
          "Import your products via CSV or scan barcodes directly with our mobile app to populate your digital store.",
        ],
        [
          "storefront",
          "Start Selling Smarter",
          "Launch your POS interface and start processing transactions with full data visibility immediately.",
        ],
      ].map(([icon, title, description], i) => (
        <div key={i} className="relative flex gap-6 mb-12">
          {/* Icon */}
          <div className="relative z-10">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[20px]">
                {icon}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="pt-1">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-gray-600 mt-1 max-w-xl">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ================= TRUSTED BY ================= */}
      <section className="bg-white py-20 px-4 md:px-10 lg:px-40">
  <div className="max-w-[1280px] mx-auto">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          Trusted by modern retailers
        </h2>
        <p className="text-gray-600">
          Join thousands of shop owners who have modernized their business.
        </p>
      </div>

      <a
        href="#"
        className="text-blue-600 font-medium mt-4 md:mt-0 hover:underline"
      >
        View success stories →
      </a>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        {
          title: "Fashion & Apparel",
          img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Bakery & Cafe",
          img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Grocery & Mart",
          img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1200&auto=format&fit=crop",
        },
        {
          title: "Electronics & Gadgets",
          img: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=1200&auto=format&fit=crop",
        },
      ].map((item, i) => (
        <div key={i}>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <p className="mt-3 font-semibold text-md text-center">{item.title}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ================= CTA ================= */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h2 className="text-4xl font-black">Ready to modernize your business?</h2>
        <p className="mt-4 text-blue-100">
          Join 10,000+ shops and save 15 hours a week.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-3xl font-bold transition-all hover:-translate-y-1">
            Start Free Trial
          </button>
          <button className="border px-8 py-3 rounded-3xl font-bold">
            Talk to Sales
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
          <footer className="border-t border-gray-200 bg-neutral-50 px-4 md:px-10 lg:px-40 py-16">
  <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

    {/* Brand */}
    <div className="md:col-span-2 flex flex-col gap-4">
      <div className="flex items-center gap-2 font-bold text-lg">
        <span className="material-symbols-outlined text-blue-600">
          storefront
        </span>
        RetailFlow
      </div>

      <p className="text-sm text-gray-600 max-w-sm">
        The all-in-one platform for modern retailers to manage inventory,
        track sales, and grow their business.
      </p>

      <div className="flex gap-4 text-gray-500">
        <span className="material-symbols-outlined cursor-pointer hover:text-blue-600">
          public
        </span>
        <span className="material-symbols-outlined cursor-pointer hover:text-blue-600">
          business
        </span>
      </div>
    </div>

    {/* Product */}
    <div>
      <h4 className="font-semibold mb-3">Product</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>Features</li>
        <li>Pricing</li>
        <li>Integrations</li>
        <li>Changelog</li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h4 className="font-semibold mb-3">Company</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>About Us</li>
        <li>Careers</li>
        <li>Blog</li>
        <li>Contact</li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h4 className="font-semibold mb-3">Legal</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>Privacy</li>
        <li>Terms</li>
        <li>Security</li>
      </ul>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="max-w-[1280px] mx-auto mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-xs text-gray-500">
      © 2024 RetailFlow Inc. All rights reserved.
    </p>

    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="w-2 h-2 rounded-full bg-green-500"></span>
      System Operational
    </div>
  </div>
          </footer>

    </div>
  );
};

export default Home;
