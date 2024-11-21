import styled from "styled-components";
import {useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "./apis/todo";
function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {data:todos, isPending} = useQuery({
    queryKey: ['todos',title],
    queryFn: () => getTodoList({title}),
  });

  console.log(data[0].map((todo) => console.log(todo.title)));


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          name="content"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)} 
        />
        <button type="submit">투두 생성</button>
      </form>
      {isPending ? (
        <div>로딩중</div>
      ) : (
        todos[0].map((todo)=>{
          console.log(todo);
        return (
          <TodoContainer key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.content}</p>
          </TodoContainer>
        );
        })
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

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;