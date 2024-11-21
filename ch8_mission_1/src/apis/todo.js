import axiosInstance from "../utils/axiosInstance";

export const postTodo = async ({ title, content, checked = false }) => {
    const { data } = await axiosInstance.post("/todo", {
        title,
        content,
        checked,
    });
    return data;
};

export const getTodoList = async ({ title = '' }) => {
    const { data } = await axiosInstance.get(`/todo${title ? `?title=${title}` : ''}`);
    return data;
};

export const getTodo = async ({ id }) => {
    const { data } = await axiosInstance.get(`/todo/${id}`);
    return data;
};

export const patchTodo = async ({ id, title, content, checked }) => {
    const { data } = await axiosInstance.patch(`/todo/${id}`, {
        ...(title && { title }),
        ...(content && { content }),
        ...(checked !== undefined && { checked }),
    });
    return data;
};

export const deleteTodo = async ({ id }) => {
    const { data } = await axiosInstance.delete(`/todo/${id}`);
    return data;
};