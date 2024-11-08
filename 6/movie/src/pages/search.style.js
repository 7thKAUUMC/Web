import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    background-color: #e50914;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 20px;
`;