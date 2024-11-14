import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  NavbarWrapper,
  LoginButton,
  SignupButton,
  LogoutButton,
  UserInfo,
} from "./navbar.style";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUserInfo = async () => {
  const response = await axios.get("http://localhost:3000/user/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: "userInfo",
    queryFn: fetchUserInfo,
    enabled: isAuthenticated, // isAuthenticated가 true일 때만 쿼리 실행
  });

  useEffect(() => {
    if (data) {
      const email = data.email;
      const nickname = email.split("@")[0];
      setNickname(nickname);
    }
  }, [data]);

  return (
    <NavbarWrapper>
      <div className="navbar-logo">
        <Link to="/">UMCHA</Link>
      </div>
      <div className="navbar-buttons">
        {isAuthenticated ? (
          <>
            {isLoading && <UserInfo>로딩중...</UserInfo>}
            {isError && <UserInfo>에러 발생</UserInfo>}
            {!isLoading && !isError && (
              <UserInfo>{nickname}님 반갑습니다.</UserInfo>
            )}
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <LoginButton as={Link} to="/login">
              로그인
            </LoginButton>
            <SignupButton as={Link} to="/signup">
              회원가입
            </SignupButton>
          </>
        )}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
