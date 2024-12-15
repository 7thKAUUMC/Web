import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/todoSlice';
import './InputTodo.css';

export default function InputTodo() {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAdd = e => {
    e.preventDefault();
    if (task.trim() === '') {
      alert('Please enter a task');
      return;
    }
    dispatch(add(task));
    setTask('');
  };

  return (
    <div className="input-container">
      <form onSubmit={handleAdd}>
        <input
          type="text"
          className="input-box"
          placeholder="할 일을 입력해주세요."
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button type="submit" className="add-btn">추가</button>
      </form>
    </div>
  );
}
