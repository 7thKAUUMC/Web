import React from "react";
import { FaSearch, FaFilm } from "react-icons/fa";
import { SidebarWrapper, SidebarLink } from "./sidebar.style";

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <ul>
        <li>
          <SidebarLink to="/search">
            <FaSearch /> 찾기
          </SidebarLink>
        </li>
        <li>
          <SidebarLink to="/movies">
            <FaFilm /> 영화
          </SidebarLink>
        </li>
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
