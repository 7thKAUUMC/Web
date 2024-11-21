import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 50px;
`;

export const Create = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 50px;
`;

export const Title = styled.div`
    font-weight: 900;
    font-size: 44px;
    color: #ffffff;
    margin-bottom: 40px;
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

export const List = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    width: 100%;
    padding: 20px;
    position: absolute;
    left: 250px;
    gap: 20px;
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 0px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;

    span {
        margin: 0 15px; 
        font-size: 16px;
    }

    input[type="checkbox"] {
        width: 20px; 
        height: 20px; 
        accent-color: #295F98;
    }
`;

export const EditInput = styled.input`
    width: 100px; 
    height: 30px; 
    background-color: #ffffff;
    text-align: center; 
    border: none;
    font-size: 14px;
    padding: 0 10px;
    color: #000000;
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
