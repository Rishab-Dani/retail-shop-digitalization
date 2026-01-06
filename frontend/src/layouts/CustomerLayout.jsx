import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default CustomerLayout;
