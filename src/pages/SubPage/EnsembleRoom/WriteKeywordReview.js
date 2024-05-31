import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiCheckboxCircleFill } from "react-icons/ri";

import NavBar from "../../../components/Sub/NavBar";

const WriteKeywordReview = () => {
    const [fastResponse, setFastResponse] = useState(null); // 응대가 빨라요 버튼
    const [soundproofing, setSoundproofing] = useState(null); // 방음이 잘돼요 버튼
    const [revisit, setRevisit] = useState(null); // 다음에 또 이용하고 싶어요 버튼
    const [contentMatch, setContentMatch] = useState(null); // 글의 내용과 일치해요 버튼
    const [goodParking, setGoodParking] = useState(null); // 주차장이 편리해요 버튼
    const [goodfacility, setGoodfacility] = useState(null); // 시설이 좋아요 버튼
    const [kindlyReply, setKindlyReply] = useState(null); // 질문에 친절하게 답해줘요 버튼
    const [goodEquipment, setGoodEquipment] = useState(null); // 장비 관리가 잘되어 있어요 버튼
    const [cleanliness, setCleanliness] = useState(null); // 공간이 청결해요 버튼
    const [wide, setWide] = useState(null); // 공간이 넓어요 버튼

    // '응대가 빨라요' 버튼 클릭 핸들러
    const toggleFastResponse = () => {
        setFastResponse(!fastResponse);
    };
    // '방음이 잘돼요' 버튼 클릭 핸들러
    const toggleSoundproofing = () => {
        setSoundproofing(!soundproofing);
    };
    // '다음에 또 이용하고 싶어요' 버튼 클릭 핸들러
    const toggleRevisit = () => {
        setRevisit(!revisit);
    };
    // '글의 내용과 일치해요' 버튼 클릭 핸들러
    const toggleContentMatch = () => {
        setContentMatch(!contentMatch);
    };
    // '주차장이 편리해요' 버튼 클릭 핸들러
    const toggleGoodParking = () => {
        setGoodParking(!goodParking);
    };
    // '시설이 좋아요' 버튼 클릭 핸들러
    const toggleGoodfacility = () => {
        setGoodfacility(!goodfacility);
    };
    // '질문에 친절하게 답해줘요' 버튼 클릭 핸들러
    const toggleKindlyReply = () => {
        setKindlyReply(!kindlyReply);
    };
    // '장비 관리가 잘되어 있어요' 버튼 클릭 핸들러
    const toggleGoodEquipment = () => {
        setGoodEquipment(!goodEquipment);
    };
    // '공간이 청결해요' 버튼 클릭 핸들러
    const toggleCleanliness = () => {
        setCleanliness(!cleanliness);
    };
    // '공간이 넓어요' 버튼 클릭 핸들러
    const toggleWide = () => {
        setWide(!wide);
    };

    const navigate = useNavigate();

    // 텍스트리뷰 작성하기 페이지
    function clickWriteTextReview() {
        navigate("/WriteTextReview");
    }
    const handleSearch = (term) => {
        // 검색어 핸들러 추가
        console.log(term);
    };
    return (
        <div>
            <NavBar onSearch={handleSearch} />
            <p
                style={{
                    textAlign: "left",
                    fontSize: "20px",
                    margin: "40px 50px 20px 50px",
                }}
            >
                합주실 / 리뷰페이지 / 리뷰작성
            </p>
            {/* 리뷰 키워드 선택 */}
            <div
                style={{
                    border: "1px solid black",
                    margin: "0 50px 50px 50px",
                }}
            >
                <p
                    style={{
                        margin: "30px",
                        fontWeight: "bold",
                        fontSize: "22px",
                    }}
                >
                    KEYWORD REVIEW
                </p>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flex: "0 0 30%",
                        flexDirection: "row",
                        margin: "15px 45px",
                    }}
                >
                    <button
                        onClick={toggleFastResponse}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        응대가 빨라요
                        {fastResponse ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleSoundproofing}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        방음이 잘돼요
                        {soundproofing ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleRevisit}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        다음에 또 이용하고 싶어요
                        {revisit ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleContentMatch}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        글의 내용과 일치해요
                        {contentMatch ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleGoodParking}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        주차장이 편리해요
                        {goodParking ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleGoodfacility}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        시설이 좋아요
                        {goodfacility ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleKindlyReply}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        질문에 친절하게 답해줘요
                        {kindlyReply ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleGoodEquipment}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        장비 관리가 잘되어 있어요
                        {goodEquipment ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleCleanliness}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        공간이 청결해요
                        {cleanliness ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                    <button
                        onClick={toggleWide}
                        style={{
                            margin: "15px 20px",
                            padding: "10px",
                            width: "400px",
                            backgroundColor: "#D6E0F3",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        공간이 넓어요
                        {wide ? (
                            <RiCheckboxCircleFill color="red" />
                        ) : (
                            <RiCheckboxCircleFill color="white" />
                        )}
                    </button>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "auto",
                    }}
                >
                    <button
                        style={{
                            backgroundColor: "#637DBE",
                            border: "none",
                            borderRadius: "10px 0 0 0",
                            padding: "10px 30px",
                            color: "white",
                        }}
                        onClick={clickWriteTextReview}
                    >
                        텍스트리뷰 작성하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteKeywordReview;
