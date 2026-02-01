import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../services/CartContext';
import clsx from 'clsx';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import logoImg from '../../assets/images/logo/ohbabytransparentlogo.png';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/shop' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
      <div className={clsx("container", styles.container)}>
        <Link to="/" className={styles.logo}>
          <img src={logoImg} alt="Oh Baby! Logo" className={styles.logoImage} />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeSwitcher />
          <Link to="/cart" className={styles.iconButton}>
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </Link>
          <button 
            className={clsx(styles.iconButton, styles.mobileMenuBtn)}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={styles.mobileNav}
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => clsx(styles.mobileNavLink, isActive && styles.active)}
              >
                {link.title}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
