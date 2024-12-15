import styled from 'styled-components';

// 스타일링된 아이콘 Wrapper
const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size || '24px'};
  height: ${({ size }) => size || '24px'};
  color: ${({ color }) => color || 'currentColor'};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const CartIcon = ({ size, color }) => {
  return (
    <IconWrapper size={size} color={color}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
        />
      </svg>
    </IconWrapper>
  );
};

export const ChevronDown = ({ size, color, clickable }) => {
  return (
    <IconWrapper size={size} color={color} clickable={clickable}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
      </svg>
    </IconWrapper>
  );
};

export const ChevronUp = ({ size, color, clickable }) => {
  return (
    <IconWrapper size={size} color={color} clickable={clickable}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
      </svg>
    </IconWrapper>
  );
};
