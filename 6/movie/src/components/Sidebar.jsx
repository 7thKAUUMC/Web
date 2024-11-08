// components/Sidebar.jsx
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilm } from 'react-icons/fa';

const SidebarContainer = styled.div`
  height: 100vh;
  background-color: #141414;
  color: white;
  padding: 20px;
  width: 200px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 18px;

  svg {
    margin-right: 10px;
  }

  &:hover {
    color: #e50914; /* hover 시 색상 변경 */
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search'); // '찾기' 클릭 시 /search 페이지로 이동
  };

  const handleMoviesClick = () => {
    navigate('/movies'); // '영화' 클릭 시 /movies 페이지로 이동
  };

  return (
    <SidebarContainer>
      <MenuItem onClick={handleSearchClick}>
        <FaSearch /> 찾기
      </MenuItem>
      <MenuItem onClick={handleMoviesClick}>
        <FaFilm /> 영화
      </MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
