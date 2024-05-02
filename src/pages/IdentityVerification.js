import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

// import { Cookies } from "react-cookie";

import { Container, Box, InputLabel, FormControl, Select, MenuItem, Button, TextField, FormControlLabel } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "antd/dist/antd.css";
import { Typography, Divider } from "antd";

const { Title } = Typography;
const theme = createTheme();

const IdentityVerification = () => {
    const [newsAgency, setNewsAgency] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState("");

    // 통신사 선택 드롭다운 핸들러
    const handleChangeNewsAgency = (event) => {
        setNewsAgency(event.target.value);
    };

    // 전화번호 핸들러
    const handleChangePhoneNumber = (event) => {
        setUserPhoneNumber(event.target.value);
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
                <Title level={2}>본인인증</Title>
                {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon  />
                </Avatar> */}
                <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="통신사-label">통신사</InputLabel>
                        <Select
                            labelId="통신사-label"
                            id="통신사-select"
                            value={newsAgency}
                            label="통신사"
                            onChange={handleChangeNewsAgency}
                        >
                            <MenuItem value={"SKT"}>SKT</MenuItem>
                            <MenuItem value={"KT"}>KT</MenuItem>
                            <MenuItem value={"U+"}>U+</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        autoFocus
                        fullWidth
                        type="phoneNumber"
                        id="phoneNumber"
                        name="phoneNumber"
                        label="전화번호"
                        autoComplete="phoneNumber"
                        // error={!isValidPhoneNumber && userPhoneNumber != ""}
                        // helperText={
                        //     isValidPhoneNumber || userPhoneNumber == ""
                        //         ? ""
                        //         : "올바른 전화번호를 입력해주세요."
                        // }
                        value={userPhoneNumber}
                        onChange={handleChangePhoneNumber}
                    >
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="large"
                    >
                        확인
                    </Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
  );
};

export default IdentityVerification