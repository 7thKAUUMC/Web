import React from 'react';
import styled from 'styled-components';

const TodoSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <SearchInput 
      placeholder="할 일 검색"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export default TodoSearch;