import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

import { Typography, Menu } from "antd";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Container,
    useIsFocusVisible,
    MenuItem, // 추가
    Select, // 추가
    InputLabel,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const EMAIL_REGEX =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/;

const REGISTER_URL = "/register";

const Sign = (props) => {
    const navigate = useNavigate();

    const theme = createTheme();

    const [userEmail, setUserEmail] = useState("");
    const [userBirth, setUserBirth] = useState("");
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRePassword, setUserRePassword] = useState("");
    const [userGender, setUserGender] = useState("");

    const [userChecked, setUserChecked] = useState({
        check1: false,
        check2: false,
    });

    const [isValidEmail, setIsvalidEmail] = useState(false);
    const [isValidPassword, setIsvalidPassword] = useState(false);
    const [isValidChecked, setIsvalidChecked] = useState(false);

    const [isValidAll, setIsvalidAll] = useState(false);

    const [isValidPasswordMatch, setIsValidPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태 추가

    // 유효성 검사하기
    useEffect(() => {
        checkValidEmail(userEmail);
    }, [userEmail]);

    useEffect(() => {
        checkValidPassword(userPassword);
    }, [userPassword]);

    useEffect(() => {
        checkValidChecked(userChecked);
    }, [userChecked]);

    useEffect(() => {
        checkValidTotal();
    }, [isValidEmail, isValidPassword, isValidChecked]);

    // 비밀번호 확인 유효성 검사
    const checkValidRePassword = (password, rePassword) => {
        return password === rePassword;
    };

    // 전체 유효성 검사
    const checkValidTotal = () => {
        console.log("check total");

        if (userEmail === "" || userPassword === "") {
            console.log("모든 칸을 작성해야함");
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

    const checkValidChecked = (checked) => {
        if (checked.check1 === true) {
            console.log("킹아");
            setIsvalidChecked(true);
        } else {
            console.log("모시깽이");
            setIsvalidChecked(false);
        }
    };

    //비밀번호 유효성 검사
    const checkValidPassword = (password) => {
        //  8 ~ 16자 영문, 숫자 조합
        var regExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
        // 형식에 맞는 경우 true 리턴
        // console.log("비밀번호 유효성 검사 :: ", regExp.test(state.password));
        setIsvalidPassword(regExp.test(password));
    };

    // 이메일 유효성 검사
    const checkValidEmail = (email) => {
        var regExp =
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        // 형식에 맞는 경우 true 리턴
        // console.log("이메일 유효성 검사 :: ", regExp.test(state.email));
        setIsvalidEmail(regExp.test(email));
    };

    //state 체크
    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value);
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
    const handleChangeName = (e) => {
        setUserBirth(e.target.value);
    };
    const handleChangeId = (e) => {
        setUserId(e.target.value);
    };

    const handleUserChecked = (e) => {
        setUserChecked({
            ...userChecked,
            [e.target.name]: e.target.checked,
        });
    };

    // 성별 선택 핸들러
    const handleChangeGender = (e) => {
        setUserGender(e.target.value);
        checkValidTotal(); // 성별 선택 여부에 따라 유효성 검사를 다시 수행
    };

    // form 전송
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isValidAll) {
            console.log("오류");
            return;
        }
        const requestData = {
            email: userEmail,
            password: userPassword,
            phone: "01012345678",
        };

        // birth와 gender가 빈 문자열이 아닌 경우에만 requestData에 추가
        if (userBirth !== "") {
            requestData.birth = userBirth;
        }

        if (userGender !== "") {
            requestData.gender = userGender;
        }

        axios
            .post(`/users`, requestData, {
                headers: {
                    "Hertz-API-Version": 1, // 헤더에 api minor version 추가
                },
            })
            .then(function (res) {
                console.log(res);
                console.log("회원가입을 완료했습니다.");
                alert("회원가입을 완료했습니다.");
                navigate("/login", { replace: true });
            })
            .catch(function (error) {
                console.log("회원가입을 실패했습니다.");
                console.log(error.response);
                if (error.response.data.code === 2200) {
                    alert("이미 사용중인 이메일입니다.");
                } else if (error.response.data.code === 2203) {
                    alert("이미 사용중인 전화번호입니다.");
                } else {
                    alert("알 수 없는 오류로 회원가입을 실패했습니다.");
                }
            });
    };

    // 중복 확인 버튼 클릭 핸들러
    const handleCheckEmail = () => {
        // 유효한 이메일인 경우에만 API 호출
        if (isValidEmail) {
            axios
                .get(`/users/existence?email=${userEmail}`, {
                    headers: {
                        "Hertz-API-Version": 1,
                    },
                })
                .then(function (res) {
                    console.log(res);
                    if (res.data.isExist) {
                        // 이미 사용 중인 이메일인 경우
                        alert("이미 사용 중인 이메일입니다.");
                        // 사용자가 입력한 이메일 초기화
                        setUserEmail("");
                    } else {
                        // 사용 가능한 이메일인 경우
                        alert("사용 가능한 이메일입니다.");
                        setUserEmail(userEmail);
                    }
                })
                .catch(function (error) {
                    console.log("이메일 중복 확인에 실패했습니다.");
                    console.log(error.response);
                    alert("이메일 중복 확인에 실패했습니다.");
                });
        } else {
            // 유효하지 않은 이메일일 경우 알림 출력
            alert("유효한 이메일 주소를 입력해주세요.");
        }
    };

    // form 전송 버튼의 활성화 여부를 결정하는 함수
    const isSubmitButtonDisabled = () => {
        return !isValidAll || !isValidPasswordMatch;
    };

    // 회원가입 버튼 클릭 핸들러
    const handleSignupButtonClick = (e) => {
        e.preventDefault();
        if (!isSubmitButtonDisabled()) {
            handleSubmit(e);
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
                    {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} /> */}
                    <Typography component="h3" variant="h7">
                        기본 정보
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1.7 }}
                    >
                        <FormControl component="fieldset" variant="standard">
                            <Grid container spacing={2} alignItems="flex-end">
                                {isValidEmail ? (
                                    <Grid item xs={8}>
                                        <TextField
                                            required
                                            autoFocus
                                            fullWidth
                                            type="email"
                                            id="email"
                                            name="email"
                                            label="이메일"
                                            error={
                                                !isValidEmail &&
                                                userEmail !== ""
                                            }
                                            helperText={
                                                isValidEmail || userEmail === ""
                                                    ? ""
                                                    : "이메일 주소를 정확히 입력해주세요."
                                            }
                                            value={userEmail}
                                            onChange={handleChangeEmail}
                                        />
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            autoFocus
                                            fullWidth
                                            type="email"
                                            id="email"
                                            name="email"
                                            label="이메일"
                                            error={
                                                !isValidEmail &&
                                                userEmail !== ""
                                            }
                                            helperText={
                                                isValidEmail || userEmail === ""
                                                    ? ""
                                                    : "이메일 주소를 정확히 입력해주세요."
                                            }
                                            value={userEmail}
                                            onChange={handleChangeEmail}
                                        />
                                    </Grid>
                                )}
                                {isValidEmail && ( // 유효한 이메일이면 버튼을 보여줌
                                    <Grid
                                        item
                                        xs={4}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            style={{
                                                backgroundColor: "gray",
                                                color: "white",
                                                height: "100%",
                                            }}
                                            onClick={handleCheckEmail}
                                        >
                                            중복 확인
                                        </Button>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="password"
                                        id="password"
                                        name="password"
                                        label="비밀번호"
                                        placeholder="영문, 숫자, 특수문자 조합 8-16자"
                                        error={
                                            !isValidPassword &&
                                            userPassword !== ""
                                        }
                                        helperText={
                                            isValidPassword ||
                                            userPassword === ""
                                                ? ""
                                                : "영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)"
                                        }
                                        value={userPassword}
                                        onChange={handleChangePassword}
                                        inputProps={{
                                            maxLength: 16,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="password"
                                        id="re_password"
                                        name="re_password"
                                        label="비밀번호 확인"
                                        placeholder="영문, 숫자, 특수문자 조합 8-16자"
                                        error={
                                            !isValidPasswordMatch &&
                                            userRePassword !== ""
                                        }
                                        helperText={
                                            isValidPasswordMatch ||
                                            userRePassword === ""
                                                ? ""
                                                : "비밀번호가 일치하지 않습니다."
                                        }
                                        value={userRePassword}
                                        onChange={handleChangeRePassword}
                                        inputProps={{
                                            maxLength: 16,
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    style={{ textAlign: "center" }}
                                >
                                    <Typography
                                        component="h3"
                                        variant="h7"
                                        align="center"
                                    >
                                        추가 정보
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="userBirth"
                                        name="userBirth"
                                        label="생년월일"
                                        placeholder="예) 2024-01-01"
                                        value={userBirth}
                                        onChange={handleChangeName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender-label">
                                            성별
                                        </InputLabel>

                                        <Select
                                            labelId="gender-label"
                                            id="gender"
                                            name="userGender"
                                            label="성별"
                                            value={userGender}
                                            onChange={handleChangeGender}
                                        >
                                            <MenuItem value="">미선택</MenuItem>
                                            <MenuItem value="MALE">남</MenuItem>
                                            <MenuItem value="FEMALE">
                                                여
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    className="Sign_terms"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                ></Grid>
                            </Grid>
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
                                onClick={handleSignupButtonClick}
                                disabled={isSubmitButtonDisabled()}
                            >
                                회원가입
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Sign;
