import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import { Container, Box, Avatar, Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "antd/dist/antd.css";
import { Typography, Divider } from "antd";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

const UPDATEPW_URL = "/users/me/password";

const { Title } = Typography;
const theme = createTheme();

function UpdatePW() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.passname || "/";
    const [user, setUser] = useRecoilState(userState);

    const [isValidEmail, setIsvalidEmail] = useState(false);
    const [userCurrentPassword, setUserCurrentPassword] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isValidCurrentPassword, setIsvalidCurrentPassword] = useState(false);
    const [isValidPassword, setIsvalidPassword] = useState(false);
    const [userRePassword, setUserRePassword] = useState("");

    const [isValidAll, setIsvalidAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isValidPasswordMatch, setIsValidPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태 추가

    // 유효성 검사하기
    useEffect(() => {
        checkValidCurrentPassword(userCurrentPassword);
    }, [userCurrentPassword]);

    useEffect(() => {
        checkValidPassword(userPassword);
    }, [userPassword]);

    useEffect(() => {
        setIsvalidAll(
            userCurrentPassword !== "" &&
                userPassword !== "" &&
                userRePassword !== "" &&
                userPassword === userRePassword
        );
    }, [userCurrentPassword, userPassword, userRePassword]);

    // 비밀번호 확인 유효성 검사
    const checkValidRePassword = (password, rePassword) => {
        return password === rePassword;
    };

    // 전체 유효성 검사
    const checkValidTotal = () => {
        console.log("check total");

        if (
            userCurrentPassword === "" ||
            userPassword === "" ||
            userRePassword === ""
        ) {
            console.log("모든 칸을 작성하세요");
            setIsvalidAll(false);
            return;
        }
        if (isValidPassword) {
            console.log("모든 조건 달성");
            setIsvalidAll(true);
            return;
        }
        setIsvalidAll(false);
    };

    //비밀번호 유효성 검사
    const checkValidCurrentPassword = (pwd) => {
        //  8 ~ 16자 영문, 숫자 조합
        var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*+=-]).{8,16}$/;
        // 형식에 맞는 경우 true 리턴
        // console.log("비밀번호 유효성 검사 :: ", regExp.test(pwd));
        setIsvalidCurrentPassword(regExp.test(pwd));
    };

    //비밀번호 유효성 검사
    const checkValidPassword = (pwd) => {
        //  8 ~ 16자 영문, 숫자 조합
        var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*+=-]).{8,16}$/;
        // 형식에 맞는 경우 true 리턴
        // console.log("비밀번호 유효성 검사 :: ", regExp.test(pwd));
        setIsvalidPassword(regExp.test(pwd));
    };

    //state 체크
    const handleChangeCurrentPW = (e) => {
        setUserCurrentPassword(e.target.value);
    };
    const handleChangePassword = (e) => {
        setUserPassword(e.target.value);
    };
    // 비밀번호 확인과 관련된 상태 변경 및 유효성 검사 함수
    const handleChangeRePassword = (e) => {
        setUserRePassword(e.target.value);
        const isPasswordMatch = checkValidRePassword(
            userPassword,
            e.target.value
        );
        setIsValidPasswordMatch(isPasswordMatch); // 비밀번호 일치 여부 상태 업데이트
        checkValidTotal(); // 비밀번호 확인이 변경될 때마다 유효성 검사 수행
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
            const token = user?.token || user?.access_token;
            if (!token) return;
            const response = await axios.put(
                UPDATEPW_URL,
                {
                    password: userPassword,
                },
                {
                    headers: {
                        accept: "*/*",
                        "Hertz-API-Version": "1",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response?.data);

            setUserCurrentPassword("");
            setUserPassword("");
            navigate(from, { replace: true });
            alert("비밀번호가 변경되었습니다.");
        } catch (err) {
            console.log(err?.response);
            if (!err?.response) {
                alert("No Server Response");
            } else if (err.response?.status === 400) {
                alert("Missing Username or Password");
            } else if (err.response?.status === 401) {
                alert("Unauthorized");
            } else if (err.response?.status === 500) {
                alert(err.response?.data?.message);
            } else {
                alert("Login Failed");
            }
        }

        // requestPost();
        // console.log(auth);

        // axios
        //   .post(UPDATEPW_URL, {
        //     email: state.email,
        //     password: state.password,
        //   })
        //   .then(function (res) {
        //     console.log(res);
        //     setCookie('id', res.data.token);// 쿠키에 토큰 저장
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
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
                    <Title level={2}>비밀번호 변경</Title>
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
                            margin="normal"
                            required
                            autoFocus
                            fullWidth
                            type="password"
                            id="current_password"
                            name="current_password"
                            label="현재 비밀번호"
                            autoComplete="current-password"
                            error={
                                !isValidCurrentPassword &&
                                userCurrentPassword != ""
                            }
                            helperText={
                                isValidCurrentPassword ||
                                userCurrentPassword == ""
                                    ? ""
                                    : "영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)"
                            }
                            value={userCurrentPassword}
                            onChange={handleChangeCurrentPW}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            id="password"
                            name="password"
                            label="비밀번호 변경"
                            placeholder="영문, 숫자, 특수문자 조합 8-16자"
                            error={!isValidPassword && userPassword !== ""}
                            helperText={
                                isValidPassword || userPassword === ""
                                    ? ""
                                    : "영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)"
                            }
                            value={userPassword}
                            onChange={handleChangePassword}
                            inputProps={{
                                maxLength: 16,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            id="re_password"
                            name="re_password"
                            label="비밀번호 확인"
                            placeholder="영문, 숫자, 특수문자 조합 8-16자"
                            error={
                                !isValidPasswordMatch && userRePassword !== ""
                            }
                            helperText={
                                isValidPasswordMatch || userRePassword === ""
                                    ? ""
                                    : "비밀번호가 일치하지 않습니다."
                            }
                            value={userRePassword}
                            onChange={handleChangeRePassword}
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
                                    backgroundColor: "#637DBE",
                                },
                            }}
                            size="large"
                            disabled={!isValidAll}
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

export default UpdatePW;
