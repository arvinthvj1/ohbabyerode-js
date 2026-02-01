import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('ohbaby_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('ohbaby_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, quantity, size) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prev, { ...product, quantity, selectedSize: size }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      (item.id === productId && item.selectedSize === size) 
        ? { ...item, quantity } 
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'info');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      subtotal,
      itemCount,
      toast,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};
