import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
const KAKAO_LOGIN_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_LOGIN_URL2 = "http://43.203.54.249:8080/api/auth/kakao/login";

function KakaoRedirect() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    useEffect(() => {
        const handleKakaoLogin = async () => {
            // URL에서 인가 코드 추출
            const urlParams = new URLSearchParams(window.location.search);
            const authorizationCode = urlParams.get("code");
            console.log(authorizationCode);
            if (!authorizationCode) {
                console.log("URL에서 인가 코드를 찾을 수 없습니다.");
                return;
            }

            // Kakao 로그인 요청 보내기
            try {
                // console.log(authorizationCode);
                const response = await axios.post(
                    // axios로 POST 요청을 보냅니다.
                    KAKAO_LOGIN_URL2,
                    // `grant_type=authorization_code&client_id=9644ca78b2842659ee55581bdffa7c58&client_secret=9B2rBJOwY9IIC2RXSFBahNWvCArIbPci&redirect_uri=http://localhost:3000/kakao/authorize/redirect-test&code=${authorizationCode}`, // 요청에 필요한 파라미터들을 문자열로 전달합니다.
                    // 요청에 필요한 파라미터들을 객체로 만들어 전달
                    {
                        redirectUri:
                            "http://localhost:3000/kakao/authorize/redirect-test",
                        authorizationCode: authorizationCode,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json", // 요청 헤더에 Content-Type을 설정합니다.
                            "Hertz-API-Version": 1,
                        },
                    }
                );
                // 응답 처리
                console.log(response?.data);
                const accessToken = response?.data?.access_token;
                //accesstoken 로컬 스토리지에 담기

                localStorage.setItem("token", accessToken);
                setUser(response.data);
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
                } else if (err.response?.status === 2200) {
                    alert(err.response?.data?.message);
                } else {
                    alert("이미 사용 중인 이메일입니다.");
                    navigate("/login", { replace: true });
                }
            }
        };

        handleKakaoLogin(); // 컴포넌트가 마운트되면 자동으로 Kakao 로그인을 시도합니다.
    }, []);

    return (
        <div>
            <p>카카오 로그인 중입니다...</p>
        </div>
    );
}

export default KakaoRedirect;
