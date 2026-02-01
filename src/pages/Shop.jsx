import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, X, Check } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { productService } from '../services/productService';
import Button from '../components/ui/Button';
import styles from './Shop.module.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    category: searchParams.get('cat') || 'All',
    size: 'All',
    color: 'All',
    sort: 'Featured'
  });

  const categories = ['All', 'Newborn', 'Infant', 'Toddler'];
  const sizes = ['All', '0-3M', '3-6M', '6-12M', '1-2Y', '2Y', '3Y'];
  const colors = ['All', 'White', 'Pink', 'Mint', 'Coral', 'Blue', 'Yellow', 'Beige', 'Sage'];
  const sorts = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'];

  // Sync state when URL params change
  useEffect(() => {
    const catParam = searchParams.get('cat') || 'All';
    if (catParam !== filters.category) {
      setFilters(prev => ({ ...prev, category: catParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.filterProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update URL if category changes
    if (key === 'category') {
      if (value === 'All') {
        searchParams.delete('cat');
      } else {
        searchParams.set('cat', value);
      }
      setSearchParams(searchParams);
    }
  };

  const FilterGroups = () => (
    <>
      <div className={styles.filterGroup}>
        <label>Category</label>
        <select 
          value={filters.category} 
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      
      <div className={styles.filterGroup}>
        <label>Size</label>
        <select 
          value={filters.size} 
          onChange={(e) => handleFilterChange('size', e.target.value)}
        >
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Color</label>
        <select 
          value={filters.color} 
          onChange={(e) => handleFilterChange('color', e.target.value)}
        >
          {colors.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Sort By</label>
        <select 
          value={filters.sort} 
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          {sorts.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </>
  );

  return (
    <div className={styles.shopPage}>
      <header className={styles.header}>
        <div className="container">
          <h1>All Products</h1>
          <p>Discover our curated collection of soft, organic clothing for your little ones</p>
        </div>
      </header>

      {/* Desktop Filters (Hidden on Mobile) */}
      <section className={styles.filtersSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <FilterGroups />
          </div>
          
          <div className={styles.resultsInfo}>
            Showing {products.length} products
          </div>
        </div>
      </section>

      {/* Mobile Floating Filter Button */}
      <button 
        className={styles.fab} 
        onClick={() => setShowMobileFilters(true)}
      >
        <Sliders size={20} />
        <span>Filters</span>
        {products.length > 0 && <span className={styles.fabBadge}>{products.length}</span>}
      </button>

      {/* Mobile Filter Modal/Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className={styles.modalWrapper}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.overlay}
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={styles.drawer}
            >
              <div className={styles.drawerHeader}>
                <h2>Filters & Sort</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className={styles.drawerBody}>
                <FilterGroups />
              </div>

              <div className={styles.drawerFooter}>
                <Button 
                  variant="primary" 
                  fullWidth 
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply Filters
                </Button>
                <button 
                  className={styles.clearBtn}
                  onClick={() => {
                    setFilters({ category: 'All', size: 'All', color: 'All', sort: 'Featured' });
                    setShowMobileFilters(false);
                  }}
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className={styles.productsSection}>
        <div className="container">
          {loading ? (
            <div className={styles.productGrid}>
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className={styles.skeleton}></div>)}
            </div>
          ) : products.length > 0 ? (
            <div className={styles.productGrid}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No products found</h3>
              <p>Try adjusting your filters to find what you're looking for.</p>
              <Button variant="outline" onClick={() => setFilters({
                category: 'All',
                size: 'All',
                color: 'All',
                sort: 'Featured'
              })}>
                Clear All Filters
              </Button>
            </div>
          )}
          
          {products.length > 0 && !loading && (
            <div className={styles.pagination}>
              <Button variant="primary">Load More Products</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
