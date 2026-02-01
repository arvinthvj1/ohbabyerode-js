import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import styles from './HeroBanner.module.css';
import clsx from 'clsx';

const HeroBanner = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={clsx("container", styles.container)}>
        <div className={styles.content}>
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.subheadline}
          >
            {/* New Collection 2024 */}
          </motion.h4>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.headline}
          >
            Softest Touch for <br />
            <span>Your Little Ones</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.description}
          >
            Discover our curated collection of 100% organic cotton baby clothing. 
            Designed for comfort, styled for joy.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/shop">
              <Button size="lg" className={styles.cta}>
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
