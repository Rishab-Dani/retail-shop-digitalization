import { BrowserRouter, Routes, Route} from "react-router-dom";
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
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import AddProduct from "./pages/Admin/AddProduct";
import Orders from "./pages/Admin/Orders";
import Customers from "./pages/Admin/Customers";
import Reports from "./pages/Admin/Reports";
import Analytics from "./pages/Admin/Analytics";
import Settings from "./pages/Admin/Setting";
import Profile from "./pages/Admin/Profile";
import AddOrders from "./pages/Admin/AddOrders";
import AddCustomers from "./pages/Admin/AddCustomers";

// Customer pages
import ProductList from "./pages/Customer/ProductList";
import ProductDetails from "./pages/Customer/ProductDetails";
import Cart from "./pages/Customer/Cart";
import Checkout from "./pages/Customer/Checkout";
import OrderSuccess from "./pages/Customer/OrderSuccess"



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
          <Route path="/admin-products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-products" element={<AddProduct />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addOrders" element={<AddOrders />} />
          <Route path="/addCustomers" element={<AddCustomers />} />
        </Route>

         {/* CUSTOMER ROUTES */}
<Route path="/customer" element={<CustomerLayout />}>
  <Route path="products" element={<ProductList />} />
  <Route path="product/:id" element={<ProductDetails />} />
   <Route path="cart" element={<Cart />} />
 <Route path="checkout" element={<Checkout />}/>
 <Route path="order-success" element={<OrderSuccess />}/>
{/* <Route path="profile" element={<CustomerProfile />} /> */}
</Route>
</Routes>
    </BrowserRouter>
  );
}



export default App;


