import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/Sub/NavBar";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

const Review = () => {
    const [selectedKeywords, setSelectedKeywords] = useState(null); // 사용자가 선택한 키워드
    const [userID, setUserID] = useState(""); // 사용자 아이디
    const [helpfulButtonClicked, setHelpfulButtonClicked] = useState(false); // 도움이 되었어요 버튼

    // 토큰 가져오기
    const token = localStorage.getItem("token");
    console.log("토큰 확인", token);

    const [isLoggedIn, setIsLoggedIn] = useState(!!token); // 로그인 상태

    const navigate = useNavigate();

    //
    const clickWriteKeywordReview = () => {
        if (isLoggedIn) {
            // 로그인 상태일 때, 키워드 리뷰 선택하는 페이지로 이동
            console.log("로그인 완료로"); // 로그인 상태 확인
            navigate("/WriteKeywordReview");
        } else {
            // 로그인 상태가 아닐 때, 팝업 메시지를 보여주고 로그인 페이지로 이동
            alert("로그인 후에 사용해주세요.");
            navigate("/Login");
        }
    };

    // 도움이 되었어요 버튼 클릭 핸들러
    const handleHelpfulButtonClick = () => {
        setHelpfulButtonClicked(!helpfulButtonClicked);
    };

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
                합주실 / 리뷰페이지
            </p>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                    style={{
                        width: "30%",
                        marginLeft: "50px",
                        marginBottom: "50px",
                    }}
                >
                    {/* Keyword */}
                    <div
                        style={{
                            border: "1px solid black",
                            height: "600px",
                            overflowY: "auto",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "10px 20px",
                            }}
                        >
                            <p
                                style={{
                                    marginTop: "10px",
                                    textAlign: "left",
                                    fontWeight: "bold",
                                    fontSize: "22px",
                                }}
                            >
                                KEYWORD
                            </p>
                            <button
                                style={{
                                    backgroundColor: "#637DBE",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "10px",
                                    padding: "5px 20px",
                                    marginTop: "5px",
                                    height: "45px",
                                }}
                                onClick={clickWriteKeywordReview}
                            >
                                작성하기
                            </button>
                        </div>
                        {/* 리뷰 키워드들 */}
                        <div>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                시설이 청결해요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                응대가 빨라요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                방음이 잘돼요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                시설이 청결해요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                응대가 빨라요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                방음이 잘돼요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                응대가 빨라요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                방음이 잘돼요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                응대가 빨라요
                            </p>
                            <p
                                style={{
                                    margin: "15px 20px",
                                    padding: "10px",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "18px",
                                }}
                            >
                                방음이 잘돼요
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: "70%",
                        marginRight: "50px",
                        marginLeft: "40px",
                        marginBottom: "50px",
                    }}
                >
                    {/* text */}
                    <div
                        style={{
                            border: "1px solid black",
                            height: "600px",
                            overflowY: "auto",
                        }}
                    >
                        <p
                            style={{
                                margin: "20px 30px",
                                textAlign: "left",
                                fontWeight: "bold",
                                fontSize: "22px",
                            }}
                        >
                            Text
                        </p>
                        {/* 텍스트 리뷰들 */}
                        <div
                            style={{
                                border: "1px solid black",
                                minHeight: "150px",
                                margin: "30px",
                            }}
                        >
                            <div style={{ textAlign: "left", margin: "10px" }}>
                                <p
                                    value={userID}
                                    style={{
                                        display: "inline",
                                        marginLeft: "20px",
                                    }}
                                >
                                    qwe****
                                </p>
                                <p
                                    style={{
                                        display: "inline",
                                        marginLeft: "50px",
                                    }}
                                >
                                    2024.02.05
                                </p>
                                <p style={{ margin: "20px 50px" }}>
                                    최대 7명이라고 했는데 7명이선 좀 좁았어요.
                                    6명이 적당해보여요.
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "auto",
                                    }}
                                >
                                    <button
                                        onClick={handleHelpfulButtonClick}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#637DBE",
                                            border: helpfulButtonClicked
                                                ? "3px solid #D6E0F3"
                                                : "3px solid white", // 조건부 스타일 적용
                                            borderRadius: "10px",
                                            margin: "0px",
                                            padding: "10px 30px 10px 30px",
                                            color: "white",
                                        }}
                                    >
                                        도움이 되었어요
                                        {helpfulButtonClicked ? (
                                            <FaThumbsUp
                                                style={{ marginLeft: "4px" }}
                                            />
                                        ) : (
                                            <FaRegThumbsUp
                                                style={{ marginLeft: "4px" }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
