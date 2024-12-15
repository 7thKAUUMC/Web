import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, complete } from '../redux/todoSlice';
import './TodoList.css';

export default function TodoList() {
  const todos = useSelector(state => state.todo);
  const dispatch = useDispatch();

  return (
    <div className="todo-list">
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => dispatch(complete(todo.id))}
              className="todo-checkbox"
            />
            <span className={todo.complete ? 'completed' : ''}>
              {todo.text}
            </span>
            <button
              className="delete-btn"
              onClick={() => dispatch(remove(todo.id))}
            >
              &#x2715;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
