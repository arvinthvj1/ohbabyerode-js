import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AnimatedRoutes from './components/layout/AnimatedRoutes';
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
            <AnimatedRoutes />
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
