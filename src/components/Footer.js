import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TOS2 from "../components/TOS2";
import AgreementPrivacy2 from "../components/AgreementPrivacy2";
import AgreementMarketing2 from "../components/AgreementMarketing2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
function Footer() {
    const [showTOS, setShowTOS] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showMarketing, setShowMarketing] = useState(false);

    const navigate = useNavigate();

    // 이용약관 버튼 클릭 핸들러
    const handleToggleTOS = () => {
        setShowTOS(!showTOS);
    };
    // 개인정보처리 클릭 핸들러
    const handleTogglePrivacy = () => {
        setShowPrivacy(!showPrivacy);
    };

    // 마케팅 수신 동의 클릭 핸들러
    const handleToggleMarketing = () => {
        setShowMarketing(!showMarketing);
    };

    // 고객센터 버튼 클릭 핸들러
    const handleInquiryClick = () => {
        navigate("/inquiry");
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Footer */}
            <Box
                style={{ borderTop: "solid #eeeeee" }}
                sx={{ bgcolor: "background.paper", p: 6 }}
                component="footer"
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        gap: "16px", // Adjust the gap as needed
                    }}
                >
                    <Typography variant="h6" align="left" gutterBottom>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "16px",
                            }}
                        >
                            <button
                                onClick={handleToggleTOS}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontWeight: 490,
                                }}
                            >
                                이용약관
                            </button>
                            <button
                                onClick={handleTogglePrivacy}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontWeight: 490,
                                }}
                            >
                                개인정보처리방침
                            </button>
                            <button
                                onClick={handleInquiryClick}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontWeight: 490,
                                }}
                            >
                                고객센터
                            </button>
                            <button
                                onClick={handleToggleMarketing}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontWeight: 490,
                                }}
                            >
                                마케팅 수신 동의
                            </button>
                            <div>사업자 등록 번호 121-3299591 </div>
                        </div>
                    </Typography>
                </Box>
                <Typography
                    variant="subtitle2"
                    align="left"
                    color="text.secondary"
                    component="p"
                >
                    헤르츠는 본사이트에서 물품을 직접 판매하지 않습니다.
                    헤르츠에 등록된 판매물품과 물품의 내용은 판매자가 등록한
                    것으로 헤르츠와 헤르츠의 운영진은 그 등록내용과 상품에
                    대하여 일체의 책임을 지지 않습니다. 헤르츠에 등록된 모든
                    광고의 저작권 및 법적책임은 자료제공사(또는 글쓴이)에게
                    있으므로 헤르츠는 광고에 대한 책임을 지지 않습니다. 본사의
                    동의 없는 크롤링(스크래핑)등의 어떠한 자동수집도 허용하지
                    않습니다.
                </Typography>
                {showTOS && <TOS2 setShowTerm={true} />}
                {showPrivacy && <AgreementPrivacy2 setShowTerm={true} />}
                {showMarketing && <AgreementMarketing2 setShowTerm={true} />}
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

export default Footer;
