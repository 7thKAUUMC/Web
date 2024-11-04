import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';

function App() {
  const [todos, setTodos] = useState([{ id: 1, task: '투두 만들어보기' }]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  // 렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 1. 추가하기
  const addTodo = () => {
    const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    setTodos((prev) => [...prev, { id: nextId, task: text }]);
    setText('');
  };

  // 2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // 3. 수정하기
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId('');
  };

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
