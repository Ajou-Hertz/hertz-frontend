/* global kakao */
import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import axios, { axiosPrivate } from "../../../api/axios";

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

const EnsembleRoom = ({ updateEnsembleRoomData }) => {
    const [selectedAddress, setSelectedAddress] = useState(""); // 주소 상태
    const [selectedAddressDetail, setSelectedAddressDetail] = useState(""); // 상세 주소 상태
    const [isPostOpen, setIsPostOpen] = useState(false); // 주소찾기 창 상태
    const [latitude, setLatitude] = useState(""); // 주소의 위 상태
    const [longitude, setLongitude] = useState(""); // 주소의 경도 상태


    const [selectedEquipment, setSelectedEquipment] = useState(null); // 음향장비 유무를 위한 상태
    const [selectedInstrument, setSelectedInstrument] = useState(null); // 악기 유무를 위한 상태
    const [priceTime, setPriceTime] = useState("/ 시간"); // 시간별 가격을 위한 상태
    const [priceDay, setPriceDay] = useState("/ 일"); // 일별 가격을 위한 상태
    const [priceMonth, setPriceMonth] = useState("/ 월"); // 월별 가격을 위한 상태
    const [selectedCapacity, setSelectedCapacity] = useState(""); // 수용인원 상태
    const [selectedSize, setSelectedSize] = useState(""); // 사이즈 상태
    const [selectedParking, setSelectedParking] = useState(null); // 주차 가능 여부를 위한 상태
    const [hashtags, setHashtags] = useState([""]); // 해시태그 상태 추가


    // // 주소 선택 핸들러
    // const handleAddressFull = (data) => {
    //     setSelectedAddress(data.address);
    //     setIsPostOpen(false); // 주소 선택시 팝업 창 닫기
    // };

    // 주소 선택 핸들러
    const handleAddressFull = (data) => {
        setSelectedAddress(data.address);
        setIsPostOpen(false); // 주소 선택시 팝업 창 닫기

        // 카카오 지도 서비스의 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(data.address, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 경도, 위도 상태 설정
                setLatitude(coords.getLat().toString());
                setLongitude(coords.getLng().toString());
            } 
        });    
    };

    // 상세 주소 입력 핸들러
    const handleAddressDetail = (event) => {
        const inputAddressDetail = event.target.value;
        setSelectedAddressDetail(inputAddressDetail);
    };

    // 팝업 창 닫기
    const closePostcode = () => {
        setIsPostOpen(false);
    };

    //음향장비 유무를 위한 핸들러
    const handleEquipmentButtonClick = (state) => {
        setSelectedEquipment(state);
    };

    //악기 유무를 위한 핸들러
    const handleInstrumentButtonClick = (state) => {
        setSelectedInstrument(state);
    };

    // 시간 별 가격 입력 핸들러
    const handlePriceTime = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputPriceTime = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
        setPriceTime(inputPriceTime + '/ 시간');
    };

    // 일 별 가격 입력 핸들러
    const handlePriceDay = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputPriceDay = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
        setPriceDay(inputPriceDay + '/ 일');
    };

    // 월 별 가격 입력 핸들러
    const handlePriceMonth = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputPriceMonth = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
        setPriceMonth(inputPriceMonth + '/ 월');
    };

    // 수용인원 입력 핸들러
    const handleCapacity = (event) => {
        // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
        const inputCapacity = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
        setSelectedCapacity(inputCapacity);
    };

    // 사이즈 입력 핸들러
    const handleSize = (event) => {
        const inputSize = event.target.value;
        setSelectedSize(inputSize);
    };

    // 주차 가능 여부 버튼을 위한 핸들러
    const handleParkingButtonClick = (parking) => {
        setSelectedParking(parking);
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
        const ensembleRoomData = {
            selectedEquipment: selectedEquipment,
            selectedInstrument: selectedInstrument,
            priceTime: priceTime,
            priceDay: priceDay,
            priceMonth: priceMonth,
            capacity: selectedCapacity,
            size: selectedSize,
            selectedParking: selectedParking,
            hashtags: hashtags,
        };
        // 검색한 주소와 입력한 상세 주소 값을 ensembleRoomData 객체에 추가
        ensembleRoomData.tradeAddress = {
            fullAddress: selectedAddress,
            detailAddress: selectedAddressDetail,
        };
        // 위도 경도 값 ensembleRoomData 객체에 추가
        ensembleRoomData.coordinate = {
            lat: latitude,
            lng: longitude,
        };
        updateEnsembleRoomData(ensembleRoomData);
    };

    useEffect(() => {
        updateData();
    }, [
        selectedEquipment,
        selectedInstrument,
        priceTime,
        priceDay,
        priceMonth,
        selectedCapacity,
        selectedSize,
        selectedParking,
        hashtags,
    ]);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
                {/* 주소 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>주소</p>
                </div>
                {/* 음향장비 유무 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "80px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>음향장비 여부</p>
                </div>
                {/* 악기 여부 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>악기 여부</p>
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
                {/* 수용 인원 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>수용 인원</p>
                </div>
                {/* 사이즈 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>사이즈</p>
                </div>
                {/* 주차 가능 여부 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "20px",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>주차 가능 여부</p>
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
                {/* 주소 입력 칸 */}
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
                        value={selectedAddress}
                        readOnly
                        style={{
                            width: "600px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                            marginRight: "10px",
                        }}
                    />
                    <button
                        style={{
                            backgroundColor: "#D6E0F3",
                            borderRadius: "7px",
                            width: "100px",
                            height: "40px",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            setIsPostOpen(true);
                        }}
                    >
                        주소 찾기
                    </ button>
                    {/* 주소 찾기 팝업 창 */}
                    {isPostOpen && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "600px",
                                    height: "510px",
                                    backgroundColor: "white",
                                    padding: "20px",
                                }}
                            >
                                <DaumPostcode onComplete={handleAddressFull} style={{ width: "100%", height: "100%" }} />
                                <button
                                    onClick={closePostcode}
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        border: "none",
                                        backgroundColor: "white"
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/* 상세 주소 입력 칸 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "15px",
                    }}
                >
                    <input
                        type="text"
                        value={selectedAddressDetail}
                        onChange={handleAddressDetail}
                        placeholder="정확한 상세 주소를 입력해주세요"
                        style={{
                            minWidth: "710px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                            marginRight: "10px",
                        }}
                    />
                </div>
                {/* 음향 장비 유무 버튼 */}
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
                        isSelected={selectedEquipment === true}
                        onClick={() => handleEquipmentButtonClick(true)}
                    />
                    <Button
                        label="X"
                        isSelected={selectedEquipment === false}
                        onClick={() => handleEquipmentButtonClick(false)}
                    />
                </div>
                {/* 악기 유무 버튼 */}
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
                        isSelected={selectedInstrument === true}
                        onClick={() => handleInstrumentButtonClick(true)}
                    />
                    <Button
                        label="X"
                        isSelected={selectedInstrument === false}
                        onClick={() => handleInstrumentButtonClick(false)}
                    />
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
                        value={priceTime}
                        onChange={handlePriceTime}
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                            textAlign: "right"
                        }}
                    />
                    <input
                        type="text"
                        value={priceDay}
                        onChange={handlePriceDay}
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                            marginLeft: "20px",
                            textAlign: "right"
                        }}
                    />
                    <input
                        type="text"
                        value={priceMonth}
                        onChange={handlePriceMonth}
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                            marginLeft: "20px",
                            textAlign: "right"
                        }}
                    />
                </div>
                {/* 수용 인원 입력 칸 */}
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
                        value={selectedCapacity}
                        onChange={handleCapacity}
                        placeholder="숫자만 기입해주세요"
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                        }}
                    />
                </div>
                {/* 사이즈 입력 칸 */}
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
                        value={selectedSize}
                        onChange={handleSize}
                        placeholder="단위까지 기입해주세요. ex) 5평, 100m^3"
                        style={{
                            width: "200px",
                            height: "40px",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: "10px",
                        }}
                    />
                </div>
                {/* 주차 가능 여부 버튼 */}
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
                        isSelected={selectedParking === true}
                        onClick={() => handleParkingButtonClick(true)}
                    />
                    <Button
                        label="X"
                        isSelected={selectedParking === false}
                        onClick={() => handleParkingButtonClick(false)}
                    />
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
                                    width: "30px",
                                    marginLeft: "5px",
                                    border: "none",
                                    borderRadius: "7px",
                                    backgroundColor: "#D6E0F3",
                                    fontSize: "25px"
                                }}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    {hashtags.length < 5 && (
                        <button
                            type="button" // 새로고침 방지
                            onClick={handleAddHashtag}
                            style={{ 
                                height: "40px",
                                width: "30px",
                                border: "none",
                                borderRadius: "7px",
                                backgroundColor: "#D6E0F3"
                            }}
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnsembleRoom;
