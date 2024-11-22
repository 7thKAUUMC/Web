import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react"
import styled from "styled-components"
import { deleteTodo, getTodoList, patchTodo, postTodo } from "./apis/todo";
import { queryClient } from "./main";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

  const {data:todos, isPending} = useQuery({
      queryFn: () => getTodoList({title: search}),
      queryKey: ["todos", search],
  });

  const { mutate:postTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled:() => {}
  });

  const { mutate:deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["todos"],
      });
    },
  });

  const { mutate:patchTodoMutation } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["todos"],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content);
    postTodoMutation({title, content});
  };


  return (
    <>
      <h1>Todo</h1>
      <Input
        style={{marginBottom: "10px"}} 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} />
      <Form onSubmit={handleSubmit}>
        <Input 
          name="title"
          placeholder="제목을 입력해주세요"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}/>
        <Input 
          name="content"
          placeholder="컨텐츠를 입력해주세요"
          value={content} 
          onChange={(e) => setContent(e.target.value)}/>
        <Button type="submit">투두 생성</Button>
      </Form>
      {isPending ? (
        <div>로딩중입니다.</div>
      ):(
        <Container>
          {todos[0]?.map((todo) => {
            console.log(todo);
            return ( 
              <TodoContainer key={todo.id}>
                <input type="checkbox" defaultChecked={todo.checked} onChange={(e) => patchTodoMutation({id: todo.id, checked: !todo.checked})}/>
                <div>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </div>
                <button onClick={() => deleteTodoMutation({id:todo.id})}>삭제하기</button>
              </TodoContainer>
            );
          })}
        </Container>
      )}
    </>
  );
}

export default App

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #7a42f4;
    outline: none;
    box-shadow: 0 0 4px rgba(122, 66, 244, 0.2);
  }
`;

const Button = styled.button`
  border-radius: 8px;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #4d4d4d;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #3d3d3d;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  div {
    flex: 1;

    p {
      margin: 0;
      color: #333;
    }

    p:first-child {
      font-weight: bold;
      font-size: 18px;
    }

    p:last-child {
      font-size: 14px;
      color: #666;
    }
  }

  button {
    padding: 8px 12px;
    background-color: #ff5252;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e64545;
    }
  }
`;