import React from 'react';
import { useForm } from 'react-hook-form';
import './signin.css';

const SignInPage = () => {
    const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        console.log('이메일:', data.email);
        console.log('비밀번호:', data.password);
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