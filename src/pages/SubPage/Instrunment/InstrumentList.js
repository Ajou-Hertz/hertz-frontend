import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../api/axios.js";

import MarketList from "../../../components/ProductList.js";
import ProductList from "../../../components/ProductList.js";
import { MarketStateContext } from "../../../App.js";

//import InstrumentCardList from '../../../components/Sub/Card/InstrumentCardList.js';

import { useFetch } from "../../../hooks/useFetch.js";

import NavBar from "../../../components/Sub/NavBar";
import DropdownInstrument from "../../../components/Sub/Dropdown/DropdownInstrument";
import DropdownInAll from "../../../components/Sub/Dropdown/DropdownInAll";

import InstrumentDetail from "./InstrumentDetail.js";

function InstrumentList() {
    const marketList = useContext(MarketStateContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]); // get으로 가져온 데이터

    const [selectedInstrument, setSelectedInstrument] = useState("일렉기타"); // 선택한 악기 종류 상태

    // 선택한 악기 종류에 따라 데이터 필터링
    // const filteredData = data.filter(
    //     (item) =>
    //         selectedInstrument === "all" || item.type === selectedInstrument
    // );

    const gotoDetailPage = () => {
        navigate("/InstrumentDetail");
    };

    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const response = await axios.get(
                    "/instruments/electric-guitars",
                    {
                        params: {
                            page: 0, // 페이지 번호
                            size: 20, // 페이지당 아이템 수
                            sort: "CREATED_BY_ASC", // 정렬 방식 (예: 오름차순)
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

        fetchInstruments();
    }, []);

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
                <DropdownInstrument style={{ position: 'relative', zIndex: 100 }} />
                <DropdownInAll style={{ position: 'relative', zIndex: 100 }} />

                {/* <DropdownInstrument />
                <div style={{ marginLeft: "auto" }}>
                    <DropdownInAll />
                </div> */}
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

export default InstrumentList;
