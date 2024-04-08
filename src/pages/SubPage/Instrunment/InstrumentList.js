import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../api/axios.js";

import ProductList from "../../../components/ProductList.js";
import { MarketStateContext } from "../../../App.js";

import NavBar from "../../../components/Sub/NavBar";
import DropdownInstrument from "../../../components/Sub/Dropdown/DropdownInstrument";
import DropdownInAll from "../../../components/Sub/Dropdown/DropdownInAll";

function InstrumentList() {
    const marketList = useContext(MarketStateContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]); // get으로 가져온 데이터

    const [selectedInstrument, setSelectedInstrument] = useState("일렉기타"); // 선택한 악기 종류 상태

    const fetchInstrumentData = async (selectedMenuType) => {
        // 새로운 함수 추가
        try {
            const response = await axios.get(
                // 선택된 메뉴 유형에 따라 다른 API 호출
                `/instruments/${selectedMenuType
                    .split(" ")
                    .map((word) => word.toLowerCase())
                    .join("-")}`,
                {
                    params: {
                        page: 0, // 페이지 번호
                        size: 20, // 페이지당 아이템 수
                        sort: "CREATED_BY_DESC", // 정렬 방식 (예: 오름차순)
                    },
                    headers: {
                        "Hertz-API-Version": "1", // 헤더에 버전 정보 추가
                    },
                }
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching instruments:", error);
        }
    };

    useEffect(() => {
        fetchInstrumentData("electric-guitars"); // 초기 데이터 호출
    }, []); // 초기 렌더링 시 한 번만 호출

    const handleInstrumentSelect = (selected) => {
        fetchInstrumentData(selected);
        switch (selected) {
            case "이펙터":
                fetchInstrumentData("effectors");
                break;
            case "앰프":
                fetchInstrumentData("amplifiers");
                break;
            case "베이스":
                fetchInstrumentData("bass-guitars");
                break;
            case "어쿠스틱&클래식":
                fetchInstrumentData("acoustic-and-classic-guitars");
                break;
            case "음향장비":
                fetchInstrumentData("audio-equipments");
                break;
            default:
                fetchInstrumentData("electric-guitars");
        }
    };

    return (
        <div>
            <NavBar />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "50px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
            >
                <DropdownInstrument
                    onSelectInstrument={handleInstrumentSelect}
                    style={{ position: "relative", zIndex: 100 }}
                />
                <DropdownInAll style={{ position: "relative", zIndex: 100 }} />
            </div>
            {/* MarketList에 필터된 데이터 전달 */}
            <ProductList list={data} />
        </div>
    );
}

export default InstrumentList;
