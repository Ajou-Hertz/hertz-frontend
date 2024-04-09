import React, { useEffect, useState } from "react";
import NavBar from "../components/Sub/NavBar.js";
import { Routes, Route, useNavigate } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

// Components
import Profile from "../components/SellerProfile";
import WishProduct from "../components/SellingProduct.js";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

import "antd/dist/antd.css";

export const Summary = ({ userData }) => {
    return (
        <>
            <Profile userData={userData} />
            <WishProduct />
        </>
    );
};

const SellerPage = (props) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [sellerData, setSellerData] = useState([]);
    const [user, setUser] = useRecoilState(userState);
    console.log(user);
    // axios로 유저정보 가져오기
    // useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const response = await axiosPrivate.get("/users/");
    //             console.log(response);
    //             setMyData(response.data);
    //         } catch (err) {
    //             console.log(err?.response);
    //         }
    //     };

    //     getUser();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = 1;
                const token = user?.token || user?.access_token;
                if (!token) return;
                console.log(token);
                const response = await axios.get(
                    `http://43.203.54.249:8080/api/users/${userId}/seller`,
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

    return (
        <div className="area-2">
            <NavBar />
            {/* <Sidebar /> */}
            <div className="content_area">
                <Routes>
                    <Route
                        path="/"
                        element={<Summary userData={sellerData} />}
                    ></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Routes>
            </div>
        </div>
    );
};

export default SellerPage;
