import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../api/axios.js";

import MarketList from "../../../components/ProductList.js";
import ProductList from "../../../components/ProductList.js";
import { MarketStateContext } from "../../../App.js";

//import InstrumentCardList from '../../../components/Sub/Card/InstrumentCardList.js';

import { useFetch } from "../../../hooks/useFetch.js";

import NavBar from "../../../components/Sub/NavBar.js";
import EnsembleRoomDetail from "./EnsembleRoomDetail.js";

// 공통 드롭다운 스타일
const dropdownStyle = {
    backgroundColor: "#D6E0F3",
    border: "1px solid white",
    textAlign: "center",
    width: "150px",
    height: "30px",
};

function EnsembleRoomList() {
    const marketList = useContext(MarketStateContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]); // get으로 가져온 데이터

    const [selectedDate, setSelectedDate] = useState("전체"); // 선택한 날짜 종류 상태
    const [selectedSido, setSelectedSido] = useState(false); // 선택한 시도 상태
    const [selectedSgg, setSelectedSgg] = useState("시/군/구"); // 선택한 시군구 상태


    // 드롭다운에서 선택된 항목을 처리하는 핸들러
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const gotoDetailPage = () => {
        navigate("/EnsembleRoomDetail");
    };

    // useEffect(() => {
    //     const fetchInstruments = async () => {
    //         try {
    //             const response = await axios.get(
    //                 "/instruments/electric-guitars",
    //                 {
    //                     params: {
    //                         page: 0, // 페이지 번호
    //                         size: 20, // 페이지당 아이템 수
    //                         sort: "CREATED_BY_ASC", // 정렬 방식 (예: 오름차순)
    //                     },
    //                     headers: {
    //                         "Hertz-API-Version": "1", // 헤더에 버전 정보 추가
    //                     },
    //                 }
    //             );
    //             setData(response.data);
    //         } catch (error) {
    //             console.error("Error fetching instruments:", error);
    //         }
    //     };

    //     fetchInstruments();
    // }, []);

    return (
        <div>
            <NavBar />
            <div
                style={{
                    display: "flex", paddingBottom: "50px", paddingLeft: "50px", paddingRight: "50px",
                }}
            >
                {/* 시간 / 일 / 월 선택 드롭다운 */}
                <select value={selectedDate} onChange={handleDateChange}  style={dropdownStyle}>
                    <option value="전체">전체</option>
                    <option value="시간">시간</option>
                    <option value="일">일</option>
                    <option value="월">월</option>
                </select>

                {/* 지역 선택 드롭다운 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* 지역 선택 시 */}
                    <button onClick={() => setSelectedSido(!selectedSido)}  style={dropdownStyle}>
                        지역
                    </button>
                    {/* 시도 선택 드롭다운 */}
                    {selectedSido && (
                        <select style={dropdownStyle}>
                            <option value="option1">지역 1</option>
                            <option value="option2">지역 2</option>
                            <option value="option3">지역 3</option>
                        </select>
                    )}
                </div>
                {/* <DropdownInstrument style={{ position: 'relative', zIndex: 100 }} /> */}
            </div>
            {/* MarketList에 필터된 데이터 전달 */}
            <ProductList list={data} />
            {/* <MarketList list={filteredData} onItemClick={gotoDetailPage} />
            <MarketList list={marketList} onItemClick={gotoDetailPage} />
            <MarketList list={data} onItemClick={gotoDetailPage} /> */}
        </div>
    );
    //style={{ display: 'flex', justifyContent: 'flex-end' }}
}

export default EnsembleRoomList;
