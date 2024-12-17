import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Cart from './features/cart/Cart';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 40px;
  background-color: #e9ecef;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <Title>음원 장바구니</Title>
        <Cart />
      </AppContainer>
    </Provider>
  );
}

export default App;