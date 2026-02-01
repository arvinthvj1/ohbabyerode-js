import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../../pages/Home';
import Shop from '../../pages/Shop';
import ProductDetail from '../../pages/ProductDetail';
import Cart from '../../pages/Cart';
import About from '../../pages/About';
import PageTransition from './PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          } 
        />
        <Route 
          path="/shop" 
          element={
            <PageTransition>
              <Shop />
            </PageTransition>
          } 
        />
        <Route 
          path="/product/:slug" 
          element={
            <PageTransition>
              <ProductDetail />
            </PageTransition>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageTransition>
              <About />
            </PageTransition>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PageTransition>
              <div style={{ padding: '100px 0', textAlign: 'center' }}>
                <h1>Contact Page coming soon</h1>
              </div>
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
