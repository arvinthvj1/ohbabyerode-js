import clsx from 'clsx';
import styles from './Skeleton.module.css';

const Skeleton = ({ width, height, borderRadius, className, style }) => {
  return (
    <div 
      className={clsx(styles.skeleton, className)}
      style={{ 
        width, 
        height, 
        borderRadius: borderRadius || '4px',
        ...style 
      }}
    />
  );
};

export default Skeleton;
