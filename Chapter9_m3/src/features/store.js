import { create } from 'zustand';
import cartItems from '../constants/cartitems';

const useStore = create((set) => ({
  cart: {
    cartItems: cartItems, 
    amount: 0,
    total: 0,
    increase: (id) =>
      set((state) => {
        const updatedCartItems = state.cart.cartItems.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        );
        return {
          cart: {
            ...state.cart,
            cartItems: updatedCartItems,
          },
        };
      }),
    decrease: (id) =>
      set((state) => {
        const updatedCartItems = state.cart.cartItems.map((item) =>
          item.id === id ? { ...item, amount: Math.max(item.amount - 1, 0) } : item
        );
        return {
          cart: {
            ...state.cart,
            cartItems: updatedCartItems,
          },
        };
      }),
    removeItem: (id) =>
      set((state) => {
        const filteredItems = state.cart.cartItems.filter((item) => item.id !== id);
        return {
          cart: {
            ...state.cart,
            cartItems: filteredItems,
          },
        };
      }),
    clearCart: () =>
      set(() => ({
        cart: {
          cartItems: [],
          amount: 0,
          total: 0,
        },
      })),
    calculateTotals: () =>
      set((state) => {
        let amount = 0;
        let total = 0;
        state.cart.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * item.price;
        });
        return {
          cart: {
            ...state.cart,
            amount,
            total,
          },
        };
      }),
  },
  modal: {
    isOpen: false,
    openModal: () =>
      set(() => ({
        modal: { isOpen: true },
      })),
    closeModal: () =>
      set(() => ({
        modal: { isOpen: false },
      })),
  },
}));

export default useStore;
