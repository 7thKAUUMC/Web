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
      <Title>TODO LIST</Title>
      <Form onSubmit={handleSubmit}>
        <Input 
          name="title"
          placeholder="제목을 입력해주세요"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}/>
        <Input 
          name="content"
          placeholder="내용을 입력해주세요"
          value={content} 
          onChange={(e) => setContent(e.target.value)}/>
        <Button type="submit">투두 생성</Button>
      </Form>
      {isPending ? (
        <div>Loading...</div>
      ):(
        <Container>
          {todos[0]?.map((todo) => {
            console.log(todo);
            return ( 
              <TodoContainer key={todo.id}>
                <input type="checkbox" defaultChecked={todo.checked} onChange={(e) => patchTodoMutation({id: todo.id, checked: !todo.checked})}/>
                <divContainer>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </divContainer>
                <Button onClick={() => deleteTodoMutation({id:todo.id})}>삭제하기</Button>
              </TodoContainer>
            );
          })}
        </Container>
      )}
    </>
  );
}

export default App

const Title = styled.div`
  font-weight: 900;
  font-size: 44px;
  color: #000000;
  margin-bottom: 40px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  display: block;
  margin: 10px 0;
  background-color: #ffffff; 
  border-radius: 999px;
  text-align: center;
  font-size: 14px;
  color: #000000;
  padding: 12px;
  border: 1px solid #000000;
  font-size: 16px;
`;

const Button = styled.button`
  width: 200px;
  height: 40px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 10px;
  padding: 10px;
  background-color: #295F98;
  color: #ffffff;
  font-weight: 700;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:disabled {
      background-color: grey;
      cursor: not-allowed;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

const divContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  span {
      margin: 0 15px; 
      font-size: 16px;
  }

  input[type="checkbox"] {
      width: 20px; 
      height: 20px; 
      accent-color: #295F98;
  }
`;