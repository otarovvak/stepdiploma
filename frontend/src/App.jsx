import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart-page";

  return (
    <main className="bg-primary text-tertiary min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Category />} />

          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart-page" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {isCartPage ? (
        <Footer containerStyles="fixed bottom-0 left-0 right-0" />
      ) : (
        <Footer />
      )}
    </main>
  );
};

const MainApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default MainApp;
