import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const DropdownInAll = ({ onSelectProgress }) => {
    // options 배열
    const options = ["판매중", "판매완료", "예약중"];

    // 선택된 옵션을 추적하는 상태 및 처리 함수
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelect = (selectedValue) => {
        setSelectedOption(selectedValue);
        onSelectProgress && onSelectProgress(selectedValue); // 선택된 값에 대한 처리 함수 호출
    };

    return (
        <div>
            {/* DropdownMenu 컴포넌트 렌더링 */}
            <DropdownMenu
                options={options}
                onSelect={handleSelect}
                defaultOptionText="전체"
            />
        </div>
    );
};

export default DropdownInAll;
