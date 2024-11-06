import React from "react";
import { FaSearch, FaFilm } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarWrapper, SidebarButton } from "./sidebar.style";

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <ul>
        <li>
          <SidebarButton as={Link} to="/search">
            <FaSearch /> 찾기
          </SidebarButton>
        </li>
        <li>
          <SidebarButton as={Link} to="/movies">
            <FaFilm /> 영화
          </SidebarButton>
        </li>
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
