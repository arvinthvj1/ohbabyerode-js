import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../services/CartContext';
import styles from './CartNotificationFooter.module.css';
import clsx from 'clsx';

const CartNotificationFooter = () => {
  const { cartNotification, dismissNotification } = useCart();

  useEffect(() => {
    if (cartNotification) {
      const timer = setTimeout(() => {
        dismissNotification();
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [cartNotification, dismissNotification]);

  return (
    <AnimatePresence>
      {cartNotification && (
        <motion.div 
          className={clsx(styles.notification, styles.visible)}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className={styles.content}>
            {cartNotification.image && (
              <div className={styles.imageWrapper}>
                <img src={cartNotification.image} alt="Product" />
              </div>
            )}
            <div className={styles.message}>
              <span className={styles.title}>Added to Cart</span>
              <span className={styles.subtitle}>{cartNotification.name} ({cartNotification.size})</span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <Link 
              to="/cart" 
              className={styles.viewCartBtn}
              onClick={dismissNotification}
            >
              View Cart
            </Link>
            <button 
              className={styles.closeBtn} 
              onClick={dismissNotification}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotificationFooter;
