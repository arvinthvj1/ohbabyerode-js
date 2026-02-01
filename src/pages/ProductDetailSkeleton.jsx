import Skeleton from '../components/ui/Skeleton';
import styles from './ProductDetail.module.css';

const ProductDetailSkeleton = () => {
  return (
    <div className={styles.productPage}>
      <div className="container">
        {/* Breadcrumbs Skeleton */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <Skeleton width="50px" height="16px" /> 
            <Skeleton width="16px" height="16px" />
            <Skeleton width="50px" height="16px" />
            <Skeleton width="16px" height="16px" />
            <Skeleton width="100px" height="16px" />
        </div>

        <div className={styles.mainGrid}>
          {/* Image Section Skeleton */}
          <div className={styles.imageSection}>
            <Skeleton width="100%" height="500px" borderRadius="12px" />
          </div>

          {/* Info Section Skeleton */}
          <div className={styles.infoSection}>
            {/* Title */}
            <Skeleton width="80%" height="32px" style={{ marginBottom: '16px' }} />
            
            {/* Price */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <Skeleton width="80px" height="32px" />
                <Skeleton width="60px" height="32px" />
            </div>
            
            {/* Description */}
            <div style={{ marginBottom: '32px' }}>
                <Skeleton width="100%" height="16px" style={{ marginBottom: '8px' }} />
                <Skeleton width="100%" height="16px" style={{ marginBottom: '8px' }} />
                <Skeleton width="70%" height="16px" />
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: '24px' }}>
                <Skeleton width="80px" height="20px" style={{ marginBottom: '12px' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Skeleton width="50px" height="40px" borderRadius="8px" />
                    <Skeleton width="50px" height="40px" borderRadius="8px" />
                    <Skeleton width="50px" height="40px" borderRadius="8px" />
                    <Skeleton width="50px" height="40px" borderRadius="8px" />
                </div>
            </div>

             {/* Colors */}
             <div style={{ marginBottom: '24px' }}>
                <Skeleton width="100px" height="20px" style={{ marginBottom: '8px' }} />
                <Skeleton width="150px" height="20px" />
             </div>

            {/* Quantity */}
            <div style={{ marginBottom: '32px' }}>
                 <Skeleton width="80px" height="20px" style={{ marginBottom: '12px' }} />
                 <Skeleton width="120px" height="40px" borderRadius="8px" />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
                <Skeleton width="100%" height="50px" borderRadius="50px" />
                <Skeleton width="100%" height="50px" borderRadius="50px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
