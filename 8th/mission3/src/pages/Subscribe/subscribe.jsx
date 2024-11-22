import React from "react";
import * as S from "./subscribe.style.js";

const SubscribePage = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>구독 플랜 선택</S.Title>
        <S.Subtitle>원하는 플랜을 선택하고 무제한으로 즐기세요!</S.Subtitle>
      </S.Header>
      <S.PlansContainer>
        <S.PlanCard>
          <S.PlanTitle>베이직</S.PlanTitle>
          <S.PlanPrice>₩9,500/월</S.PlanPrice>
          <S.PlanFeatures>
            <li>HD 화질</li>
            <li>1개 디바이스에서 시청 가능</li>
            <li>무제한 콘텐츠</li>
          </S.PlanFeatures>
          <S.SubscribeButton>구독하기</S.SubscribeButton>
        </S.PlanCard>
        <S.PlanCard>
          <S.PlanTitle>스탠다드</S.PlanTitle>
          <S.PlanPrice>₩13,500/월</S.PlanPrice>
          <S.PlanFeatures>
            <li>Full HD 화질</li>
            <li>2개 디바이스에서 시청 가능</li>
            <li>무제한 콘텐츠</li>
          </S.PlanFeatures>
          <S.SubscribeButton>구독하기</S.SubscribeButton>
        </S.PlanCard>
        <S.PlanCard>
          <S.PlanTitle>프리미엄</S.PlanTitle>
          <S.PlanPrice>₩17,000/월</S.PlanPrice>
          <S.PlanFeatures>
            <li>Ultra HD 화질</li>
            <li>4개 디바이스에서 시청 가능</li>
            <li>무제한 콘텐츠</li>
          </S.PlanFeatures>
          <S.SubscribeButton>구독하기</S.SubscribeButton>
        </S.PlanCard>
      </S.PlansContainer>
    </S.Container>
  );
};

export default SubscribePage;
