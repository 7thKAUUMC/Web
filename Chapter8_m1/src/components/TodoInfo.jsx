import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/customFetchHook';
import * as S from '../styles/TodoInfo.style';

const TodoInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: todo, loading, error, refetch } = useFetch(
        `http://localhost:3000/todo/${id}`,
        { method: 'GET' }
    );
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleUpdate = async () => {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        if (response.ok) {
            setEditMode(false);
            refetch();
        }
    };

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) navigate('/');
    };

    if (loading) return <S.Loader>Loading...</S.Loader>;
    if (error) return <S.Error>{error}</S.Error>;

    return (
        <S.Container>
            <S.h1>ToDo #{todo.id}</S.h1>
            {editMode ? (
                <>
                    <S.Input
                        defaultValue={todo.title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <S.Input
                        defaultValue={todo.content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <S.h2>{todo.title}</S.h2>
                    <S.pt>{todo.content}</S.pt>
                </>
            )}
            <p>생성일: {new Date(todo.createdAt).toLocaleString()}</p>
            <p>수정일: {new Date(todo.updatedAt).toLocaleString()}</p>
            <p>{todo.checked ? 'Finished!' : 'Unfinished. 할일을 하자'}</p>
            {editMode ? (
                <S.Button onClick={handleUpdate}>수정완료</S.Button>
            ) : (
                <S.Button onClick={() => setEditMode(true)}>수정</S.Button>
            )}
            <S.Button onClick={handleDelete}>삭제</S.Button>
            <S.Button onClick={() => navigate('/')}>목록으로</S.Button>
        </S.Container>
    );
};

export default TodoInfo;
