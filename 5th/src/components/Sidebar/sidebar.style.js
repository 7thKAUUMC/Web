import styled from "styled-components";

export const SidebarWrapper = styled.aside`
  width: 150px; /* 사이드바의 고정 너비 설정 */
  background-color: #222;
  padding: 20px;
  color: white;
  height: 100vh;
  flex-shrink: 0; /* 헉 얘 추가하니까 siebar width 유지된다 */

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
  }
`;

export const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #222;
  color: white;
  border: none;
  padding: 10px; /* 상하 여백을 10px로 설정하여 높이 고정 */
  height: 50px; /* 버튼의 고정 높이 설정 */
  width: 100%; /* 버튼을 사이드바 너비에 맞게 조정 */
  font-size: 16px;
  cursor: pointer;
  text-decoration: none; /* 밑줄 없애기 */

  /* 오른쪽 여백 추가 */
  margin-right: 20px;
  margin-left: 0; /* 왼쪽 여백 제거 */

  svg {
    margin-right: 10px; /* 아이콘과 텍스트 간의 여백 조정 */
  }
`;
