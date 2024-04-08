import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const DropdownInstrument = ({ onSelectInstrument }) => {
    const [selectedMenuType, setSelectedMenuType] = useState("일렉기타");
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleMenuTypeSelect = async (selected) => {
        setSelectedMenuType(selected);
        setSelectedOptions([]);
        onSelectInstrument(selected); // 선택된 악기 유형을 상위 컴포넌트로 전달
    };

    const handleOptionSelect = (index, selected) => {
        setSelectedOptions((prevOptions) => {
            const newOptions = [...prevOptions];
            newOptions[index] = selected;
            // 선택된 옵션에 따른 로직 처리
            console.log("Selected option:", selected);
            return newOptions;
        });
    };

    // 선택된 유형에 따라 드롭다운 메뉴의 이름과 옵션을 설정
    const getDropdownOptions = () => {
        switch (selectedMenuType) {
            case "이펙터":
                return {
                    dropdownNames: ["종류", "기능", "거래지역"],
                    options: [
                        ["기타", "베이스", "멀티", "페달보드"],
                        [
                            "와우",
                            "Eq",
                            "볼륨",
                            "컴프",
                            "오버",
                            "디스토션",
                            "부스트",
                            "공간계",
                            "모듈레이션",
                            "앰프시뮬",
                            "멀티",
                            "보드용부품",
                            "그 외",
                        ],
                        ["컴프레서", "리미터", "드라이브", "그 외"],
                        ["선택불가 display"],
                        ["보드", "파워서플라이", "버퍼", "병렬믹서", "그 외"],
                        ["A-1", "A-2", "A-3", "A-4"],
                    ],
                };
            case "앰프":
                return {
                    dropdownNames: ["종류", "브랜드", "용도", "거래지역"],
                    options: [
                        ["기타", "베이스"],
                        [
                            "Fender",
                            "Marshall",
                            "Vox",
                            "Orange",
                            "Mesa Boogie",
                            "Peavey",
                            "EVH",
                            "Bogner",
                            "Blackstar",
                            "Yamaha",
                            "그 외",
                        ],
                        ["가정용", "공연용"],
                        ["D-1", "D-2", "D-3"],
                    ],
                };
            case "베이스":
                return {
                    dropdownNames: [
                        "브랜드",
                        "픽업종류",
                        "프리앰프",
                        "색상",
                        "거래지역",
                    ],
                    options: [
                        [
                            "Fender",
                            "Ibanez",
                            "Spector",
                            "MusicMan",
                            "Schetor",
                            "ESP",
                            "Warwick",
                            "Dingwall",
                            "Yamaha",
                            "N/A",
                            "Sadowsky",
                            "Sandberg",
                            "Squier",
                            "Lakland",
                            "Sire",
                            "그 외",
                        ],
                        ["재즈", "프레시젼", "PJ", "험버커", "그 외"],
                        ["액티브", "패시브", "전환 가능"],
                        [
                            "Red",
                            "Orange",
                            "Yellow",
                            "Green",
                            "Blue",
                            "Navy",
                            "Violet",
                            "White",
                            "Black",
                            "그 외",
                        ],
                        ["E-1", "E-2", "E-3", "E-4", "E-5"],
                    ],
                };
            case "어쿠스틱&클래식":
                return {
                    dropdownNames: [
                        "국내/해외",
                        "브랜드",
                        "모델",
                        "목재",
                        "픽업",
                        "거래지역",
                    ],
                    options: [
                        ["국내", "해외"],
                        ["1", "2", "3", "4"],
                        [
                            "드래드넛",
                            "컷어웨이",
                            "점보바디",
                            "슬림바디",
                            "팔러바디",
                            "OM바디",
                        ],
                        ["합판", "원목", "합판 & 원목"],
                        ["진동감지형", "마그네틱", "마이크"],
                        ["F-1", "F-2", "F-3", "F-4"],
                    ],
                };
            case "음향장비":
                return {
                    dropdownNames: ["종류", "거래지역"],
                    options: [
                        ["음향장비", "악세서리", "그 외"],
                        ["Z-1", "Z-2", "Z-3"],
                    ],
                };
            default:
                return {
                    dropdownNames: ["브랜드", "모델", "색상", "거래지역"],
                    options: [
                        [
                            "Fender(USA)",
                            "Fender(Japan)",
                            "Fender(Mexico)",
                            "Gibson",
                            "Ibanez",
                            "PRS",
                            "Schecter",
                            "Epiphone",
                            "ESP LTD",
                            "Squier",
                            "Jackson",
                            "ESP",
                            "Custom",
                            "High-end",
                            "그 외",
                        ],
                        [
                            "텔레캐스터",
                            "스트라토캐스터",
                            "레스",
                            "슈퍼스트랫",
                            "세미할로우",
                            "헤비쉐입",
                            "재즈마스터 & 재규어",
                            "PRS",
                            "그 외",
                        ],
                        [
                            "Red",
                            "Orange",
                            "Yellow",
                            "Green",
                            "Blue",
                            "Navy",
                            "Violet",
                            "White",
                            "Black",
                            "그 외",
                        ],
                        ["4-1", "4-2", "4-3"],
                    ],
                };
        }
    };

    const { dropdownNames, options } = getDropdownOptions();

    return (
        <div>
            <DropdownMenu
                options={[
                    "이펙터",
                    "앰프",
                    "베이스",
                    "어쿠스틱&클래식",
                    "음향장비",
                ]}
                onSelect={handleMenuTypeSelect}
                defaultOptionText="일렉기타"
            />
            {dropdownNames.map((name, index) => (
                <DropdownMenu
                    key={index}
                    options={options[index]}
                    onSelect={(selected) => handleOptionSelect(index, selected)}
                    defaultOptionText={`${name}`}
                />
            ))}
        </div>
    );
};

export default DropdownInstrument;
