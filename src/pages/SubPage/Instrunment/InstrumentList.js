import React, { useState, useEffect } from "react";

import axios from "../../../api/axios.js";

import ProductList from "../../../components/ProductList.js";

import NavBar from "../../../components/Sub/NavBar";
import DropdownInstrument from "../../../components/Sub/Dropdown/DropdownInstrument";
import DropdownInAll from "../../../components/Sub/Dropdown/DropdownInAll";

function InstrumentList() {
    const [data, setData] = useState([]); // get으로 가져온 데이터

    const [selectedInstrument, setSelectedInstrument] = useState("일렉기타"); // 선택한 악기 종류 상태
    const [selectedProgress, setSelectedProgress] = useState(""); // 선택한 진행 상태 상태

    const fetchInstrumentData = async (selectedMenuType, selectedProgress) => {
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
                        size: 30, // 페이지당 아이템 수
                        sort: "CREATED_BY_DESC", // 정렬 방식 (예: 오름차순)
                        progress: selectedProgress, // 선택한 진행 상태
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
        setSelectedInstrument("electric-guitars");
    }, []);

    const handleInstrumentSelect = (selected) => {
        switch (selected) {
            case "이펙터":
                setSelectedInstrument("effectors");
                fetchInstrumentData("effectors");
                break;
            case "앰프":
                setSelectedInstrument("amplifiers");
                fetchInstrumentData("amplifiers");
                break;
            case "베이스":
                setSelectedInstrument("bass-guitars");
                fetchInstrumentData("bass-guitars");
                break;
            case "어쿠스틱&클래식":
                setSelectedInstrument("acoustic-and-classic-guitars");
                fetchInstrumentData("acoustic-and-classic-guitars");
                break;
            case "음향장비":
                setSelectedInstrument("audio-equipments");
                fetchInstrumentData("audio-equipments");
                break;
            default:
                setSelectedInstrument("electric-guitars");
                fetchInstrumentData("electric-guitars");
        }
    };

    const handleInstrumentIng = (ing) => {
        switch (ing) {
            case "판매중":
                setSelectedProgress("SELLING");
                fetchInstrumentData(selectedInstrument, "SELLING");
                break;
            case "판매완료":
                setSelectedProgress("SOLD_OUT");
                fetchInstrumentData(selectedInstrument, "SOLD_OUT");
                break;
            case "예약중":
                setSelectedProgress("RESERVED");
                fetchInstrumentData(selectedInstrument, "RESERVED");
                break;
            default:
                setSelectedProgress("");
                fetchInstrumentData(selectedInstrument, "");
        }
        // fetchInstrumentData(selectedInstrument, ing);
        setSelectedProgress(ing);
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
                <DropdownInAll
                    onSelectProgress={handleInstrumentIng}
                    style={{ position: "relative", zIndex: 100 }}
                />
            </div>
            {/* MarketList에 필터된 데이터 전달 */}
            <ProductList list={data} />
        </div>
    );
}

export default InstrumentList;
