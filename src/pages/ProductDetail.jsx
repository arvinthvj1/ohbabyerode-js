import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, ChevronRight } from 'lucide-react';
import { productService } from '../services/productService';
import { useCart } from '../services/CartContext';
import Button from '../components/ui/Button';
import styles from './ProductDetail.module.css';
import clsx from 'clsx';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await productService.getBySlug(slug);
      setProduct(data);
      if (data && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError('');
    addToCart(product, quantity, selectedSize);
  };

  if (loading) return <div className={styles.loading}>Loading product...</div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div className={styles.productPage}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs}>
          <Link to="/">Home</Link> <ChevronRight size={14} />
          <Link to="/shop">Shop</Link> <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>

        <div className={styles.mainGrid}>
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.imageSection}
          >
            <div className={styles.mainImage}>
              <img src={product.image} alt={product.name} />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.infoSection}
          >
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.priceContainer}>
              <span className={styles.price}>₹{product.price}</span>
              {product.originalPrice && (
                <span className={styles.oldPrice}>₹{product.originalPrice}</span>
              )}
            </div>
            
            <p className={styles.description}>{product.description}</p>

            <div className={styles.selectionGroup}>
              <label>Select Size <span>*</span></label>
              <div className={styles.sizeGrid}>
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className={clsx(styles.sizeBtn, selectedSize === size && styles.active)}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className={styles.errorMsg}>{error}</p>}
            </div>

            <div className={styles.selectionGroup}>
              <label>Available Colors</label>
              <p className={styles.colors}>{product.colors.join(', ')}</p>
            </div>

            <div className={styles.selectionGroup}>
              <label>Quantity</label>
              <div className={styles.qtySelector}>
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}><Minus size={18} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={18} /></button>
              </div>
            </div>

            <div className={styles.actions}>
              <Button 
                variant="outline" 
                className={styles.actionBtn}
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
              <Button 
                variant="primary" 
                className={styles.actionBtn}
              >
                BUY NOW
              </Button>
            </div>

            {/* Product Details Accordion/List */}
            <div className={styles.detailsList}>
              <h3>Product Details</h3>
              <ul>
                <li><strong>Material:</strong> {product.details.material}</li>
                <li><strong>Care:</strong> {product.details.care}</li>
                <li><strong>Age Group:</strong> {product.details.ageGroup}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
