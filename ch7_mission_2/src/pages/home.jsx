import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 336px;
  margin: 0 auto;
  padding: 0 19px;
  background-color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 29px;
  font-size: 32px;
  font-weight: bold;
`;

const HomePage = () => {
    return (
        <Container>
            <Title>홈 페이지 입니다</Title>
        </Container>
    );
};

export default HomePage;