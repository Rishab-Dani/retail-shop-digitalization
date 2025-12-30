import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
