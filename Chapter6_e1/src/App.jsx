import { useContext, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import { TodoContext } from './context/TodoContext';

function App() {
  const {
    todos,
    setTodos,
    text,
    setText,
    editingId,
    setEditingId,
    editText,
    setEditText,
    handleSubmit,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useContext(TodoContext);

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={addTodo}>할 일 등록</Button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {editingId !== todo.id && (
              <div className="todo-task">
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}
            {editingId === todo.id && (
              <div className="todo-edit">
                <p>{todo.id}.</p>
                <Input 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                />
              </div>
            )}
            <Button onClick={() => deleteTodo(todo.id)}>삭제하기</Button>
            {editingId === todo.id ? (
              <Button onClick={() => updateTodo(editingId, editText)}>
                수정 완료
              </Button>
            ) : (
              <Button onClick={() => {
                setEditingId(todo.id);
                setEditText(todo.task); // 기존 항목의 내용을 editText로 설정 !!
              }}
              >
                수정 진행
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
