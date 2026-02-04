import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminProductsPage from './pages/AdminProductsPage.jsx';
import AdminOrdersPage from './pages/AdminOrdersPage.jsx';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav">
          <Link to="/" className="nav-logo">
            Syntecxhub Store
          </Link>
          <div className="nav-links">
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/admin/products">Admin</Link>
          </div>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
