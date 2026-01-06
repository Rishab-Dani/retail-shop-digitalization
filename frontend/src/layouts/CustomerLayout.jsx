import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const CustomerLayout = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* HEADER */}
      <Header
        cartCount={cart.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet context={{ cart, setCart, searchQuery }} />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default CustomerLayout;
