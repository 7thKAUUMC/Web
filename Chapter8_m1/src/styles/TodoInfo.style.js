import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    margin-left: 200px;
`;

export const Input = styled.input`
    width: 400px;
    height: 40px;
    display: block;
    margin: 10px 0;
    background-color: #ffffff; 
    border: none;
    border-radius: 999px;
    text-align: center;
    font-size: 14px;
    color: #000000;
`;

export const Button = styled.button`
    width: 200px;
    height: 40px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 10px;
    padding: 10px;
    background-color: #295F98;
    color: #ffffff;
    font-weight: 700;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    &:disabled {
        background-color: grey;
        cursor: not-allowed;
    }
`;

export const Loader = styled.div`
    animation: spin 1s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const Error = styled.div`
    color: red;
`;

export const h1 = styled.div`
    font-size: 24px;
    color: grey;
    font-weight: 900;
`

export const h2 = styled.div`
    font-size: 36px;
    color: #ffffff;
    font-weight: 600;
    margin-top: 20px;
`

export const pt = styled.div`
    font-size: 24px;
    color: #ffffff;
    font-weight: 400;
    margin-bottom: 40px;
`