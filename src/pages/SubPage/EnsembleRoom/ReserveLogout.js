import React from "react";
import NavBar from "../../../components/Sub/NavBar";

const ReserveLogout = () => {
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
                합주실 / 예약현황
            </p>
        </div>
    );
};

export default ReserveLogout;
