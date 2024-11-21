import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/customFetchHook';
import * as S from '../styles/TodoList.style';

const TodoList = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [search, setSearch] = useState('');
    const [todos, setTodos] = useState([]);
    const [editStates, setEditStates] = useState({}); // 각 todo의 상태를 관리
    const navigate = useNavigate();

    const { data, loading, error, refetch } = useFetch(
        `http://localhost:3000/todo${search ? `?title=${search}` : ''}`,
        { method: 'GET' }
    );

    useEffect(() => {
        if (data) {
            setTodos(data[0] || []);
            const initialEditStates = data[0]?.reduce((acc, todo) => {
                acc[todo.id] = { isEditing: false, title: todo.title, content: todo.content };
                return acc;
            }, {});
            setEditStates(initialEditStates || {});
        }
    }, [data]);

    const handleCreate = async () => {
        const response = await fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        if (response.ok) {
            setTitle('');
            setContent('');
            refetch();
        }
    };

    const handleUpdate = async (id, updatedTodo) => {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo),
        });
        if (response.ok) {
            refetch();
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) refetch();
    };

    const toggleEditMode = (id) => {
        setEditStates((prev) => ({
            ...prev,
            [id]: { ...prev[id], isEditing: !prev[id].isEditing },
        }));
    };

    const handleEditChange = (id, key, value) => {
        setEditStates((prev) => ({
            ...prev,
            [id]: { ...prev[id], [key]: value },
        }));
    };

    const handleCheckboxToggle = async (id, checked) => {
        await handleUpdate(id, { checked });
    };

    return (
        <S.Container>
            <S.Create>
              <S.Title>TODO LIST</S.Title>
              <S.Input
                  placeholder="제목을 입력해주세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
              <S.Input
                  placeholder="내용을 입력해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
              />
              <S.Button disabled={!title || !content} onClick={handleCreate}>
                  ToDo 생성
              </S.Button>
              <S.Input
                  placeholder="검색어를 입력하세요"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
            </S.Create>
            <S.List>
                {todos.map((todo) => (
                    <S.Item key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.checked}
                            onChange={() => handleCheckboxToggle(todo.id, !todo.checked)}
                        />
                        {editStates[todo.id]?.isEditing ? (
                            <>
                                <S.EditInput
                                    value={editStates[todo.id]?.title || ''}
                                    onChange={(e) => handleEditChange(todo.id, 'title', e.target.value)}
                                />
                                <S.EditInput
                                    value={editStates[todo.id]?.content || ''}
                                    onChange={(e) => handleEditChange(todo.id, 'content', e.target.value)}
                                />
                                <S.Button
                                    onClick={() => {
                                        const { title, content } = editStates[todo.id];
                                        handleUpdate(todo.id, { title, content });
                                        toggleEditMode(todo.id);
                                    }}
                                >
                                  수정완료
                                </S.Button>
                            </>
                        ) : (
                            <>
                                <span onClick={() => navigate(`/todo/${todo.id}`)}>{todo.title}</span>
                                <span>{todo.content}</span>
                                <S.Button onClick={() => toggleEditMode(todo.id)}>수정</S.Button>
                            </>
                        )}
                        <S.Button onClick={() => handleDelete(todo.id)}>삭제</S.Button>
                    </S.Item>
                ))}
            </S.List>
        </S.Container>
    );
};

export default TodoList;
