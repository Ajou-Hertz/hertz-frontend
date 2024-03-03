import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
function Footer() {
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
                            <div>이용약관 </div>
                            <div>개인정보처리방침 </div>
                            <div>고객센터 </div>
                            <div>마케팅 수신 동의 </div>
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
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

export default Footer;
