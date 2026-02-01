import { useState, useEffect } from 'react';
import HeroBanner from '../components/layout/HeroBanner';
import CategorySection from '../components/layout/CategorySection';
import ProductCard from '../components/product/ProductCard';
import { productService } from '../services/productService';
import styles from './Home.module.css';

const Home = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bs = await productService.getBestsellers();
        const na = await productService.getNewArrivals();
        setBestsellers(bs.slice(0, 4));
        setNewArrivals(na.slice(0, 4));
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      <HeroBanner />
      <CategorySection />
      
      {/* Bestsellers Section */}
      <section className={styles.productSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Bestsellers</h2>
          <div className={styles.productGrid}>
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className={styles.skeleton}></div>)
            ) : (
              bestsellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <span>🌱</span>
              <h4>Organic Cotton</h4>
              <p>100% certified skin-friendly</p>
            </div>
            <div className={styles.trustItem}>
              <span>❤️</span>
              <h4>Made with Love</h4>
              <p>Handcrafted quality</p>
            </div>
            <div className={styles.trustItem}>
              <span>🌍</span>
              <h4>World Wide Shipping</h4>
              <p>Fast & reliable delivery</p>
            </div>
            <div className={styles.trustItem}>
              <span>🚫</span>
              <h4>Simple Returns</h4>
              <p>30-day easy exchange</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className={styles.productSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>New Arrivals</h2>
          <div className={styles.productGrid}>
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className={styles.skeleton}></div>)
            ) : (
              newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterCard}>
            <h3>Join the Oh Baby! Family</h3>
            <p>Get exclusive offers, new arrival updates, and 10% off your first order!</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
