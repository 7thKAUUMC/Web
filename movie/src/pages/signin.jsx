import React from 'react';
import { useForm } from 'react-hook-form';
import './signin.css';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({
        mode: 'onChange'
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                // 토큰을 로컬 스토리지에 저장
                localStorage.setItem('accessToken', responseData.accessToken);
                localStorage.setItem('refreshToken', responseData.refreshToken);
                // 로그인 성공 시 홈 페이지로 이동
                navigate('/');
                localStorage.setItem('userEmail', data.email);

            } else {
                // 에러 응답 처리
                const errorData = await response.json();
                console.error('로그인 실패:', errorData);
                alert(`로그인 실패: ${errorData.message || '알 수 없는 오류가 발생했습니다.'}`);
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다:', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="signin-container">
            <h1>로그인</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: '이메일은 필수 입력 항목입니다.',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: '올바른 형식이 아닙니다.'
                            }
                        })}
                        onBlur={() => trigger('email')}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <div className="error-message">{errors.email.message}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', {
                            required: '비밀번호는 필수 입력 항목입니다.',
                            minLength: {
                                value: 8,
                                message: '비밀번호는 8자리 이상이어야 합니다.'
                            },
                            maxLength: {
                                value: 16,
                                message: '비밀번호는 16자리 이하여야 합니다.'
                            }
                        })}
                        onBlur={() => trigger('password')}
                        className={errors.password ? 'error' : ''}
                    />
                    {errors.password && <div className="error-message">{errors.password.message}</div>}
                </div>
                <button type="submit" className="signin-button" disabled={!isValid}>
                    로그인
                </button>
            </form>
        </div>
    );
};

export default SignInPage;