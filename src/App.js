import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import EditProduct from "./components/EditProduct";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">React Product Management</h1>
        </header>
        <section className="app-menu">
          <div className="menu-card" onClick={() => window.location.href = "/"}>
            <h2>Product List</h2>
            <p>View all available products.</p>
          </div>
          <div className="menu-card" onClick={() => window.location.href = "/add-product"}>
            <h2>Add Product</h2>
            <p>Add a new product to the inventory.</p>
          </div>
        </section>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/edit-product/:sku" element={<EditProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
