import React, { useEffect, useState } from "react";
import NavBar from "../components/Sub/NavBar.js";
import { Routes, Route, useLocation } from "react-router-dom";

import axios from "../api/axios";

// Components
import Profile from "../components/SellerProfile";
import SellingProduct from "../components/SellingProduct.js";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

import "antd/dist/antd.css";

export const Summary = ({ userData }) => {
    return (
        <>
            <Profile userData={userData} />
            <SellingProduct userData={userData} />
        </>
    );
};

const SellerPage = (props) => {
    const location = useLocation();
    const id = location.state.id || location.state.sellerId;

    const [sellerData, setSellerData] = useState([]);
    const [user, setUser] = useRecoilState(userState);
    console.log(user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = id;
                const token = user?.token || user?.access_token;
                if (!token) return;
                console.log(token);
                const response = await axios.get(
                    `https://hertz-inst.com/api/users/${userId}/seller`,
                    {
                        headers: {
                            accept: "*/*",
                            "Hertz-API-Version": "1",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setSellerData(response.data);
            } catch (error) {
                console.error("Error fetching seller data:", error);
            }
        };

        fetchData();
    }, [user?.token, user?.access_token]);

    // userData에 'root' 값을 추가하여 전달
    const userDataWithRoot = { ...sellerData, root: location.state.root };
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
                        element={<Summary userData={userDataWithRoot} />}
                    ></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Routes>
            </div>
        </div>
    );
};

export default SellerPage;
