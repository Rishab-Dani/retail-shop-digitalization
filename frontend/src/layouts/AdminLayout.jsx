import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#f6f7fb] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

