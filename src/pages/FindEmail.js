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

const FIND_URL = "/users/email";
// const cookies = new Cookies();

const { Title } = Typography;
const theme = createTheme();

function Findphone() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.passname || "/";

    const [userPhone, setUserPhone] = useState("");
    const [isValidphone, setIsvalidphone] = useState(false);

    const [isValidAll, setIsvalidAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(""); // API로부터 가져온 이메일 값을 저장

    // 유효성 검사하기
    useEffect(() => {
        checkValidphone(userPhone);
    }, [userPhone]);

    useEffect(() => {
        checkValidTotal();
    }, [isValidphone]);

    // 전체 유효성 검사
    const checkValidTotal = () => {
        console.log("check total");

        // userPhone만 입력되더라도 '확인' 버튼이 활성화되도록 수정
        if (userPhone !== "" && isValidphone) {
            console.log("모든 조건 달성");
            setIsvalidAll(true);
        } else {
            setIsvalidAll(false);
        }
    };

    // 전화번호 유효성 검사
    const checkValidphone = (phone) => {
        var regExp = /^\d+$/; // 숫자로만 이루어진 경우
        // 형식에 맞는 경우 true 리턴
        setIsvalidphone(regExp.test(phone));
    };

    //state 체크
    const handleChangephone = (e) => {
        setUserPhone(e.target.value);
    };

    // 서버 로그인 요청
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidAll) {
            console.log("넌 아직 준비가 안됬다!");
            return;
        }

        try {
            const response = await axios.get(FIND_URL, {
                params: {
                    phone: userPhone,
                },
                headers: {
                    "Hertz-API-Version": 1,
                },
            });

            // 이메일 값을 API 응답에서 추출
            const fetchedEmail = response?.data?.email;

            // 추출한 이메일 값을 상태에 설정
            setEmail(fetchedEmail);

            console.log(response?.data);

            setAuth({
                userPhone,
            });
            setUserPhone("");
            // navigate(from, { replace: true });

            // alert 창 띄우기
            alert(`찾으신 이메일은 ${fetchedEmail} 입니다.`);
        } catch (err) {
            console.log(err?.response);
            if (!err?.response) {
                alert("No Server Response");
            } else if (err.response?.status === 2206) {
                alert("Missing Username or Password");
            } else if (err.response?.status === 401) {
                alert("Unauthorized");
            } else if (err.response?.status === 500) {
                alert(err.response?.data?.message);
            } else {
                alert("일치하는 회원을 찾을 수 없습니다.");
            }
        }

        // requestPost();
        // console.log(auth);

        // axios
        //   .post(FIND_URL, {
        //     phone: state.phone,
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
                    <Title level={2}>이메일 찾기</Title>
                    {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            required
                            fullWidth
                            autoFocus
                            type="tel"
                            id="phone"
                            name="phone"
                            label="전화번호"
                            placeholder="예) 01012345678"
                            autoComplete="phone"
                            error={!isValidphone && userPhone !== ""}
                            helperText={
                                isValidphone || userPhone === ""
                                    ? ""
                                    : "전화번호를 정확히 입력해주세요."
                            }
                            value={userPhone}
                            onChange={handleChangephone}
                        />
                        {/* <TextField
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
                        /> */}
                        {/* 추출된 이메일 표시
                        <Typography sx={{ marginTop: 2, fontSize: 18 }}>
                            찾으신 이메일은 {email} 입니다.
                        </Typography>{" "} */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
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

export default Findphone;
