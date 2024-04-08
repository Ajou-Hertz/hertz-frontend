import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import PopupButton from "../PopupButton";

const Button = ({ label, isSelected, onClick }) => {
    return (
        <button
            style={{
                backgroundColor: isSelected ? "#D6E0F3" : "white",
                borderRadius: "3px",
                width: "100px",
                height: "40px",
                border: "1px solid black",
            }}
             // 새로고침 방지
              onClick={(event) => {
              event.preventDefault();
              onClick();
            }}
        >
            {label}
        </button>
    );
};

const ElectricGuitar = ({ updateGuitarData }) => {
    const [Sido, setSido] = useState(); // 거래지역 상태
    const [selectedState, setSelectedState] = useState(null); // 악기 상태 선택을 위한 상태
    const [selectedBrand, setSelectedBrand] = useState("FENDER_USA"); // 브랜드 선택
    const [selectedModel, setSelectedModel] = useState("TELECASTER"); // 모델 선택
    const [productionYear, setProductionYear] = useState(""); // 생산연도 상태
    const [selectedColor, setSelectedColor] = useState("RED"); // 색상 선택
    const [price, setPrice] = useState(""); // 가격을 위한 상태
    const [selectedFeature, setSelectedFeature] = useState(null); // 특이사항 유무를 위한 상태
    const [hashtags, setHashtags] = useState([""]); // 해시태그 상태 추가

    const [isPopupOpen, setIsPopupOpen] = useState(false); // 단계설명 표 열고 닫는 상태

    // 팝업 내용
    const popupData = [
        { label: "5단계", value: "외관/사용 모두 완벽, 신동품" },
        { label: "4단계", value: "외관/사용 모두 문제 없음" },
        { label: "3단계", value: "사용에 문제 없으나 외관에 덴트, 녹 등 존재" },
        { label: "2단계", value: "사용에 문제 있음. 셋업/수리 필요" },
        { label: "1단계", value: "부품용/상태 안좋음" },
    ];

    // 팝업 열기
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // 팝업 닫기
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // 시도 get api
    useEffect(() => {
        // 헤더를 설정합니다.
        const headers = {
            "Hertz-API-Version": 1, // 헤더에 api minor version 추가
        };

        try {
            const response = axios.get("/administrative-areas/sido", {
                headers: headers,
            });

            console.log("성공");
            console.log("시도 정보:", response.data.content);
            // 등록 성공 후 작업, 예: 사용자를 악기 목록 페이지로 리다이렉트
        } catch (error) {
            console.error("에러:", error);
        }
    }, []);

    // 브랜드 선택 핸들러
const handleBrandChange = (event) => {
  setSelectedBrand(event.target.value);
};


    //악기 상태를 위한 핸들러
    const handleButtonClick = (state) => {
        setSelectedState(state);
    };

    // 생산연도 입력 핸들러
    const handleProductionYear = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputProductionYear = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
        setProductionYear(inputProductionYear);
    };

    // 가격 입력 핸들러
    const handlePrice = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputPrice = (event.target.value.replace(/[^0-9]/g, "")); // 숫자가 아닌 문자를 제거합니다.
        setPrice(inputPrice /*+ '원'*/);
    };

    // 특이사항 유무를 위한 핸들러
    const handleFeatureButtonClick = (feature) => {
        setSelectedFeature(feature);
    };

    // 해시태그 입력 핸들러
    const handleHashtagChange = (event, index) => {
        const value = event.target.value.startsWith("#")
            ? event.target.value
            : `#${event.target.value}`;
        const newHashtags = [...hashtags];
        newHashtags[index] = value.slice(0, 11); // '#' 포함 최대 11자
        setHashtags(newHashtags);
    };

    // 해시태그 추가 핸들러
    const handleAddHashtag = () => {
        if (hashtags.length < 5) {
            // 해시태그 최대 5개 제한
            setHashtags([...hashtags, "#"]); // 새 해시태그 기본값으로 '#' 설정
        }
    };

    // 해시태그 삭제 핸들러
    const handleRemoveHashtag = (index) => {
        const newHashtags = hashtags.filter((_, i) => i !== index);
        setHashtags(newHashtags);
    };

    const updateData = () => {
        const guitarData = {
            brand: selectedBrand,
            model: selectedModel,
            productionYear: productionYear,
            color: selectedColor,
            selectedState: selectedState,
            price: price,
            selectedFeature: selectedFeature,
            hashtags: hashtags,
        };
       
        updateGuitarData(guitarData);
    };

    useEffect(() => {
        updateData();
    }, [
        selectedBrand,
        selectedModel,
        productionYear,
        selectedColor,
        selectedState,
        price,
        selectedFeature,
        hashtags,
    ]);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
                {/* 거래지역 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>거래 지역</p>
                </div>
                {/* 악기상태 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>악기 상태</p>
                </div>
                {/* 브랜드 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>브랜드</p>
                </div>
                {/* 모델 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>모델</p>
                </div>
                {/* 생산연도 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>생산 연도</p>
                </div>
                {/* 색상 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>색상</p>
                </div>
                {/* 가격 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>가격</p>
                </div>
                {/* 특이사항 유무 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>특이사항 유무</p>
                </div>
                {/* 해시태그 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>해시태그(선택)</p>
                </div>
            </div>

            {/* 옵션들 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "200px",
                }}
            >
                {/* 거래지역 드롭다운 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <select
                        style={{
                            width: "100px",
                            height: "40px",
                            borderRadius: "3px",
                        }}
                        onChange={(event) => setSido(event.target.value)}
                    >
                        {Sido &&
                            Sido.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                    </select>
                    <select
                        style={{
                            width: "100px",
                            height: "40px",
                            borderRadius: "3px",
                        }}
                        onChange={(event) => setSido(event.target.value)}
                    >
                        {Sido &&
                            Sido.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                    </select>
                    <select
                        style={{
                            width: "100px",
                            height: "40px",
                            borderRadius: "3px",
                        }}
                        onChange={(event) => setSido(event.target.value)}
                    >
                        {Sido &&
                            Sido.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                    </select>
                </div>
                {/* 악기상태 버튼 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <Button
                        label="1단계"
                        isSelected={selectedState === "1"}
                        onClick={() => handleButtonClick("1")}
                    />
                    <Button
                        label="2단계"
                        isSelected={selectedState === "2"}
                        onClick={() => handleButtonClick("2")}
                    />
                    <Button
                        label="3단계"
                        isSelected={selectedState === "3"}
                        onClick={() => handleButtonClick("3")}
                    />
                    <Button
                        label="4단계"
                        isSelected={selectedState === "4"}
                        onClick={() => handleButtonClick("4")}
                    />
                    <Button
                        label="5단계"
                        isSelected={selectedState === "5"}
                        onClick={() => handleButtonClick("5")}
                    />
                    <div style={{ marginTop: "10px", marginLeft: "20px" }}>
                        <PopupButton
                            onClick={openPopup}
                            isPopupOpen={isPopupOpen}
                            closePopup={closePopup}
                            popupData={popupData}
                        />
                    </div>
                </div>
                {/* 브랜드 드롭다운 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <select
                        style={{ height: "40px", borderRadius: "3px" }}
                          onChange={handleBrandChange}
                          value={selectedBrand} // 선택된 값 설정
                    >
                        <option value='FENDER_USA'>Fender(USA)</option>
                        <option value="FENDER_JAPAN">Fender(Japan)</option>
                        <option value="FENDER_MEXICO">Fender(Mexico)</option>
                        <option value="GIBSON">Gibson</option>
                        <option value="IBANEZ">Ibanez</option>
                        <option value="PRS">PRS</option>
                        <option value="SCHECTER">Schecter</option>
                        <option value="EPIPHONE">Epiphone</option>
                        <option value="ESP_LTD">ESP LTD</option>
                        <option value="SQUIER">Squier</option>
                        <option value="JACKSON">Jackson</option>
                        <option value="ESP">ESP</option>
                        <option value="CUSTOM">Custom</option>
                        <option value="HIGH_END">High-end</option>
                        <option value="ETC">그 외</option>
                    </select>
                </div>
                {/* 모델 드롭다운 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <select
                        style={{ height: "40px", borderRadius: "3px" }}
                        onChange={(event) =>
                            setSelectedModel(event.target.value)
                        }
                    >
                        <option value="TELECASTER">텔레캐스터</option>
                        <option value="STRATOCASTER">스트라토캐스터</option>
                        <option value="LESS">레스</option>
                        <option value="SUPERSTRAT">슈퍼스트랫</option>
                        <option value="SEMI_HOLLOW">세미할로우</option>
                        <option value="HEAVY_SHAPE">헤비쉐입</option>
                        <option value="JAZZMASTER_JAGUAR">
                            재즈마스터 & 재규어
                        </option>
                        <option value="PRS">PRS</option>
                        <option value="ETC">그 외</option>
                    </select>
                </div>
                {/* 생산연도 입력칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <input
                        type="text"
                        value={productionYear}
                        onChange={handleProductionYear}
                        placeholder="숫자만 기입해주세요"
                        style={{
                            width: "500px",
                            height: "40px",
                            padding: "10px",
                            borderRadius: "3px",
                            border: "1px solid black",
                        }}
                    />
                </div>
                {/* 색상 드롭다운 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <select
                        style={{ height: "40px", borderRadius: "3px" }}
                        onChange={(event) =>
                            setSelectedColor(event.target.value)
                        }
                    >
                        <option value="RED">Red</option>
                        <option value="ORANGE">Orange</option>
                        <option value="YELLOW">Yellow</option>
                        <option value="GREEN">Green</option>
                        <option value="BLUE">Blue</option>
                        <option value="NAVY">Navy</option>
                        <option value="VIOLET">Violet</option>
                        <option value="WHITE">White</option>
                        <option value="BLACK">Black</option>
                        <option value="ETC">그 외</option>
                    </select>
                </div>
                {/* 가격입력칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <input
                        type="text"
                        value={price}
                        onChange={handlePrice}
                        placeholder="숫자만 기입해주세요"
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                        }}
                    />
                    <span style={{ margin: "10px" }}>원</span>
                </div>
                {/* 특이사항 유무 버튼 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    <Button
                        label="O"
                        isSelected={selectedFeature === true}
                        onClick={() => handleFeatureButtonClick(true)}
                    />
                    <Button
                        label="X"
                        isSelected={selectedFeature === false}
                        onClick={() => handleFeatureButtonClick(false)}
                    />
                    <p style={{ margin: "5px", marginLeft: "10px" }}>
                        특이사항에 대한 상세 내용은 본문에 기입해주세요
                    </p>
                </div>
                {/* 해시태그 입력칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "25px",
                    }}
                >
                    {hashtags.map((hashtag, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "5px",
                            }}
                        >
                            <input
                                type="text"
                                value={hashtag}
                                onChange={(event) =>
                                    handleHashtagChange(event, index)
                                }
                                placeholder="해시태그 입력"
                                style={{
                                    width: "170px",
                                    height: "40px",
                                    borderRadius: "3px",
                                    border: "1px solid black",
                                }}
                            />
                            <button
                                onClick={() => handleRemoveHashtag(index)}
                                style={{
                                    height: "40px",
                                    width: "25px",
                                    marginLeft: "5px",
                                }}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    {hashtags.length < 5 && (
                        <button
                            onClick={handleAddHashtag}
                            style={{ height: "40px" }}
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ElectricGuitar;