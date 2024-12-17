import { configureStore, createSlice } from '@reduxjs/toolkit';

// 투두리스트 slice 정의
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    }
  }
});

// 스토어 생성
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});

// 액션 export
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
