import styled from "styled-components";

export const SkeletonCard = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SkeletonBox = styled.div`
  width: 120px;
  height: 180px;
  background-color: #282828;
  border-radius: 10px;
  margin-bottom: 5px;
  animation: fade 1.5s infinite alternate;

  @keyframes fade {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
`;

export const SkeletonInfo = styled.div`
  text-align: left;
`;

export const SkeletonTitle = styled.div`
  width: 80%;
  height: 15px;
  background-color: #282828;
  margin-bottom: 5px;
  border-radius: 5px;
`;

export const SkeletonDate = styled.div`
  width: 60%;
  height: 10px;
  background-color: #282828;
  border-radius: 5px;
`;