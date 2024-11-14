import styled from 'styled-components';

export const Card = styled.div`
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    img {
        width: 100%;
        height: auto;
    }

    h3 {
        font-size: 1.1rem;
        margin: 10px 0 5px 0;
    }

    p {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 10px;
    }
`; 