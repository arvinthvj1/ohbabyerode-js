import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../services/CartContext';
import Button from '../components/ui/Button';
import CountUp from '../components/ui/CountUp';
import styles from './Cart.module.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, itemCount } = useCart();
  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1 className={styles.title}>Shopping Cart</h1>

        {cart.length > 0 ? (
          <div className={styles.cartGrid}>
            {/* Items List */}
            <div className={styles.itemsList}>
              <div className={styles.listHeader}>
                <span>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
                <button onClick={clearCart} className={styles.clearBtn}>Clear All</button>
              </div>

              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={styles.cartItem}
                  >
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemHeader}>
                        <h3>{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className={styles.removeBtn}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className={styles.itemMeta}>Size: {item.selectedSize}</p>
                      
                      <div className={styles.itemActions}>
                        <div className={styles.qtyControl}>
                          <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}>
                            <Minus size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}>
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className={styles.priceGroup}>
                          <p className={styles.itemPrice}>
                            <CountUp value={item.price * item.quantity} prefix="₹" />
                          </p>
                          {item.originalPrice && (
                            <p className={styles.oldPrice}>
                               <CountUp value={item.originalPrice * item.quantity} prefix="₹" />
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className={styles.summarySection}>
              <div className={styles.summaryCard}>
                <h2>Order Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span><CountUp value={subtotal} prefix="₹" /></span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span><CountUp value={shipping} prefix="₹" /></span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span><CountUp value={total} prefix="₹" /></span>
                </div>
                
                <Button variant="primary" className={styles.checkoutBtn}>
                  PROCEED TO CHECKOUT
                </Button>
                
                <Link to="/shop" className={styles.continueLink}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.emptyCart}
          >
            <div className={styles.emptyIcon}>
              <ShoppingBag size={64} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop">
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
