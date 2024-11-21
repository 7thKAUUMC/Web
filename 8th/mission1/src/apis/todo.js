import axiosInstance from "./axiosInstance";

// todo 생성
const postTodo = async ({ title, content, checked = false }) => {
  const { data } = await axiosInstance.post("/todo", {
    title,
    content,
    checked,
  });
  return data;
};

// todo list 가져오기
const getTodoList = async ({ title }) => {
  let url = "/todo";

  if (title) {
    url += `?title=${title}`;
  }

  const { data } = await axiosInstance.get(url);

  return data;
};

// todo 하나 가져오기
const getTodo = async ({ id }) => {
  const { data } = await axiosInstance.get(`/todo/${id}`);
  return data;
};

// todo 수정
const patchTodo = async ({ id, title, content, checked }) => {
  const { data } = await axiosInstance.patch(`/todo/${id}`, {
    title,
    content,
    checked,
  });
  return data;
};

// todo 삭제
const deleteTodo = async ({ id }) => {
  await axiosInstance.delete(`/todo/${id}`);
};

export { postTodo, getTodoList, getTodo, patchTodo, deleteTodo };
