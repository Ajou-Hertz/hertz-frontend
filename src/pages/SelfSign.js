import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SelfSign = (props) => {
    const navigate = useNavigate();
    const theme = createTheme();

    const [userCode, setUserCode] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [userTelecom, setUserTelecom] = useState("");

    const [isValidAll, setIsvalidAll] = useState(false);
    const [isCodeInputVisible, setIsCodeInputVisible] = useState(false);

    useEffect(() => {
        setIsCodeInputVisible(userTelecom !== "" && userNumber !== "");
    }, [userTelecom, userNumber]);

    useEffect(() => {
        setIsvalidAll(
            userCode !== "" && userNumber !== "" && userTelecom !== ""
        );
    }, [userCode, userNumber, userTelecom]);

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
                navigate("/sign", {
                    state: { phoneNumber: userNumber },
                    replace: true,
                });
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
                                            <MenuItem value="MALE">
                                                SKT
                                            </MenuItem>
                                            <MenuItem value="FEMALE">
                                                KT
                                            </MenuItem>
                                            <MenuItem value="FEMALE">
                                                LG
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8}>
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
                                        disabled={!userTelecom || !userNumber}
                                    >
                                        문자 발송
                                    </Button>
                                </Grid>
                                {isCodeInputVisible && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="userCode"
                                            name="userCode"
                                            label="인증번호"
                                            value={userCode}
                                            onChange={handleChangeCode}
                                        />
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
