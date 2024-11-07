import styled from "styled-components";

const HomePage = () => {
  return (
    <Container>
      <HomeTitle>Welcome to YOONCHA</HomeTitle>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

const HomeTitle = styled.p`
  text-align: center;
  color: #282828;
  font-size: 80px;
  font-weight: 900;
`;