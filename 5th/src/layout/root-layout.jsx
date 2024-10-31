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
  background-color: #000;
  flex-grow: 1;
  min-height: 100vh; /* 전체 화면 높이 채우기 */
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
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
