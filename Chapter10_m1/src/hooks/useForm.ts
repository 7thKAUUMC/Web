import { useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Partial<Record<keyof T, string>>; // 반환 타입 수정
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({}); // errors 타입 유지

  const handleChangeInput = (name: keyof T, value: T[keyof T]) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      handleChangeInput(name, event.target.value as T[keyof T]);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values); // validate 함수 반환 타입과 일치
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getTextInputProps };
}

export default useForm;
