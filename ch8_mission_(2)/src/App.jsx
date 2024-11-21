import styled from "styled-components";
import {useState} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodoList, postTodo, deleteTodo, patchTodo } from "./apis/todo";

function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const {data:todos, isPending} = useQuery({
    queryKey: ['todos',search],
    queryFn: () => getTodoList({title:search}),
  });

  const {mutate:postTodoMutation} = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["todos"], 
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {mutate:deleteTodoMutation} = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["todos"], 
      });
    },
  });

  const {mutate:patchTodoMutation} = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["todos"], 
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
      <h1>Todo 검색</h1>
      <input
        style={{marginBottom: "10px"}} 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <Form onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <Input 
          name="content"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)} 
        />
        <Button type="submit">투두 생성</Button>
      </Form>
      {isPending ? (
        <div>로딩중입니다.</div>
      ) : (
        <Container>
          {todos[0]?.map((todo) => {
            return (
              <TodoContainer key={todo.id}>
                <input 
                type="checkbox" 
                  defaultChecked={todo.checked}
                  onChange={(e) =>
                    patchTodoMutation({ id: todo.id, checked: !todo.checked})
                  }
                />
                <div>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </div>
                <button onClick={() => deleteTodoMutation({id:todo.id})}>삭제</button>
              </TodoContainer>
            );
          })}
        </Container>
      )}
    </>
  );
}

export default App;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid purple;
`;

const Button = styled.button`
  padding: 20px;
  border-radius: 10px;
  border: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TodoContainer = styled.div`
  display: flex;
  gap: 5px;
`;