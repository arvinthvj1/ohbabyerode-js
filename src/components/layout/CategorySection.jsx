import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './CategorySection.module.css';

const categories = [
  { id: 'cat_1', name: 'Newborn', age: '0-3 Months', image: '/images/categories/cat-newborn.jpg' },
  { id: 'cat_2', name: 'Infant', age: '3-12 Months', image: '/images/categories/cat-infant.jpg' },
  { id: 'cat_3', name: 'Toddler', age: '1-3 Years', image: '/images/categories/cat-toddler.jpg' },
  { id: 'cat_4', name: 'Kids', age: '3-6 Years', image: '/images/categories/cat-kids.jpg' },
];

const CategorySection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2>Shop by Age</h2>
          <p>Find the perfect fit for every stage of growth</p>
        </div>
        
        <div className={styles.grid}>
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={styles.cardItem}
            >
              <Link to={`/shop?cat=${cat.name}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={cat.image} alt={cat.name} />
                </div>
                <h3>{cat.name}</h3>
                <span>{cat.age}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
