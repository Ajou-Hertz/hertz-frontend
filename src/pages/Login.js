import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

import axiosPrivate from "../api/axios";
import useAuth from "../hooks/useAuth";
import kakaoLoginImage from "../assets/kakao_login_large_wide.png";
import { Container, Box, Avatar, Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "antd/dist/antd.css";
import { Typography, Divider } from "antd";

const LOGIN_URL = "/auth/login";

const { Title } = Typography;
const theme = createTheme();

function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.passname || "/";

    const [userEmail, setUserEmail] = useState("");
    const [isValidEmail, setIsvalidEmail] = useState(false);
    const [userPassword, setUserPassword] = useState("");
    const [isValidPassword, setIsvalidPassword] = useState(false);
    const [user, setUser] = useRecoilState(userState);

    const [isValidAll, setIsvalidAll] = useState(false);
    const [loading, setLoading] = useState(false);

    const link = `https://kauth.kakao.com/oauth/authorize?client_id=06e2d79339eb6f6a8620650e1124c030&redirect_uri=https://hertz-inst.vercel.app/kakao/authorize/redirect-test&response_type=code`;

    // 유효성 검사하기
    useEffect(() => {
        checkValidEmail(userEmail);
    }, [userEmail]);

    useEffect(() => {
        checkValidPassword(userPassword);
    }, [userPassword]);

    useEffect(() => {
        checkValidTotal();
    }, [isValidEmail, isValidPassword]);

    // 전체 유효성 검사
    const checkValidTotal = () => {
        console.log("check total");

        if (userEmail === "" || userPassword === "") {
            console.log("모든 칸을 작성하세요");
            setIsvalidAll(false);
            return;
        }
        if (isValidEmail && isValidPassword) {
            console.log("모든 조건 달성");
            setIsvalidAll(true);
            return;
        }
        setIsvalidAll(false);
    };

    //비밀번호 유효성 검사
    const checkValidPassword = (pwd) => {
        //  8 ~ 16자 영문, 숫자 조합
        var regExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
        // 형식에 맞는 경우 true 리턴
        // console.log("비밀번호 유효성 검사 :: ", regExp.test(pwd));
        setIsvalidPassword(regExp.test(pwd));
    };

    // 이메일 유효성 검사
    const checkValidEmail = (email) => {
        var regExp =
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        // 형식에 맞는 경우 true 리턴
        // console.log("이메일 유효성 검사 :: ", regExp.test(email));
        setIsvalidEmail(regExp.test(email));
    };

    //state 체크
    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setUserPassword(e.target.value);
    };

    // 서버 로그인 요청
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidAll) {
            console.log("넌 아직 준비가 안됬다!");
            return;
        }

        console.log("login 요청중");

        try {
            //const response = await axios.post(
            const response = await axiosPrivate.post(
                LOGIN_URL,
                {
                    email: userEmail,
                    password: userPassword,
                },
                {
                    headers: {
                        "Hertz-API-Version": 1, // 헤더에 api minor version 추가
                    },
                }
            );
            console.log(response?.data);
            // console.log(response);
            const accessToken = response?.data?.token;
            // const refreshToken = response?.data?.userToken.refreshToken;

            //accesstoken 로컬 스토리지에 담기
            localStorage.setItem("token", accessToken);

            setAuth({
                userEmail,
                userPassword,
                accessToken,
            });
            setUserEmail("");
            setUserPassword("");
            setUser(response.data);
            console.log(response);
            alert("로그인이 완료되었습니다.");
            navigate("/", { replace: true });
        } catch (err) {
            console.log(err?.response);
            if (!err?.response) {
                alert("No Server Response");
            } else if (
                err.response?.status === 2202 ||
                err.response?.status === 2003
            ) {
                alert("일치하는 회원을 찾을 수 없습니다.");
            } else if (err.response?.status === 401) {
                alert("Unauthorized");
            } else if (err.response?.status === 500) {
                alert(err.response?.data?.message);
            } else {
                alert("일치하는 회원을 찾을 수 없습니다.");
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Title level={2}>Login</Title>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            required
                            autoFocus
                            fullWidth
                            type="email"
                            id="email"
                            name="email"
                            label="이메일"
                            autoComplete="email"
                            error={!isValidEmail && userEmail != ""}
                            helperText={
                                isValidEmail || userEmail == ""
                                    ? ""
                                    : "이메일을 정확히 입력해주세요."
                            }
                            value={userEmail}
                            onChange={handleChangeEmail}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            id="password"
                            name="password"
                            label="비밀번호"
                            autoComplete="current-password"
                            placeholder="영문, 숫자, 특수문자 조합 8-16자"
                            error={!isValidPassword && userPassword != ""}
                            helperText={
                                isValidPassword || userPassword == ""
                                    ? ""
                                    : "영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)"
                            }
                            value={userPassword}
                            onChange={handleChangePassword}
                            inputProps={{
                                maxLength: 16,
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: "#637DBE",
                                "&:hover": {
                                    backgroundColor: "#637DBE", // 호버 시 배경색
                                },
                            }}
                            size="large"
                            disabled={!isValidAll || loading}
                            onClick={handleSubmit}
                        >
                            로그인
                        </Button>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <RouterLink
                                to="/findEmail"
                                style={{ textDecoration: "none" }}
                            >
                                이메일 찾기
                            </RouterLink>
                            <Divider type="vertical" />
                            <RouterLink
                                to="/findPw"
                                style={{ textDecoration: "none" }}
                            >
                                비밀번호 찾기
                            </RouterLink>
                            <Divider type="vertical" />
                            <RouterLink
                                to="/selfsign"
                                style={{ textDecoration: "none" }}
                            >
                                회원가입
                            </RouterLink>
                        </div>
                        <Button
                            type="button"
                            fullWidth
                            size="large"
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                            onClick={() => (window.location.href = link)}
                        >
                            {/* 카카오 로그인 버튼 대신 이미지로 대체 */}
                            <img
                                src={kakaoLoginImage}
                                alt="카카오 로그인"
                                style={{ width: "105%" }}
                            />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
