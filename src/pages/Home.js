import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

import MarketList from "../components/ProductList.js";
import Button from "@mui/material/Button";
import ProductList from "../components/ProductList.js";
import { MarketStateContext } from "../App";

import { useFetch } from "./../hooks/useFetch";

import NavBar from "../components/Sub/NavBar";

function Home() {
    const marketList = useContext(MarketStateContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]); // get으로 가져온 데이터

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

    return (
        <div className="area">
            <NavBar></NavBar>
            <h1
                className="title"
                style={{ textAlign: "left", marginLeft: "70px" }}
            >
                Hot
            </h1>

            <div
                className="MuiContainer-root MuiContainer-maxWidthLg"
                style={{
                    backgroundColor: "#E4E7ED",
                    borderRadius: "5px",
                    margin: "0 60px",
                }}
            >
                <ProductList list={data} />
            </div>
        </div>
    );
}

export default Home;
/* Rectangle 5 */
