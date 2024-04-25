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
            }} // 새로고침 방지
            onClick={(event) => {
                event.preventDefault();
                onClick();
            }}
        >
            {label}
        </button>
    );
};

const AcousticClassic = ({ updateAcousticClassicData }) => {
    const [Sido, setSido] = useState([]); // 거래지역 상태
    const [Sgg, setSgg] = useState([]); // 시군구 상태 추가
    const [Emd, setEmd] = useState([]); // 읍면동 상태 추가
    const [selectedSido, setSelectedSido] = useState(""); // 선택된 거래지역 상태 추가
    const [selectedSgg, setSelectedSgg] = useState(""); // 선택된 시군구 상태 추가
    const [selectedEmd, setSelectedEmd] = useState(""); // 선택된 읍면동 상태 추가
    const [selectedState, setSelectedState] = useState(null); // 악기 상태 선택을 위한 상태
    const [selectedBrandType, setSelectedBrandType] = useState("국내"); // '국내' 또는 '국외'를 저장할 상태 (국내가 디폴트)
    const [selectedBrand, setSelectedBrand] = useState(""); // 브랜드 국내,국외 선택을 위한 상태
    const [selectedModel, setSelectedModel] = useState(""); // 모델 선택을 위한 상태 추가
    const [selectedWood, setSelectedWood] = useState(""); // 목재 선택을 위한 상태 추가
    const [selectedPickup, setSelectedPickup] = useState(""); // 픽업 선택을 위한 상태 추가
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
    const handleSidoChange = (event) => {
        const selectedSidoName = event.target.value; // 선택된 시도의 이름
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

    // 시군구 선택 핸들러
    const handleSggChange = (event) => {
        const selectedIndex = event.target.value; // 선택된 시도의 index
        if (selectedIndex !== -1) {
            // 선택된 시도에 해당하는 시군구 목록을 불러오기 위해 api 호출
            axios
                .get(`/administrative-areas/emd?sggId=${selectedIndex}`, {
                    headers: {
                        "Hertz-API-Version": 1,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const emdArray = response.data.content.map((item) => ({
                            id: item.id,
                            name: item.name,
                        }));
                        setEmd(emdArray);
                        const selectedSggName = Sgg.find(
                            (item) => item.id === parseInt(selectedIndex)
                        )?.name; // 선택된 시군구의 name 값
                        setSelectedSgg(selectedSggName); // 선택된 시군구 이름 설정
                    } else {
                        console.error("읍면동 목록을 불러오는데 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error(
                        "읍면동 목록 요청 중 오류가 발생했습니다:",
                        error
                    );
                });
        } else {
            console.error("선택된 읍면동을 찾을 수 없습니다.");
        }
    };

    // 악기 상태를 위한 핸들러
    const handleButtonClick = (state) => {
        setSelectedState(state);
    };

    // 국내 및 국외 브랜드
    const brands = {
        국내: [
            "프레이튼",
            "크래프터",
            "고퍼우드",
            "헥스",
            "벤티볼리오",
            "파크우드",
            "오렌지우드",
            "콜트",
            "그 외",
        ],
        국외: [
            "Martin",
            "Taylor",
            "Gibson",
            "Seagull",
            "Eastman",
            "Sigma",
            "Yamaha",
            "Lava",
            "그 외",
        ],
    };
    // 브랜드 타입(국내/국외) 변경 핸들러
    const handleBrandTypeChange = (event) => {
        setSelectedBrandType(event.target.value);
        setSelectedBrand(""); // 브랜드 타입이 변경될 때 모델 선택을 초기화
    };
    // 국내/국외 선택에 따른 브랜드 변경 핸들러
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    // 모델 선택 핸들러
    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    // 목재 선택 핸들러
    const handleWoodChange = (event) => {
        setSelectedWood(event.target.value);
    };

    // 픽업 선택 핸들러
    const handlePickupChange = (event) => {
        setSelectedPickup(event.target.value);
    };

    // 가격 입력 핸들러
    const handlePrice = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputPrice = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
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
        let selectedBrandValue = "";
        // 선택된 브랜드 타입에 따라 해당하는 브랜드 목록을 가져옴
        const selectedBrands = brands[selectedBrandType];
        // 선택된 브랜드가 브랜드 목록에 있는지 확인하고 해당하는 값을 할당
        if (selectedBrand && selectedBrands.includes(selectedBrand)) {
            // 국내 브랜드 목록에 있을 경우
            if (selectedBrandType === "국내") {
                switch (selectedBrand) {
                    case "프레이튼":
                        selectedBrandValue = "PRAYTON";
                        break;
                    case "크래프터":
                        selectedBrandValue = "CRAFTER";
                        break;
                    case "고퍼우드":
                        selectedBrandValue = "GOPHERWOOD";
                        break;
                    case "헥스":
                        selectedBrandValue = "HEX";
                        break;
                    case "벤티볼리오":
                        selectedBrandValue = "BENTIVOGLIO";
                        break;
                    case "파크우드":
                        selectedBrandValue = "PARKWOOD";
                        break;
                    case "오렌지우드":
                        selectedBrandValue = "ORANGEWOOD";
                        break;
                    case "콜트":
                        selectedBrandValue = "CORT";
                        break;
                    case "그 외":
                        selectedBrandValue = "ETC";
                        break;
                    default:
                        selectedBrandValue = "";
                        break;
                }
            }
            // 국외 브랜드 목록에 있을 경우
            else if (selectedBrandType === "국외") {
                switch (selectedBrand) {
                    case "Martin":
                    case "Taylor":
                    case "Gibson":
                    case "Seagull":
                    case "Eastman":
                    case "Sigma":
                    case "Yamaha":
                    case "Lava":
                        selectedBrandValue = selectedBrand.toUpperCase();
                        break;
                    case "그 외":
                        selectedBrandValue = "ETC";
                        break;
                    default:
                        selectedBrandValue = "";
                        break;
                }
            }
        } else {
            // 선택된 브랜드가 없거나 브랜드 목록에 없는 경우
            console.error("선택된 브랜드가 올바르지 않습니다.");
            // 선택된 브랜드를 초기화하여 브랜드를 선택하도록 유도
            setSelectedBrand("");
        }

        const AcousticClassicData = {
            brand: selectedBrandValue,
            selectedState: selectedState,
            price: price,
            selectedFeature: selectedFeature,
            hashtags: hashtags,
        };
        AcousticClassicData.tradeAddress = {
            sido: selectedSido,
            sgg: selectedSgg,
            emd: selectedEmd,
        };
        AcousticClassicData.model = selectedModel;
        AcousticClassicData.wood = selectedWood;
        AcousticClassicData.pickup = selectedPickup;
        updateAcousticClassicData(AcousticClassicData);
    };

    useEffect(() => {
        updateData();
    }, [
        selectedBrand,
        selectedState,
        price,
        selectedFeature,
        hashtags,
        selectedModel,
        selectedWood,
        selectedPickup,
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
                {/* 목재 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>목재</p>
                </div>
                {/* 픽업 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>픽업</p>
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
                        onChange={(event) => handleSidoChange(event)}
                    >
                        <option value="">시도 선택</option>
                        {Sido &&
                            Sido.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                    </select>
                    {/* 시군구 드롭다운 */}
                    <select
                        style={{
                            width: "100px",
                            height: "40px",
                            borderRadius: "3px",
                        }}
                        onChange={(event) => handleSggChange(event)}
                    >
                        <option value="">시군구 선택</option>
                        {Sgg &&
                            Sgg.map((item) => (
                                <option key={item.name} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                    {/* 읍면동 드롭다운 */}
                    <select
                        style={{
                            width: "100px",
                            height: "40px",
                            borderRadius: "3px",
                        }}
                        onChange={(event) => setSelectedEmd(event.target.value)}
                    >
                        <option value="">읍면동 선택</option>
                        {Emd &&
                            Emd.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
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
                    {/* 브랜드 드롭다운 */}
                    <select
                        value={selectedBrandType}
                        onChange={handleBrandTypeChange}
                        style={{ height: "40px", borderRadius: "3px" }}
                    >
                        <option value="국내">국내</option>
                        <option value="국외">국외</option>
                    </select>
                    {/* 국내/국외 선택에 따른 드롭다운 */}
                    <select
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        style={{
                            height: "40px",
                            borderRadius: "3px",
                            marginLeft: "10px",
                        }}
                    >
                        <option value="">브랜드 선택</option>
                        {brands[selectedBrandType].map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
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
                        onChange={handleModelChange}
                    >
                        <option value="DREADNOUGHT">드래드넛</option>
                        <option value="CUTAWAY">컷어웨이</option>
                        <option value="JUMBO_BODY">점보바디</option>
                        <option value="SLIM_BODY">슬림바디</option>
                        <option value="PARLOR_BODY">팔러바디</option>
                        <option value="OM_BODY">OM바디</option>
                    </select>
                </div>
                {/* 목재 드롭다운 */}
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
                        onChange={handleWoodChange}
                    >
                        <option value="PLYWOOD">합판</option>
                        <option value="SOLID_WOOD">원목</option>
                        <option value="PLYWOOD_AND_SOLID_WOOD">
                            합판 & 원목
                        </option>
                    </select>
                </div>
                {/* 픽업 드롭다운 */}
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
                        onChange={handlePickupChange}
                    >
                        <option value="VIBRATION_SENSING">진동감지형</option>
                        <option value="MAGNETIC">마그네틱</option>
                        <option value="MICROPHONE">마이크</option>
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
                            type="button"
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

export default AcousticClassic;
