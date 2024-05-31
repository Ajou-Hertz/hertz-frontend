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
    const [Sido, setSido] = useState([]); // 시도 상태
    const [Sgg, setSgg] = useState([]); // 시군구 상태 추가
    const [selectedSido, setSelectedSido] = useState(""); // 선택한 시도 상태
    const [selectedSgg, setSelectedSgg] = useState(""); // 선택한 시군구 상태

    // 드롭다운에서 선택된 항목을 처리하는 핸들러
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // 시도 get api
    useEffect(() => {
        try {
            axios
                .get("/administrative-areas/sido", {
                    headers: {
                        "Hertz-API-Version": 1,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const sidoArray = response.data.content.map(
                            (item) => item.name
                        );
                        setSido(sidoArray);
                    } else {
                        console.error("시도 목록을 불러오는데 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error(
                        "시도 목록 요청 중 오류가 발생했습니다:",
                        error
                    );
                });
        } catch (error) {
            console.error("시도 목록 요청 중 오류가 발생했습니다:", error);
        }
    }, []);

    // 시도 선택 핸들러
    const handleSidoChange = (e) => {
        const selectedSidoName = e.target.value; // 선택된 시도의 이름
        const selectedIndex = Sido.findIndex(
            (item) => item === selectedSidoName
        ); // 선택된 시도의 인덱스
        if (selectedIndex !== -1) {
            const selectedSidoId = selectedIndex + 1; // 선택된 시도의 인덱스 + 1을 ID로 사용
            setSelectedSido(selectedSidoName);
            // 선택된 시도에 해당하는 시군구 목록을 불러오기 위해 api 호출
            axios
                .get(`/administrative-areas/sgg?sidoId=${selectedSidoId}`, {
                    headers: {
                        "Hertz-API-Version": 1,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const sggArray = response.data.content.map((item) => ({
                            id: item.id,
                            name: item.name,
                        }));
                        setSgg(sggArray);
                    } else {
                        console.error("시군구 목록을 불러오는데 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error(
                        "시군구 목록 요청 중 오류가 발생했습니다:",
                        error
                    );
                });
        } else {
            console.error("선택된 시도를 찾을 수 없습니다.");
        }
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
    const handleSearch = (term) => {
        // 검색어 핸들러 추가
        console.log(term);
    };
    return (
        <div>
            <NavBar onSearch={handleSearch} />
            <div
                style={{
                    display: "flex",
                    paddingBottom: "50px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
            >
                {/* 시간 / 일 / 월 선택 드롭다운 */}
                <select
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={dropdownStyle}
                >
                    <option value="전체">전체</option>
                    <option value="시간">시간</option>
                    <option value="일">일</option>
                    <option value="월">월</option>
                </select>

                {/* 지역 선택 드롭다운 */}
                <div>
                    {/* 시도 선택 드롭다운 */}
                    <select
                        onChange={(e) => handleSidoChange(e)}
                        style={dropdownStyle}
                    >
                        <option value="">지역</option>
                        {Sido &&
                            Sido.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                    </select>
                    {/* 시군구 선택 드롭다운 */}
                    {selectedSido && (
                        <select
                            onChange={(e) => setSelectedSgg(e.target.value)}
                            style={dropdownStyle}
                        >
                            <option value="">시군구</option>
                            {Sgg &&
                                Sgg.map((item) => (
                                    <option key={item.name} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
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
