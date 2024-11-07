import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarWrapper = styled.aside`
  width: 150px; /* 사이드바의 고정 너비 설정 */
  background-color: #222;
  padding: 20px;
  color: white;
  height: auto;
  min-height: 100vh; /* 최소 높이를 100vh로 설정 */
  flex-shrink: 0; /* 사이드바 너비 유지 */

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
  }
`;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #222;
  color: white;
  text-decoration: none;
  padding: 10px; /* 상하 여백을 10px로 설정하여 높이 고정 */
  font-size: 16px;
  cursor: pointer;
  border: none;

  svg {
    margin-right: 10px; /* 아이콘과 텍스트 간의 여백 조정 */
  }
`;
