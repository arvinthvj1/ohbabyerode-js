import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, X } from 'lucide-react';
import styles from './Toast.module.css';
import { useCart } from '../../services/CartContext';

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className={styles.successIcon} size={20} />,
    info: <Info className={styles.infoIcon} size={20} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={styles.toast}
    >
      <div className={styles.icon}>{icons[type] || icons.success}</div>
      <p className={styles.message}>{message}</p>
      <button onClick={onClose} className={styles.closeBtn}>
        <X size={16} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toast, showToast } = useCart();

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {toast && (
          <Toast 
            key={toast.message} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => {}} // Timeout handles it, or could add manual close
          />
        )}
      </AnimatePresence>
    </div>
  );
};
