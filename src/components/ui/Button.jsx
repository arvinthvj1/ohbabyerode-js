import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  onClick,
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
