import React, { useEffect, useState } from "react";
import NavBar from "../components/Sub/NavBar.js";

import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "../api/axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

// Components
import ProfileEdit from "../components/ProfileEdit.js";

import "antd/dist/antd.css";

export const Summary = ({ userData }) => {
    return (
        <>
            <ProfileEdit userData={userData} />
        </>
    );
};

const MyEditPage = () => {
    const [myData, setMyData] = useState([]);
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = user?.token || user?.access_token;
                if (!token) return;

                const response = await axios.get(
                    "https://hertz-inst.com/api/users/me",
                    {
                        headers: {
                            accept: "*/*",
                            "Hertz-API-Version": "1",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMyData(response.data);
                // setUser(response.data);
                console.log(response.data.id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [user?.token, user?.access_token]);
    const handleSearch = (term) => {
        // 검색어 핸들러 추가
        console.log(term);
    };
    return (
        <div className="area-2">
            <NavBar onSearch={handleSearch} />
            {/* <Sidebar /> */}
            <div className="content_area">
                <Routes>
                    <Route
                        path="/"
                        element={<Summary userData={myData} id={myData.id} />}
                    ></Route>
                    <Route path="/profile" element={<ProfileEdit />}></Route>
                </Routes>
            </div>
        </div>
    );
};

export default MyEditPage;
