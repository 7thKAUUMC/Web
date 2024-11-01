import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../components/Input';
import './signin.css';

const schema = yup.object().shape({
    email: yup.string().email('올바른 형식이 아닙니다.').required('이메일은 필수 입력 항목입니다.'),
    password: yup.string().min(8, '비밀번호는 8자리 이상이어야 합니다.').max(16, '비밀번호는 16자리 이하여야 합니다.').required('비밀번호는 필수 입력 항목입니다.'),
    passwordCheck: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호 확인은 필수 입력 항목입니다.'),
    gender: yup.string().oneOf(['male', 'female'], '성별을 선택해 주세요.').required('성별은 필수 입력 항목입니다.'),
    birthdate: yup.date().required('생년월일은 필수 입력 항목입니다.').typeError('유효한 날짜를 입력해 주세요.')
});

const SignOutPage = () => {
    const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        console.log(data);
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
                <div className="form-group gender-group">
                    <label>성별:</label>
                    <div className="gender-options">
                        <label className="gender-option">
                            <input
                                type="radio"
                                value="male"
                                {...register('gender')}
                            />
                            남성
                        </label>
                        <label className="gender-option">
                            <input
                                type="radio"
                                value="female"
                                {...register('gender')}
                            />
                            여성
                        </label>
                    </div>
                    {errors.gender && <div className="error-message">{errors.gender.message}</div>}
                </div>
                <Input
                    label="생년월일"
                    id="birthdate"
                    type="date"
                    register={register('birthdate')}
                    error={errors.birthdate}
                    onBlur={() => trigger('birthdate')}
                />
                <button type="submit" className="signin-button" disabled={!isValid}>
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default SignOutPage;
