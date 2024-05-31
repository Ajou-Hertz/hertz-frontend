import React from "react";
import NavBar from "../../../components/Sub/NavBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Reserve = () => {
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
            <div style={{ margin: "30px 50px" }}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={[
                        { title: "event 1", date: "2024-05-01" },
                        { title: "event 2", date: "2024-05-02" },
                    ]}
                />
            </div>
        </div>
    );
};

export default Reserve;
