// 회원 가입으로 접속했을 때의 본인 인증 페이지
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import axios from "../api/axios";
import { Typography } from "antd";
import {
    Button,
    TextField,
    FormControl,
    Grid,
    Box,
    Container,
    MenuItem,
    Select,
    InputLabel,
    FormControlLabel,
    Checkbox,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SelfSign = () => {
    const navigate = useNavigate();
    const theme = createTheme();
    const location = useLocation();
    const root = location.state ? location.state.root || "" : "";
    const [userChecked, setUserChecked] = useState({
        check1: false,
        check2: false,
        check3: false,
    });

    const [userCode, setUserCode] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [userTelecom, setUserTelecom] = useState("");

    const [isValidAll, setIsvalidAll] = useState(false);
    const [isCodeInputVisible, setIsCodeInputVisible] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [timer, setTimer] = useState(300);

    useEffect(() => {
        setIsCodeInputVisible(
            userTelecom !== "" &&
                userNumber !== "" &&
                userChecked.check1 !== false &&
                userChecked.check2 !== false
        );
    }, [userTelecom, userNumber, userChecked.check1, userChecked.check2]);

    useEffect(() => {
        setIsvalidAll(
            userCode !== "" && userNumber !== "" && userTelecom !== ""
        );
    }, [userCode, userNumber, userTelecom]);

    useEffect(() => {
        let interval;
        if (isCodeSent) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCodeSent]);

    useEffect(() => {
        if (timer === 0) {
            setTimer(0); // 타이머가 음수가 되지 않도록 수정
            setIsCodeSent(false); // 코드가 보내지지 않은 상태로 변경
        }
    }, [timer]);

    const handleChangeNumber = (e) => {
        setUserNumber(e.target.value);
    };

    const handleChangeTelecom = (e) => {
        setUserTelecom(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            phoneNumber: userNumber,
            code: userCode,
        };

        axios
            .post(`/auth/codes/verify`, requestData, {
                headers: {
                    "Hertz-API-Version": 1,
                },
            })
            .then(function (res) {
                console.log(res);
                console.log("본인 인증을 완료했습니다.");
                alert("본인 인증을 완료했습니다.");
                console.log(userNumber);
                if (root === 1) {
                    navigate("/findUpdatePW", {
                        state: { phoneNumber: userNumber, code: userCode },
                        replace: true,
                    });
                } else {
                    navigate("/sign", {
                        state: { phoneNumber: userNumber },
                        replace: true,
                    });
                }
            })
            .catch(function (error) {
                console.log("본인 인증을 실패했습니다.");
                console.log(error.response);
                if (error.response.data.code === 2200) {
                    alert("이미 사용중인 전화번호입니다.");
                } else {
                    alert("인증 번호가 일치하지 않습니다.");
                }
            });
    };

    const handleSendCode = () => {
        if (true) {
            setIsCodeSent(true);
            setTimer(300);
            axios
                .post(
                    `/auth/codes/send`,
                    { phoneNumber: userNumber },
                    {
                        headers: {
                            "Hertz-API-Version": 1,
                        },
                    }
                )
                .then(function (res) {
                    console.log(res);
                    alert("인증번호가 전송되었습니다.");
                })
                .catch(function (error) {
                    console.log("인증번호 전송에 실패했습니다.");
                    console.log(error.response);
                    alert("인증번호 전송에 실패했습니다.");
                });
        } else {
            alert("유효한 이메일 주소를 입력해주세요.");
        }
    };

    const handleSignupButtonClick = (e) => {
        e.preventDefault();
        if (isValidAll) {
            handleSubmit(e);
        }
    };

    const handleChangeCode = (e) => {
        setUserCode(e.target.value);
    };

    const handleUserChecked = (e) => {
        setUserChecked({
            ...userChecked,
            [e.target.name]: e.target.checked,
        });
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
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1.7 }}
                    >
                        <FormControl component="fieldset" variant="standard">
                            <Grid container spacing={2} alignItems="flex-end">
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
                                        본인 인증
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="telecom-label">
                                            통신사
                                        </InputLabel>
                                        <Select
                                            labelId="telecom-label"
                                            id="telecom"
                                            name="userTelecom"
                                            label="통신사"
                                            value={userTelecom}
                                            onChange={handleChangeTelecom}
                                        >
                                            <MenuItem value="">미선택</MenuItem>
                                            <MenuItem value="SKT">SKT</MenuItem>
                                            <MenuItem value="KT">KT</MenuItem>
                                            <MenuItem value="LG">LG</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="userNumber"
                                        name="userNumber"
                                        label="전화번호"
                                        placeholder="예) 01012345678"
                                        value={userNumber}
                                        onChange={handleChangeNumber}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={8}
                                    className="join_terms"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="check1"
                                                color="primary"
                                                checked={userChecked.check1}
                                                onChange={handleUserChecked}
                                            />
                                        }
                                        label="헤르츠 이용약관 (필수)"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="check2"
                                                color="primary"
                                                checked={userChecked.check2}
                                                onChange={handleUserChecked}
                                            />
                                        }
                                        label="개인정보 수집 및 이용 (필수)"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="check3"
                                                color="primary"
                                                checked={userChecked.check3}
                                                onChange={handleUserChecked}
                                            />
                                        }
                                        label="마케팅 수신 동의 (선택)"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            height: "100%",
                                            backgroundColor: "gray",
                                        }}
                                        onClick={handleSendCode}
                                        disabled={
                                            !userTelecom ||
                                            !userNumber ||
                                            !userChecked.check1 ||
                                            !userChecked.check2
                                        }
                                    >
                                        문자 발송
                                    </Button>
                                </Grid>
                                {isCodeInputVisible && (
                                    <Grid
                                        container
                                        item
                                        xs={12}
                                        alignItems="center"
                                    >
                                        <Grid item xs={10}>
                                            <TextField
                                                fullWidth
                                                id="userCode"
                                                name="userCode"
                                                label="인증번호"
                                                value={userCode}
                                                onChange={handleChangeCode}
                                            />
                                        </Grid>
                                        {isCodeSent && (
                                            <Grid item xs={2}>
                                                <Typography>
                                                    {Math.floor(timer / 60)}:
                                                    {timer % 60 < 10 ? "0" : ""}
                                                    {timer % 60}
                                                </Typography>
                                            </Grid>
                                        )}
                                    </Grid>
                                )}
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
                                        backgroundColor: "#637DBE",
                                    },
                                }}
                                size="large"
                                onClick={handleSignupButtonClick}
                                disabled={!isValidAll}
                            >
                                확인
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SelfSign;
