import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;

  input {
    flex: 1;
    padding: 15px;
    border-radius: 5px 0 0 5px;
    border: 1px solid rgb(220, 220, 220);
  }

  button {
    font-size: 16px;
    width: 80px;
    background-color: #ff1b6d;
    color: white;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;

    &:hover {
      background-color: #cc1b6d;
    }
  }
`;
