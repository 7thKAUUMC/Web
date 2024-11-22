import React from "react";
import {
  FaSearch,
  FaFilm,
  FaSubscript,
  FaFilter,
  FaCheck,
  FaCheckCircle,
} from "react-icons/fa";
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
        <l1>
          <SidebarLink to="/subscribe">
            <FaCheckCircle /> 구독
          </SidebarLink>
        </l1>
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
