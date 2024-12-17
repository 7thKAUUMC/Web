import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItems';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: cartItems,
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    increment: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    decrement: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;
      state.items.forEach(item => {
        totalAmount += item.amount;
        totalPrice += item.amount * parseFloat(item.price);
      });
      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    },
  },
});

export const { increment, decrement, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;