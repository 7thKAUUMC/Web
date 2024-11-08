import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../components/Input';
import './signin.css';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email('올바른 형식이 아닙니다.').required('이메일은 필수 입력 항목입니다.'),
    password: yup.string().min(8, '비밀번호는 8자리 이상이어야 합니다.').max(16, '비밀번호는 16자리 이하여야 합니다.').required('비밀번호는 필수 입력 항목입니다.'),
    passwordCheck: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호 확인은 필수 입력 항목입니다.')
});

const SignOutPage = () => {
    const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    passwordCheck: data.passwordCheck
                })
            });

            if (response.ok) {
                // 회원가입 성공 시 처리 (예: signin 페이지로 이동)
                navigate('/signin');
            } else {
                // 에러 응답 처리
                const errorData = await response.json();
                console.error('회원가입 실패:', errorData);
                alert(`회원가입 실패: ${errorData.message || '알 수 없는 오류가 발생했습니다.'}`);
            }
        } catch (error) {
            console.error('회원가입 중 오류가 발생했습니다:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="signin-container">
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                <Input
                    label="이메일"
                    id="email"
                    type="email"
                    register={register('email')}
                    error={errors.email}
                    onBlur={() => trigger('email')}
                />
                <Input
                    label="비밀번호"
                    id="password"
                    type="password"
                    register={register('password')}
                    error={errors.password}
                    onBlur={() => trigger('password')}
                />
                <Input
                    label="비밀번호 확인"
                    id="passwordCheck"
                    type="password"
                    register={register('passwordCheck')}
                    error={errors.passwordCheck}
                    onBlur={() => trigger('passwordCheck')}
                />
                <button type="submit" className="signin-button" disabled={!isValid}>
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default SignOutPage;
