import React, { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axios";
import NavBar from "../../../components/Sub/NavBar";
import UploadPhoto from "../../../components/Sub/UploadPhoto";
import ElectricGuitar from "../../../components/Sub/InstrumentSelection.js/ElectricGuitar";
import Effector from "../../../components/Sub/InstrumentSelection.js/Effector";
import Amp from "../../../components/Sub/InstrumentSelection.js/Amp";
import Bass from "../../../components/Sub/InstrumentSelection.js/Bass";
import AcousticClassic from "../../../components/Sub/InstrumentSelection.js/AcousticClassic";
import Equipement from "../../../components/Sub/InstrumentSelection.js/Equipement";
import EnsembleRoom from "../../../components/Sub/InstrumentSelection.js/EnsembleRoom";
import useAuth from "../../../hooks/useAuth";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil";

const InstrumentUpload = () => {
    const { auth } = useAuth();
    const [user, setUser] = useRecoilState(userState);
    // 매물 정보 상태를 관리합니다. 여기서는 초기값이 비어있거나 기본값을 가질 수 있습니다.
    const [productName, setProductName] = useState(""); // 매물 이름
    const [description, setDescription] = useState(""); // 상세 정보 입력

    const [selectedOption, setSelectedOption] = useState("일렉기타"); // 드롭다운 초기 선택값

    const [selectedImage, setSelectedImage] = useState([]); // 선택한 이미지 상태
    const [selectProgressStatus, setSelectProgressStatus] = useState("SELLING"); // 판매중 버튼 상태

    const [electricGuitarData, setElectricGuitarData] = useState(""); // 일렉기타 컴포넌트에서 받아온 정보 상태
    // const [effectorData, setEffectorData] = useState(""); // 이펙터 컴포넌트에서 받아온 정보 상태
    const [ampData, setAmpData] = useState(""); // 앰프 컴포넌트에서 받아온 정보 상태
    // const [bassData, setBassData] = useState(""); // 베이스 컴포넌트에서 받아온 정보 상태
    // const [aCData, setACData] = useState(""); // 어쿠스틱클래식 컴포넌트에서 받아온 정보 상태
    // const [equipementData, setEquipementData] = useState(""); // 음향장비 컴포넌트에서 받아온 정보 상태
    // const [ensembleRoomData, setEnsembleRoomData] = useState(""); // 합주실 컴포넌트에서 받아온 정보 상태

    // 입력 필드의 값이 변경될 때마다 상태를 업데이트하는 함수
    const handleNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        const inputValue = e.target.value;
        if (!containsLink(inputValue)) {
            setDescription(inputValue);
        } else {
            alert("링크를 포함한 텍스트는 입력할 수 없습니다.");
        }
    };

    // 드롭다운 선택을 처리하는 함수
    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    // 드롭다운 메뉴 옵션과 컴포넌트 매핑
    const componentMapping = {
        일렉기타: ElectricGuitar,
        이펙터: Effector,
        앰프: Amp,
        베이스: Bass,
        "어쿠스틱&클래식": AcousticClassic,
        음향장비: Equipement,
        합주실: EnsembleRoom,
    };

    // 선택된 옵션에 따라 렌더링할 컴포넌트 결정
    const SelectedComponent = componentMapping[selectedOption];

    // 이미지 변경 시 호출될 함수
    const handleImageChange = (image) => {
        setSelectedImage(image);
        console.log("선택한 이미지:", image);
    };

    // 링크를 포함하는지 여부를 확인하는 함수
    const containsLink = (text) => {
        const linkPattern =
            /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/;
        return linkPattern.test(text);
    };

    // 폼 제출 함수입니다. 여기서 새로운 악기 정보를 서버로 보내는 로직이 들어가야함
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !productName ||
            !selectProgressStatus ||
            !electricGuitarData ||
            !description ||
            !selectedImage.length
        ) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }
        try {
            const Data = new FormData();

            Data.append("brand", electricGuitarData.brand);
            Data.append("model", electricGuitarData.model);
            Data.append("productionYear", electricGuitarData.productionYear);
            Data.append("color", electricGuitarData.color);
            Data.append("title", productName);
            Data.append("progressStatus", selectProgressStatus);
            Data.append(
                "tradeAddress.sido",
                electricGuitarData.tradeAddress.sido
            );
            Data.append(
                "tradeAddress.sgg",
                electricGuitarData.tradeAddress.sgg
            );
            Data.append(
                "tradeAddress.emd",
                electricGuitarData.tradeAddress.emd
            );
            Data.append("qualityStatus", electricGuitarData.selectedState);
            Data.append("price", electricGuitarData.price);
            Data.append("hasAnomaly", electricGuitarData.selectedFeature);
            Data.append("description", description);

            for (const image of selectedImage) {
                Data.append("images", image);
            }
            for (const hashtag of electricGuitarData.hashtags) {
                Data.append("hashtags[]", hashtag);
            }

            // 선택된 옵션에 따라 다른 엔드포인트로 데이터 전송
            // let endpoint = "";
            // if (selectedOption === "일렉기타") {
            //     endpoint = "/instruments/electric-guitars";
            // } else if (selectedOption === "앰프") {
            //     endpoint = "/instruments/amplifiers";
            // }

            const response = await axiosPrivate.post(
                //endpoint,
                "/instruments/electric-guitars",
                Data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Hertz-API-Version": 1,
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );
            if (response.status === 201) {
                alert("악기가 성공적으로 등록되었습니다.");
            } else {
                alert("악기 등록에 실패했습니다.");
            }
        } catch (err) {
            console.error(err);
            alert("악기 등록에 실패했습니다.");
        } finally {
            // if (selectedOption === "일렉기타") {
            //     console.log("서버로 전송할 데이터:", electricGuitarData);
            // } else if (selectedOption === "앰프") {
            //     console.log("서버로 전송할 데이터:", ampData);
            // }
            // console.log("서버로 전송할 데이터:", {
            //     brand: electricGuitarData.brand,
            //     model: electricGuitarData.model,
            //     productionYear: electricGuitarData.productionYear,
            //     color: electricGuitarData.color,
            //     title: productName,
            //     progressStatus: selectProgressStatus,
            //     tradeAddress: {
            //         sido: "서울특별시",
            //         sgg: "강남구",
            //         emd: "청담동",
            //     },
            //     qualityStatus: electricGuitarData.selectedState,
            //     price: electricGuitarData.price,
            //     hasAnomaly: electricGuitarData.selectedFeature,
            //     description: description,
            //     images: selectedImage,
            //     hashtags: electricGuitarData.hashtags,
            // });
        }
    };

    const handleElectricGuitarData = (data) => {
        setElectricGuitarData(data);
    };

    return (
        <div>
            <NavBar />
            <div>
                <form>
                    {/* 악기 이름 입력 칸 */}
                    <div
                        style={{
                            textAlign: "left",
                            marginLeft: "70px",
                            marginTop: "30px",
                        }}
                    >
                        <input
                            type="text"
                            id="name"
                            value={productName}
                            onChange={handleNameChange}
                            placeholder="악기 이름" // 사용자가 입력을 시작할 때 가이드를 제공
                            style={{
                                borderRadius: "5px",
                                minWidth: "1000px",
                                padding: "10px",
                                marginRight: "40px",
                                border: "1px solid black",
                            }}
                        />
                        {/* 드롭다운 */}
                        <select
                            value={selectedOption}
                            onChange={(e) =>
                                handleDropdownSelect(e.target.value)
                            }
                            style={{
                                backgroundColor: "#D6E0F3",
                                border: "1px solid white",
                                textAlign: "center",
                                width: "150px",
                                height: "30px",
                            }}
                        >
                            {[
                                "일렉기타",
                                "이펙터",
                                "앰프",
                                "베이스",
                                "어쿠스틱&클래식",
                                "음향장비",
                                "합주실",
                                "공연장",
                            ].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* 필수사항 */}
                    <div style={{ margin: "15px" }}>
                        <p style={{ textAlign: "left", marginLeft: "55px" }}>
                            필수사항 : 전면샷 / 후면전체 샷 / 픽업 & 브릿지 /
                            덴트(흠집있는 부분들) / 특이사항 부분들 (넥 문제 ,
                            배선 문제, 녹이 슮 등)
                        </p>
                    </div>
                    {/* 이미지 업로드 */}
                    <div
                        style={{
                            textAlign: "left",
                            marginLeft: "70px",
                            marginTop: "30px",
                        }}
                    >
                        <UploadPhoto onImagesChange={handleImageChange} />
                    </div>
                    <div style={{ textAlign: "left", marginLeft: "50px" }}>
                        <p style={{ margin: "20px" }}>
                            사진 용량은 최대 10MB까지만 가능합니다.
                        </p>
                    </div>
                    {/* 필수 입력 사항 */}
                    <div style={{ textAlign: "left", marginLeft: "60px" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    margin: "10px",
                                    marginTop: "40px",
                                }}
                            >
                                필수 입력 사항
                            </p>
                            <div
                                style={{
                                    marginTop: "40px",
                                    marginRight: "70px",
                                }}
                            >
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor:
                                            selectProgressStatus === "SELLING"
                                                ? "#D6E0F3"
                                                : "white",
                                        border: "1px solid black",
                                        borderRadius: "3px",
                                    }}
                                    onClick={() =>
                                        setSelectProgressStatus("SELLING")
                                    }
                                >
                                    판매중
                                </button>
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor:
                                            selectProgressStatus === "RESERVED"
                                                ? "#FFD94D"
                                                : "white",
                                        border: "1px solid black",
                                        borderRadius: "3px",
                                    }}
                                    onClick={() =>
                                        setSelectProgressStatus("RESERVED")
                                    }
                                >
                                    예약중
                                </button>
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor:
                                            selectProgressStatus === "SOLD_OUT"
                                                ? "lightgray"
                                                : "white",
                                        border: "1px solid black",
                                        borderRadius: "3px",
                                    }}
                                    onClick={() =>
                                        setSelectProgressStatus("SOLD_OUT")
                                    }
                                >
                                    판매완료
                                </button>
                            </div>
                        </div>
                        <p style={{ marginLeft: "10px" }}>
                            매물의 정보를 정확하게 사실만 입력해주세요.
                        </p>
                        <div style={{ marginLeft: "20px" }}>
                            {/* {SelectedComponent && <SelectedComponent />}
                            <ElectricGuitar updateGuitarData={handleElectricGuitarData} /> */}
                            {SelectedComponent && (
                                <SelectedComponent
                                    updateGuitarData={handleElectricGuitarData}
                                    // updateAmpData={handleAmpData}
                                    // updateGuitarData={selectedOption === "일렉기타" ? handleElectricGuitarData : null}
                                    // updateAmpData={selectedOption === "앰프" ? handleAmpData : null}
                                />
                            )}
                        </div>
                    </div>
                    {/* 상세 정보 입력 칸 */}
                    <div style={{ textAlign: "left", marginLeft: "70px" }}>
                        <p
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginTop: "40px",
                            }}
                        >
                            특이사항 및 상세 설명
                        </p>
                        <p>
                            추가적으로 기입해야 할 정보, 참고사항, 유의할 점 등
                            구매자가 알아야할 정보들을 기입해주세요.
                        </p>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="악기에 대한 상세 설명을 입력하세요."
                            style={{
                                borderRadius: "5px",
                                minWidth: "1380px",
                                minHeight: "450px",
                                padding: "10px",
                                marginRight: "40px",
                            }}
                        />
                    </div>
                    {/* 등록 버튼 */}
                    <div
                        style={{
                            textAlign: "right",
                            margin: "30px 70px 30px 30px",
                        }}
                    >
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: "#D6E0F3",
                                borderRadius: "5px",
                                border: "none",
                                paddingRight: "15px",
                                paddingLeft: "15px",
                            }}
                        >
                            올리기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstrumentUpload;
