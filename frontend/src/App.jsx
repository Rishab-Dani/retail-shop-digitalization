import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Private pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Setting";
import Profile from "./pages/Profile";
import AddOrders from "./pages/AddOrders";
import AddCustomers from "./pages/AddCustomers";

// Customer pages
import ProductList from "./pages/customer/ProductList";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addProducts" element={<AddProduct />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addOrders" element={<AddOrders />} />
          <Route path="/addCustomers" element={<AddCustomers />} />
        </Route>

         {/* Customer ROUTES */}
         <Route element={<CustomerLayout />}>
           <Route path="/customer/productlist" element={<ProductList />} />
           {/*
           <Route path="/customer/cart" element={<Orders />} />
           <Route path="/customer/profile" element={<Profile />} /> */}
         </Route>



      </Routes>
    </BrowserRouter>
  );
}



export default App;


