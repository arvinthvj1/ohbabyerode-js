import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`} className={styles.cardLink}>
      <motion.div 
        whileHover={{ y: -10 }}
        className={styles.card}
      >
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} />
        <div className={styles.badges}>
          {product.badges.map((badge, idx) => (
            <Badge key={idx} variant={badge}>{badge}</Badge>
          ))}
        </div>
      </div>
      
      <div className={styles.info}>
        <h3>{product.name}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.price}>₹{product.price}</span>
          {product.originalPrice && (
            <span className={styles.oldPrice}>₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  </Link>
);
};

export default ProductCard;
