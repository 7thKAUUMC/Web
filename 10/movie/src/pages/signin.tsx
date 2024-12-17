import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import './signin.css';
import { useNavigate } from 'react-router-dom';

// Login mutation function
const loginMutation = async (data) => {
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

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '알 수 없는 오류가 발생했습니다.');
    }

    return response.json();
};

const SignInPage = () => {
    const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({
        mode: 'onChange'
    });

    const navigate = useNavigate();

    // Use useMutation hook for login request
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: loginMutation,
        onSuccess: (data) => {
            // Save tokens in localStorage on success
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            // Redirect to home page
            navigate('/');
            localStorage.setItem('userEmail', data.email);
        },
        onError: (error) => {
            console.error('로그인 실패:', error);
            alert(`로그인 실패: ${error.message}`);
        }
    });

    const onSubmit = async (data) => {
        try {
            await mutateAsync(data); // Trigger mutation
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-header">
                <h1>로그인</h1>
                <a href="/reset-password" className="forgot-password">비밀번호를 잊어버리셨나요?</a>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        placeholder='이메일'
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

                    <input
                        type="password"
                        id="password"
                        placeholder='비밀번호'
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
                </div>
                <button type="submit" className="signin-button" disabled={!isValid || isPending}>
                    {isPending ? '로그인 중...' : '로그인'}
                </button>
                {error && <div className="error-message">{error.message}</div>}
            </form>
        </div>
    );
};

export default SignInPage;
