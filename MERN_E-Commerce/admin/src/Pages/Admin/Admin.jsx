import React from "react";
import { Routes, Route } from "react-router-dom";
// import Sidebar from "../../components/Sidebar/Sidebar";
import Sidebar from "../../Components/Sidebar/Sidebar";
// import AddProduct from "../../components/AddProduct/AddProduct";
import AddProduct from "../../Components/AddProduct/AddProduct";

// import ListProduct from "../../components/ListProduct/ListProduct"
import ListProduct from "../../Components/ListProduct/ListProduct";

import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
