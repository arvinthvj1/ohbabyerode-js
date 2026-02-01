import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.home}>
      <HeroBanner />
      <CategorySection />
      
      {/* Bestsellers Section */}
      <section className={styles.productSection}>
        <div className="container">
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Bestsellers
          </motion.h2>
          <motion.div 
            className={styles.productGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className={styles.skeleton}></div>)
            ) : (
              bestsellers.map(product => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className={styles.trustSection}>
        <div className="container">
          <motion.div 
            className={styles.trustGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.trustItem} variants={itemVariants}>
              <span>🌱</span>
              <h4>Organic Cotton</h4>
              <p>100% certified skin-friendly</p>
            </motion.div>
            <motion.div className={styles.trustItem} variants={itemVariants}>
              <span>❤️</span>
              <h4>Made with Love</h4>
              <p>Handcrafted quality</p>
            </motion.div>
            <motion.div className={styles.trustItem} variants={itemVariants}>
              <span>🌍</span>
              <h4>World Wide Shipping</h4>
              <p>Fast & reliable delivery</p>
            </motion.div>
            <motion.div className={styles.trustItem} variants={itemVariants}>
              <span>🚫</span>
              <h4>Simple Returns</h4>
              <p>30-day easy exchange</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className={styles.productSection}>
        <div className="container">
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            New Arrivals
          </motion.h2>
          <motion.div 
            className={styles.productGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className={styles.skeleton}></div>)
            ) : (
              newArrivals.map(product => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <motion.div 
            className={styles.newsletterCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Join the Oh Baby! Family</h3>
            <p>Get exclusive offers, new arrival updates, and 10% off your first order!</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
