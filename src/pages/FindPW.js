import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

// import { Cookies } from "react-cookie";

import { Container, Box, Avatar, Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "antd/dist/antd.css";
import { Typography, Divider } from "antd";

const LOGIN_URL = "/users/login";
// const cookies = new Cookies();

const { Title } = Typography;
const theme = createTheme();

function FindPW() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.passname || "/";

    const [userEmail, setUserEmail] = useState("");
    const [isValidEmail, setIsvalidEmail] = useState(false);
    const [userNumber, setUserNumber] = useState("");
    const [isValidPassword, setIsvalidPassword] = useState(false);

    const [isValidAll, setIsvalidAll] = useState(false);
    const [loading, setLoading] = useState(false);

    // 유효성 검사하기
    useEffect(() => {
        checkValidEmail(userEmail);
    }, [userEmail]);

    useEffect(() => {
        checkValidNumber(userNumber);
    }, [userNumber]);

    useEffect(() => {
        checkValidTotal();
    }, [isValidEmail, isValidPassword]);

    // 전체 유효성 검사
    const checkValidTotal = () => {
        console.log("check total");

        if (userEmail === "" || userNumber === "") {
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

    //전화번호 유효성 검사
    const checkValidNumber = (num) => {
        // 입력값이 공백이 아닌 경우에만 유효성 검사를 수행하도록 수정
        if (num.trim() !== "") {
            // 숫자만 입력되도록 수정
            var regExp = /^[0-9]*$/;
            // 형식에 맞는 경우 true 리턴
            setIsvalidPassword(regExp.test(num));
        } else {
            setIsvalidPassword(false); // 입력값이 공백인 경우 false로 설정
        }
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
    const handleChangeNumber = (e) => {
        setUserNumber(e.target.value);
    };

    // 서버 로그인 요청
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidAll) {
            console.log("넌 아직 준비가 안됬다!");
            return;
        }

        // 이동할 경로로 navigate 함수를 사용하여 이동
        navigate("/selfsign", { state: { root: 1 } });
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
                    <Title level={2}>비밀번호 찾기</Title>
                    {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon  />
                    </Avatar> */}
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
                            type="tel"
                            id="number"
                            name="number"
                            label="전화번호"
                            autoComplete="current-number"
                            placeholder="예) 01012345678"
                            error={!isValidPassword && userNumber != ""}
                            helperText={
                                isValidPassword || userNumber == ""
                                    ? ""
                                    : "숫자로만 입력해주세요."
                            }
                            value={userNumber}
                            onChange={handleChangeNumber}
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
                            확인
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default FindPW;
