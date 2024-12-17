import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, complete: false });
    },
    remove: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    complete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.complete = !todo.complete;
      }
    },
  },
});

export const { add, remove, complete } = todoSlice.actions;
export default todoSlice.reducer;
