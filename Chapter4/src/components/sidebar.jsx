import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <>
      <SideContainer>
        <SideItems to='/search'>
          <FaSearch />
          찾기
        </SideItems>
        <SideItems to='/movies'>
          <MdMovie />
          영화
        </SideItems>
      </SideContainer>
    </>
  )
};

export default Sidebar;

const SideItems = styled(Link)`
  display: flex;
  text-align: center;
  padding: 20px;
  width: 140px;
  color: #ffffff;
  gap: 10px;
  padding-bottom: 5px;
  text-decoration: none;
  font-size: 15px;
`

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100%;
`