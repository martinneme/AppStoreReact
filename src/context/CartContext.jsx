import { createContext } from "react";
import { useState } from "react";

export const cartContext = createContext();
const Provider = cartContext.Provider;

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [countCart, setCountCart] = useState(0)


  const addToCart = (item, quantity) => {
    if (isInCart(item.id)) {
      const newCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.quantity+=quantity;
        }
        return cartItem;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: quantity }]);
    }
    setCountCart(countCart+quantity)
  };

  const clearCart = () => {
    setCart([]);
    setCountCart(0)
  }

  const removeItemCart = (id) => {

    if (isInCart(id)) {
      const itemDel = cart.find((itemCart) => itemCart.id === id);
    setCountCart(countCart-itemDel.quantity)
      const newCart = cart.filter((itemCart) => itemCart.id !== id);
      setCart(newCart);
  
    } else {
      console.error("no existe este objeto en el carrito");
    }
  };

  const suma = () => {
    return cart.reduce((acc, prod) => acc += prod.price*prod.quantity, 0 )
  }

  const isInCart = (id) => {
    return cart.find((item) => item.id === id);
  };

  return (
    <Provider value={{ addToCart, removeItemCart, clearCart, cart,countCart,suma}}>
      {children}
    </Provider>
  );
}
