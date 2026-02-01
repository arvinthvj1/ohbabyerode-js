import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { CartProvider } from './services/CartContext';
import { ToastContainer } from './components/ui/Toast';
import CartNotificationFooter from './components/ui/CartNotificationFooter';
import ScrollToTop from './components/ui/ScrollToTop';
import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className="app-wrapper">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<div style={{ padding: '100px 0', textAlign: 'center' }}><h1>Contact Page coming soon</h1></div>} />
            </Routes>
          </main>
          <Footer />
          <CartNotificationFooter />
          <ToastContainer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
