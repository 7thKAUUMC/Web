import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


const LoginPage = () => { 
    const schema = yup.object().shape({
        email: yup
        .string()
        .email('올바른 이메일 형식이 아닙니다')
        .required('이메일을 입력해주세요'), 
        password: yup
        .string()
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
        .max(16, '비밀번호는 최대 16자 이하여야 합니다')
        .required('비밀번호를 입력해주세요'), 
    })

    const {register, handleSubmit, formState: {errors, touchedFields, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        console.log('로그인 시도:', data); // 로그 메시지 수정
    }

    const inputStyle = (hasError, isTouched) => ({
        padding: '1rem',
        borderRadius: '4px',
        border: isTouched && hasError ? '2px solid red' : '2px solid transparent',
        outline: 'none',
        '&:focus': {
            border: '2px solid #007bff'
        }
    })

    return (
        // 전체 페이지를 감싸는 컨테이너 
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'black',
        }}>
            {/* 제목: 로그인 */}
            <h1 style={{ color: 'white', marginBottom: '2rem' }}>로그인</h1>
            
            {/* 폼 컨테이너 스타일 추가 */}
            <form onSubmit={handleSubmit(onSubmit)} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '400px',
                gap: '1rem',
                padding: '0 1rem'
            }}>
                {/* 이메일 입력 필드 스타일 추가 */}
                <input 
                    type="email" 
                    placeholder="이메일을 입력해주세요"
                    {...register("email")}
                    style={inputStyle(errors.email, touchedFields.email)}
                />
                {/* 에러 메시지 스타일 수정 */}
                <p style={{
                    color: 'red',
                    margin: 0,
                    fontSize: '0.8rem', 
                    height: '1rem'
                }}>
                    {touchedFields.email && errors.email?.message}
                </p>
                
                {/* 비밀번호 입력 필드 스타일 추가 */}
                <input 
                    type="password" 
                    placeholder="비밀번호를 입력해주세요!"
                    {...register("password")}
                    style={inputStyle(errors.password, touchedFields.password)}
                />
                {/* 에러 메시지 스타일 수정 */}
                <p style={{
                    color: 'red', 
                    margin: 0, 
                    fontSize: '0.8rem', 
                    height: '1rem'
                }}>
                    {touchedFields.password && errors.password?.message}
                </p>
                
                {/* submit 버튼을 스타일된 로그인 버튼으로 변경 */}
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