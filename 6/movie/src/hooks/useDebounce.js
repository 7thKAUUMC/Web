import { useState, useEffect } from 'react';

/**
 * useDebounce 훅은 주어진 값이 지정된 지연 시간(ms) 동안 변경되지 않을 때 해당 값을 반환합니다.
 * @param {any} value - 디바운싱할 값
 * @param {number} delay - 지연 시간(밀리초)
 * @returns 디바운싱된 값
 */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // 클린업 함수: 값이 변경되거나 컴포넌트가 언마운트될 때 타이머를 정리
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce; 