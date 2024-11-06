import React from 'react';
import './App.css';
import Button from './Button_c';
import Input from './Input';
import { useTodo } from './contexts/TodoContext';

function App() {
  const { 
    todos, 
    text, 
    setText, 
    editingId, 
    editText, 
    setEditText,
    addTodo,
    deleteTodo,
    updateTodo,
    setEditingId 
  } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <Button className='upload_todo' onClick={addTodo} label="할 일 등록" />
      </form>
      <div>
        {todos.map((todo) => (
          <div style={{ display: 'flex', gap: '20px' }} key={todo.id}>
            {editingId !== todo.id && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}
            {editingId === todo.id && (
              <div style={{ display: 'flex', gap: '20px' }}>
                <p>{todo.id}.</p>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}
            <Button className='Del' onClick={() => deleteTodo(todo.id)} label="삭제하기" />
            {editingId === todo.id ? (
              <Button className='fix_end' onClick={() => updateTodo(editingId, editText)} label="수정 완료" />
            ) : (
              <Button className='fixing' onClick={() => setEditingId(todo.id)} label="수정 진행" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;