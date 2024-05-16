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

    return (
        <div className="area">
            <NavBar></NavBar>

            <div>
                <svg //HOT
                    width="70"
                    height="25"
                    viewBox="0 0 41 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        position: "absolute", // 추가: 아이콘의 위치를 절대 위치로 설정
                        top: "31%", // 추가: 아이콘을 수직 중앙으로 이동
                        left: "7%", // 추가: 아이콘을 수평 중앙으로 이동
                        transform: "translate(-50%, -50%)", // 추가: 아이콘을 정확히 중앙으로 이동
                    }}
                >
                    <path
                        d="M3.28999 15H0.354908V0.856353H3.28999V6.71271H9.41568V0.856353H12.3577V15H9.41568V9.13674H3.28999V15ZM27.6914 7.92818C27.6914 9.4291 27.4037 10.7274 26.8282 11.8232C26.2573 12.919 25.4723 13.7546 24.4732 14.3301C23.4741 14.9056 22.3438 15.1934 21.0823 15.1934C19.8208 15.1934 18.6905 14.9056 17.6914 14.3301C16.6923 13.75 15.9074 12.9121 15.3365 11.8163C14.7656 10.7205 14.4801 9.42449 14.4801 7.92818C14.4801 6.42726 14.7656 5.12891 15.3365 4.03315C15.9074 2.93738 16.6923 2.10175 17.6914 1.52624C18.6905 0.950736 19.8208 0.662982 21.0823 0.662982C22.3438 0.662982 23.4741 0.950736 24.4732 1.52624C25.4723 2.10175 26.2573 2.93738 26.8282 4.03315C27.4037 5.12891 27.6914 6.42726 27.6914 7.92818ZM24.7149 7.92818C24.7149 6.93831 24.5653 6.09346 24.266 5.39365C23.9668 4.69383 23.5432 4.16436 22.9953 3.80525C22.452 3.44613 21.8144 3.26657 21.0823 3.26657C20.3503 3.26657 19.7126 3.44843 19.1693 3.81215C18.6261 4.17127 18.2048 4.70074 17.9055 5.40055C17.6063 6.09576 17.4566 6.93831 17.4566 7.92818C17.4566 8.91805 17.6063 9.76289 17.9055 10.4627C18.2048 11.1579 18.6261 11.6874 19.1693 12.0511C19.7126 12.4102 20.3503 12.5898 21.0823 12.5898C21.8144 12.5898 22.452 12.4102 22.9953 12.0511C23.5432 11.692 23.9668 11.1625 24.266 10.4627C24.5653 9.76289 24.7149 8.91805 24.7149 7.92818ZM32.9676 3.28729H28.6236V0.856353H40.2051V3.28729H35.875V15H32.9676V3.28729Z"
                        fill="black"
                    />
                </svg>
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
    );
}

export default Home;
/* Rectangle 5 */
