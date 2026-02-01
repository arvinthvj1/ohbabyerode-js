import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCart } from '../../services/CartContext';
import styles from './CartNotificationFooter.module.css';
import clsx from 'clsx';

const CartNotificationFooter = () => {
  const { cartNotification, dismissNotification } = useCart();

  useEffect(() => {
    if (cartNotification) {
      const timer = setTimeout(() => {
        dismissNotification();
      }, 5000); // Auto dismiss after 5 seconds if desired, or keep it sticky
      return () => clearTimeout(timer);
    }
  }, [cartNotification, dismissNotification]);

  // If no notification active, render nothing (or transparent placeholder if animating)
  if (!cartNotification) return null;

  return (
    <div className={clsx(styles.notification, cartNotification && styles.visible)}>
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
    </div>
  );
};

export default CartNotificationFooter;
