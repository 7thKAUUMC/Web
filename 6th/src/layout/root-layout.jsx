import React from "react";
import Navbar from "../components/Navbar/navbar";
import Sidebar from "../components/Sidebar/sidebar";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: row; /* 가로 방향으로 정렬 */
  background-color: #000;
  height: auto;
  min-height: 100vh; /* 최소 높이를 100vh로 설정 */
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
  height: auto;
  min-height: 100vh;
`;

const RootLayout = ({ children }) => {
  return (
    <Layout>
      <Navbar />
      <MainLayout>
        <Sidebar />
        <Content>{children}</Content>
      </MainLayout>
    </Layout>
  );
};

export default RootLayout;
