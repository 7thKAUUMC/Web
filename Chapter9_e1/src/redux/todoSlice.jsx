import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({
        id: nextId++,
        text: action.payload,
        complete: false,
      });
    },
    remove: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    complete: (state, action) => {
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, complete: !todo.complete } : todo
      );
    },
  },
});

export const { add, remove, complete } = todoSlice.actions;
export default todoSlice.reducer;
