import { Routes, Route } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import ListProduct from "../components/ListProduct";
import Orders from "../components/Orders";
const Admin = () => {
  return (
    <div className="lg:flex">
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/" element={<ListProduct />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default Admin;
