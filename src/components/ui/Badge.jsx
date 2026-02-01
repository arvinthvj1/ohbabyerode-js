import clsx from 'clsx';
import styles from './Badge.module.css';

const Badge = ({ children, variant = 'new', className }) => {
  return (
    <div className={clsx(styles.badge, styles[variant.toLowerCase().replace(' ', '')], className)}>
      {children}
    </div>
  );
};

export default Badge;
