const Home = () => {
  return (
    <div className="bg-background-light text-gray-900 font-display min-h-screen overflow-x-hidden">
      <div className="bg-primary text-white p-6 text-xl font-bold">
  Tailwind is WORKING
</div>

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background-light/80 backdrop-blur-md">
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
                <a href="#features" className="text-sm font-medium hover:text-blue-600">
                  Features
                </a>
                <a href="#how-it-works" className="text-sm font-medium hover:text-blue-600">
                  How it Works
                </a>
                <a href="#" className="text-sm font-medium hover:text-blue-600">
                  Pricing
                </a>
              </nav>

              <div className="flex gap-3">
                <button className="h-10 px-5 rounded-xl border border-gray-200 font-bold hover:bg-gray-100">
                  Login
                </button>
                <button className="h-10 px-5 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile Menu Icon (ONLY ICON, NO MENU YET) */}
            <span className="material-symbols-outlined md:hidden lg:hidden text-2xl cursor-pointer">
              menu
            </span>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="px-4 md:px-10 lg:px-40 py-20 flex justify-center">
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
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:bg-blue-700">
                Start Free Trial
              </button>
              <button className="border px-8 py-3 rounded-xl font-bold flex items-center gap-2">
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
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
            Features
          </span>
          <h2 className="text-3xl font-bold mt-3">Platform Benefits</h2>
          <p className="text-gray-600 mt-2">
            Everything you need to streamline your retail operations.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              ["warehouse", "Real-time Inventory"],
              ["analytics", "Smart Analytics"],
              ["point_of_sale", "POS Integration"],
            ].map(([icon, title], i) => (
              <div key={i} className="p-6 rounded-2xl border hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-gray-600 mt-2">
                  Seamlessly manage operations with powerful tools.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-20 px-4 md:px-10 lg:px-40">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>

          {[
            ["person_add", "Sign Up in Seconds"],
            ["inventory_2", "Upload Your Inventory"],
            ["storefront", "Start Selling Smarter"],
          ].map(([icon, title], i) => (
            <div key={i} className="flex gap-6 mb-10">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <span className="material-symbols-outlined">{icon}</span>
              </div>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-gray-600">
                  Simple, fast, and designed for modern retailers.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TRUSTED BY ================= */}
      <section className="bg-white py-20 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl font-bold mb-2">
            Trusted by modern retailers
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of shop owners who modernized their business.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Fashion", "Bakery", "Grocery", "Electronics"].map((item, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 rounded-xl" />
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
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold">
            Start Free Trial
          </button>
          <button className="border px-8 py-3 rounded-xl font-bold">
            Talk to Sales
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-12 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2024 RetailFlow Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            System Operational
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
