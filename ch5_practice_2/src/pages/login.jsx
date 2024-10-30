import { useState } from 'react';

// 커스텀 유효성 검사 훅
const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return '이메일을 입력해주세요';
    if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return '비밀번호를 입력해주세요';
    if (password.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다';
    if (password.length > 16) return '비밀번호는 최대 16자 이하여야 합니다';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    // 유효성 검사 실행
    const newErrors = { ...errors };
    if (name === 'email') {
      newErrors.email = validateEmail(value);
    }
    if (name === 'password') {
      newErrors.password = validatePassword(value);
    }
    setErrors(newErrors);

    // 전체 폼의 유효성 검사
    setIsValid(!newErrors.email && !newErrors.password && value !== '');
  };

  return {
    values,
    errors,
    touchedFields,
    isValid,
    handleChange
  };
};

const LoginPage = () => {
  const {
    values,
    errors,
    touchedFields,
    isValid,
    handleChange
  } = useFormValidation({
    email: '',
    password: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', values);
  };

  const inputStyle = (hasError, isTouched) => ({
    padding: '1rem',
    borderRadius: '4px',
    border: isTouched && hasError ? '2px solid red' : '2px solid transparent',
    outline: 'none',
    '&:focus': {
      border: '2px solid #007bff'
    }
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'black',
    }}>
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>로그인</h1>
      
      <form onSubmit={onSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        gap: '1rem',
        padding: '0 1rem'
      }}>
        <input 
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요"
          style={inputStyle(errors.email, touchedFields.email)}
        />
        <p style={{
          color: 'red',
          margin: 0,
          fontSize: '0.8rem',
          height: '1rem'
        }}>
          {touchedFields.email && errors.email}
        </p>
        
        <input 
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요!"
          style={inputStyle(errors.password, touchedFields.password)}
        />
        <p style={{
          color: 'red',
          margin: 0,
          fontSize: '0.8rem',
          height: '1rem'
        }}>
          {touchedFields.password && errors.password}
        </p>
        
        <button 
          type="submit"
          disabled={!isValid}
          style={{
            padding: '1rem',
            backgroundColor: isValid ? '#8B0000' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isValid ? 'pointer' : 'not-allowed',
            marginTop: '0.5rem',
            transition: 'background-color 0.3s ease'
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;