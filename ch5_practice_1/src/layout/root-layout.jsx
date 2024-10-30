import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const RootLayout = () => {
  return (
    <>
      <GlobalStyle/>
      <NavLayout>
        <Navbar/>
      </NavLayout>
      <MainLayout>
        <Sidebar/>
        <Content>
          <Outlet/> 
        </Content>
      </MainLayout>
    </>
  );
};

export default RootLayout;

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #000000;
  }
`

const NavLayout = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  background-color: #212121;
  box-sizing: border-box;
`

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;  
  width: 100%;  
  background-color: #212121;
  color: #ffffff;
  min-height: 100vh;
`

const Content = styled.div`
  flex-grow: 1;  
  width: 1;
  padding: 20px;
  background-color: #000000;
  box-sizing: border-box;  
  min-height: calc(100vh - 80px);
`