// RootLayout.jsx
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/\u001DNavBar';
import Sidebar from '../components/\bSidebar';

// 메인 컨테이너 스타일 (Sidebar와 Outlet을 가로로 배치)
const MainContainer = styled.div`
  display: flex;
  margin-top: 60px; /* NavBar 높이만큼 아래로 밀림 */
`;

// Content는 Sidebar 옆에 위치할 Outlet을 감싸는 div
const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #111;
  color: white;
`;

const RootLayout = () => {
    return (
        <div>
            <NavBar />
            <MainContainer>
                <Sidebar /> 
                <Content>
                    <Outlet /> 
                </Content>
            </MainContainer>
        </div>
    );
};

export default RootLayout;
