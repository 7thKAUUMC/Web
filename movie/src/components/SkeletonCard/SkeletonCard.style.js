import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0% {
        background-position: -400px 0;
    }
    100% {
        background-position: 400px 0;
    }
`;

export const Card = styled.div`
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
`;

export const ImagePlaceholder = styled.div`
    width: 100%;
    height: 300px;
    background: #f6f7f8;
    background-image: linear-gradient(
        to right,
        #f6f7f8 0%,
        #edeef1 20%,
        #f6f7f8 40%,
        #f6f7f8 100%
    );
    background-repeat: no-repeat;
    background-size: 800px 300px;
    animation: ${shimmer} 1.5s infinite linear;
    border-radius: 4px;
`;

export const TitlePlaceholder = styled.div`
    width: 80%;
    height: 20px;
    margin: 15px auto 10px auto;
    background: #f6f7f8;
    background-image: linear-gradient(
        to right,
        #f6f7f8 0%,
        #edeef1 20%,
        #f6f7f8 40%,
        #f6f7f8 100%
    );
    background-repeat: no-repeat;
    background-size: 800px 20px;
    animation: ${shimmer} 1.5s infinite linear;
    border-radius: 4px;
`;

export const DatePlaceholder = styled.div`
    width: 60%;
    height: 15px;
    margin: 0 auto;
    background: #f6f7f8;
    background-image: linear-gradient(
        to right,
        #f6f7f8 0%,
        #edeef1 20%,
        #f6f7f8 40%,
        #f6f7f8 100%
    );
    background-repeat: no-repeat;
    background-size: 800px 15px;
    animation: ${shimmer} 1.5s infinite linear;
    border-radius: 4px;
`; 