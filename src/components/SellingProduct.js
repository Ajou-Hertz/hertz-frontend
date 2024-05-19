import React from "react";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "../api/axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { useNavigate } from "react-router-dom";

function SellingProduct({ userData }) {
    const [user, setUser] = useRecoilState(userState);
    const btnStyle2 = {
        // fontSize: "25px",
        // padding: "2rem 2rem",
        margin: "1.2rem",
        textAlign: "left",
    };
    console.log(userData);
    const navigate = useNavigate();

    // 매물 삭제 함수
    const handleDeleteItem = async (instrumentId) => {
        try {
            const token = user?.token || user?.access_token;
            if (!token) return;

            // confirm을 통해 사용자의 동의 여부 확인
            const confirmation = window.confirm("정말로 삭제하시겠습니까?");
            if (!confirmation) return;

            // 매물 삭제 API 호출
            await axios.delete(`/instruments/${instrumentId}`, {
                headers: {
                    "Hertz-API-Version": "1",
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    instrumentId: instrumentId,
                },
            });
            alert("정상적으로 삭제되었습니다.");
            // 삭제 성공 시 화면 갱신을 위해 페이지 새로고침
            window.location.reload();
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("삭제가 실패하였습니다.");
        }
    };
    // 수정하기 페이지
    function clickModify(instrumentId) {
        navigate(`/instruments/modify/${instrumentId}`);
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <div>
                {userData?.root === undefined ? (
                    <h3 style={btnStyle2}>판매 내역</h3>
                ) : (
                    <h3 style={btnStyle2}>나의 판매 내역</h3>
                )}
                <Divider />
                <ImageList sx={{ width: "100%", height: 460 }} cols={6}>
                    {userData?.createdInstruments?.map((item) => (
                        <ImageListItem
                            key={item.img}
                            sx={{ width: "100%", height: "auto" }}
                        >
                            {userData?.root === "my" ? null : (
                                <span style={{ backgroundColor: "#D6E0F3" }}>
                                    {item.progressStatus === "SELLING" ? (
                                        "판매중"
                                    ) : item.progressStatus === "RESERVED" ? (
                                        <span style={{ color: "#637DBE" }}>
                                            예약중
                                        </span>
                                    ) : (
                                        <span style={{ color: "#757575" }}>
                                            판매완료
                                        </span>
                                    )}
                                </span>
                            )}
                            {userData?.root === undefined ? null : (
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                >
                                    X
                                </button>
                            )}
                            <img
                                src={item.images[0]?.url}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={
                                    <React.Fragment>
                                        <span>
                                            {item.price.toLocaleString()} 원
                                        </span>
                                        <br />
                                        <svg
                                            width="10"
                                            height="13"
                                            viewBox="0 0 10 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.29002 6.65852C4.82564 13.3171 7.79223 8.56098 5.04492 13C2.07917 8.55415 5.16825 13.3175 0.705391 6.65853C-0.999195 4.11512 0.362127 -0.000187729 5.04492 6.423e-09C9.64725 0.000184516 10.9953 4.11512 9.29002 6.65852Z"
                                                fill="#D9D9D9"
                                            />
                                            <circle
                                                cx="5"
                                                cy="4"
                                                r="2"
                                                fill="#757575"
                                            />
                                        </svg>
                                        <span stype={{ margin_top: 200 }}>
                                            {" "}
                                            {item.tradeAddress?.sido}{" "}
                                            {item.tradeAddress?.sgg}{" "}
                                            {item.tradeAddress?.emd}
                                        </span>
                                        <br />
                                        {userData?.root === undefined ? null : (
                                            <button
                                                onClick={() =>
                                                    clickModify(item.id)
                                                }
                                                style={{
                                                    color: "#FF4B4B",
                                                    fontSize: "14px",
                                                    backgroundColor: "white", // 배경색상
                                                    border: "1px solid white", // 테두리 색상 및 굵기
                                                    height: 30,
                                                }}
                                            >
                                                매물 상세 수정하기
                                            </button>
                                        )}
                                    </React.Fragment>
                                }
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
    );
}

export default SellingProduct;
