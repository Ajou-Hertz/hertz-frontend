import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

import MarketList from "../components/ProductList.js";
import Button from "@mui/material/Button";
import ProductList from "../components/ProductList.js";
import { MarketStateContext } from "../App";

import { useFetch } from "./../hooks/useFetch";

import NavBar from "../components/Sub/NavBar";
import { useRecoilState } from "recoil";
import { userState, userInfoState } from "../recoil/user.js";

function Home() {
    const marketList = useContext(MarketStateContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]); // get으로 가져온 데이터

    const [user, setUser] = useRecoilState(userState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    console.log(user?.token);
    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const response = await axios.get("/instruments", {
                    params: {
                        page: 0, // 페이지 번호
                        size: 8, // 페이지당 아이템 수
                        sort: "CREATED_BY_ASC", // 정렬 방식 (예: 오름차순)
                    },
                    headers: {
                        "Hertz-API-Version": "1", // 헤더에 버전 정보 추가
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching instruments:", error);
            }
        };

        fetchInstruments();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.token) {
                try {
                    const response = await axios.get("/users/me", {
                        headers: {
                            accept: "*/*",
                            "Hertz-API-Version": "1",
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    // 필요한 경우 response.data를 처리합니다.
                    console.log("User data:", response.data);
                    setUserInfo(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleSearch = (term) => {
        // 검색어 핸들러 추가
        console.log(term);
    };
    return (
        <div className="area">
            <NavBar onSearch={handleSearch} />

            <div style={{ position: "relative" }}>
                <div
                    style={{
                        position: "absolute",
                        width: "192px",
                        height: "42px",
                        left: "4px",
                        top: "-30px",
                        fontFamily: "Pretendard",
                        fontStyle: "normal",
                        fontWeight: "1000",
                        fontSize: "32px",
                        lineHeight: "24px",
                        textAlign: "center",
                        color: "#000000",
                    }}
                >
                    HOT
                </div>

                <div
                    className="MuiContainer-root MuiContainer-maxWidthLg"
                    style={{
                        backgroundColor: "#E4E7ED",
                        borderRadius: "5px",
                        margin: "0 60px",
                        marginTop: "100px",
                    }}
                >
                    <ProductList list={data} />
                </div>
            </div>
        </div>
    );
}

export default Home;
/* Rectangle 5 */
