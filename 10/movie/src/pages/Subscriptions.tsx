// components/Subscriptions.jsx
import styled from 'styled-components';

const SubscriptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url('https://images.unsplash.com/photo-1458053688450-eef5d21d43b3?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    no-repeat center center/cover;
  position: relative;
  color: white;
  padding: 20px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 어두운 오버레이 */
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2; /* 오버레이 위에 콘텐츠 표시 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 32px;
  text-align: center;
  max-width: 500px;
  line-height: 1.5;
  opacity: 0.9; /* 살짝 덜 강조 */
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const PlanCard = styled.div`
  background-color: #141414;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 180px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05); /* 약간 확대 */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
  }
`;

const PlanTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const PlanPrice = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #e50914;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 14px;
  color: #bbb;
`;

const Feature = styled.li`
  margin-bottom: 8px;
`;

const Subscriptions = () => {
  const plans = [
    {
      title: 'Basic',
      price: '₩9,500',
      features: ['720p 화질', '1개 디바이스에서 시청', '광고 없음'],
    },
    {
      title: 'Standard',
      price: '₩13,500',
      features: ['1080p 화질', '2개 디바이스 동시 시청', '광고 없음'],
    },
    {
      title: 'Premium',
      price: '₩17,000',
      features: ['4K+HDR 화질', '4개 디바이스 동시 시청', '광고 없음'],
    },
  ];

  return (
    <SubscriptionsContainer>
      <Overlay />
      <Content>
        <Title>구독 서비스를 선택하세요</Title>
        <Description>
          모든 콘텐츠를 무제한으로 즐기세요. 구독은 언제든지 변경하거나 취소할 수
          있습니다.
        </Description>
        <PlansContainer>
          {plans.map((plan) => (
            <PlanCard key={plan.title}>
              <PlanTitle>{plan.title}</PlanTitle>
              <PlanPrice>{plan.price}</PlanPrice>
              <Features>
                {plan.features.map((feature, index) => (
                  <Feature key={index}>{feature}</Feature>
                ))}
              </Features>
            </PlanCard>
          ))}
        </PlansContainer>
      </Content>
    </SubscriptionsContainer>
  );
};

export default Subscriptions;
