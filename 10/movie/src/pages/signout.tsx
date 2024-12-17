import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../components/Input';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

// Validation Schema
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

    interface RegisterData {
        email: string;
        password: string;
        passwordCheck: string;
    }

    // Mutation hook for registration
    const mutation = useMutation({
        mutationFn: async (data: RegisterData) => {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '알 수 없는 오류가 발생했습니다.');
            }

            return response.json();
        }
    });

    const onSubmit = async (data) => {
        try {
            await mutation.mutateAsync(data); // Trigger mutation
            navigate('/signin'); // Redirect after successful registration
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert(error.message);
        }
    };

    return (
        <div className="signin-container">
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                {/* Email Input */}
                <Input
                    label="���메일"
                    id="email-1"
                    type="email"
                    register={register('email')}
                    error={errors.email}
                    onBlur={() => trigger('email')}
                />
                {/* Password Input */}
                <Input
                    label="비밀번호"
                    id="password-1"
                    type="password"
                    register={register('password')}
                    error={errors.password}
                    onBlur={() => trigger('password')}
                />
                {/* Password Check Input */}
                <Input
                    label="비밀번호 확인"
                    id="passwordCheck-1"
                    type="password"
                    register={register('passwordCheck')}
                    error={errors.passwordCheck}
                    onBlur={() => trigger('passwordCheck')}
                />

                {/* Submit Button */}
                <button type="submit" className="signin-button" disabled={!isValid || mutation.isPending}>
                    {mutation.isPending ? '등록 중...' : '회원가입'}
                </button>
            </form>
        </div>
    );
};

export default SignOutPage;
