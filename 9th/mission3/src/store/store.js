import { create } from "zustand";
import cartItems from "../constants/cartItems";

const useStore = create((set) => ({
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isOpen: false,
  increase: (id) =>
    set((state) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === id);
      item.amount += 1;
      return { cartItems: [...state.cartItems] };
    }),
  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === id);
      item.amount -= 1;
      return { cartItems: [...state.cartItems] };
    }),
  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((cartItem) => cartItem.id !== id),
    })),
  clearCart: () => set({ cartItems: [] }),
  calculateTotals: () =>
    set((state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });
      return { amount, total };
    }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useStore;
