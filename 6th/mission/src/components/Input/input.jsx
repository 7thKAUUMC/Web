import React from "react";
import * as S from "./input.style";

const Input = ({ type, placeholder, error, register }) => (
  <>
    <S.Input
      type={type}
      placeholder={placeholder}
      {...register}
      error={error}
    />
    {error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
  </>
);

export default Input;
