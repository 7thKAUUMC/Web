import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodoList, postTodo, deleteTodo, patchTodo, getTodo } from '../apis/todo';

export const useTodos = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { 
    data: todos = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['todos', searchTerm],
    queryFn: () => getTodoList({ title: searchTerm }),
    select: (data) => data[0] || []
  });

  const createTodoMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  const updateTodoMutation = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  const fetchTodoDetail = async (id) => {
    return await getTodo({ id });
  };

  return {
    todos,
    isLoading,
    isError,
    error,
    searchTerm,
    setSearchTerm,
    createTodoMutation,
    deleteTodoMutation,
    updateTodoMutation,
    fetchTodoDetail
  };
};