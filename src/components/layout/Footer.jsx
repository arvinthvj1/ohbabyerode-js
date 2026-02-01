import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <h2>Oh Baby!</h2>
            </Link>
            <p>Curating the softest, organic essentials for your little ones. Made with love and care.</p>
            <div className={styles.socials}>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Mail size={20} /></a>
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h3>Shop</h3>
              <ul>
                <li><Link to="/shop">All Products</Link></li>
                <li><Link to="/shop?cat=Newborn">Newborn</Link></li>
                <li><Link to="/shop?cat=Infant">Infant</Link></li>
                <li><Link to="/shop?cat=Toddler">Toddler</Link></li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">Shipping</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Oh Baby!. Made with ❤️ for little ones.</p>
          <div className={styles.legal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
