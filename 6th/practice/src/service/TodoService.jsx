export const addTodo = (todos, setTodos, text, setText) => {
  setTodos((prev) => [
    ...prev,
    { id: Math.floor(Math.random() * 100) + 2, task: text },
  ]);
  setText("");
};

export const deleteTodo = (id, setTodos) => {
  setTodos((prev) => prev.filter((item) => item.id !== id));
};

export const updateTodo = (id, text, setTodos, setEditingId) => {
  setTodos((prev) =>
    prev.map((item) => (item.id === id ? { ...item, task: text } : item))
  );
  setEditingId("");
};
