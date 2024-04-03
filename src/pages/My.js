import React, { useEffect, useState } from "react";
import styles from "./My.module.css";
import NavBar from "../components/Sub/NavBar.js";

import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

// Components
import Profile from "../components/Profile";
import WishProduct from "../components/WishProduct.js";

import "antd/dist/antd.css";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export const Summary = ({ userData }) => {
    return (
        <>
            <Profile userData={userData} />
            <WishProduct />
        </>
    );
};

const MyPage = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [myData, setMyData] = useState([]);
    const [wishBooths, setWishBooths] = useState([]);
    const [wishPWishProducts, setWishProducts] = useState([]);
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useRecoilState(userState);
    // console.log(user);

    //axios로 유저정보 가져오기
    // useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const response = await axiosPrivate.get("/users/me");
    //             console.log(response);
    //             setMyData(response.data);
    //         } catch (err) {
    //             console.log(err?.response);
    //         }
    //     };

    //     getUser();
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(
    //                 "http://43.203.54.249:8080/api/users/me",
    //                 {
    //                     headers: {
    //                         accept: "*/*",
    //                         "Hertz-API-Version": "1",
    //                         Authorization: `Bearer ${user?.token}`,
    //                     },
    //                 }
    //             );
    //             console.log(response.data);
    //             setMyData(response.data);
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     fetchData();
    // }, [user?.token]);

    return (
        <div className="area-2">
            <NavBar />
            {/* <Sidebar /> */}
            <div className="content_area">
                <Routes>
                    <Route
                        path="/"
                        element={<Summary userData={myData} />}
                    ></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route
                        path="/wishPWishProduct"
                        element={<WishProduct />}
                    ></Route>
                </Routes>
            </div>
            <div style={{ textAlign: "left" }}>
                <Link to="/seller">
                    <button
                        style={{
                            marginLeft: "40px",
                            marginRight: "10px",
                            marginBottom: "10px",
                            display: "inline-block",
                            verticalAlign: "top",
                            border: "none",
                            background: "transparent",
                        }}
                    >
                        <svg
                            width="135"
                            height="48"
                            viewBox="0 0 135 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="135"
                                height="48"
                                rx="10"
                                fill="#D6E0F3"
                            />
                            <path
                                d="M20.0024 18.386H28.2134V19.542H20.0024V18.386ZM19.7474 26.002L19.5774 24.812C22.2634 24.795 25.9184 24.761 28.9274 24.387L29.0294 25.441C25.9694 25.917 22.3654 26.002 19.7474 26.002ZM21.5154 19.253H22.8754V25.05H21.5154V19.253ZM25.3234 19.253H26.6834V25.05H25.3234V19.253ZM30.0494 16.975H31.4604V28.297H30.0494V16.975ZM31.0184 21.633H33.7384V22.823H31.0184V21.633ZM21.8894 30.83H32.1574V31.986H21.8894V30.83ZM21.8894 27.209H23.3004V31.136H21.8894V27.209ZM46.878 16.958H48.238V32.326H46.878V16.958ZM44.447 23.044H47.388V24.2H44.447V23.044ZM43.478 17.281H44.821V31.561H43.478V17.281ZM35.726 18.726H41.591V28.212H35.726V18.726ZM40.265 19.848H37.052V27.09H40.265V19.848ZM54.6117 19.151H55.7337V21.65C55.7337 24.846 53.7787 28.144 51.3817 29.368L50.5657 28.246C52.7587 27.175 54.6117 24.251 54.6117 21.65V19.151ZM54.8667 19.151H55.9887V21.65C55.9887 24.081 57.7227 26.818 59.9497 27.872L59.1507 28.994C56.7197 27.787 54.8667 24.693 54.8667 21.65V19.151ZM51.1097 18.522H59.3887V19.712H51.1097V18.522ZM61.2077 16.958H62.6357V32.326H61.2077V16.958ZM62.2957 23.163H65.1517V24.353H62.2957V23.163ZM83.0046 16.958H84.3646V32.326H83.0046V16.958ZM77.9386 22.806H80.4886V24.047H77.9386V22.806ZM80.0296 17.332H81.3726V31.527H80.0296V17.332ZM71.3766 18.896H78.3976V20.052H71.3766V18.896ZM71.2406 28.552L71.0706 27.362C73.0596 27.362 76.3916 27.294 78.7206 26.988L78.8226 28.025C76.4256 28.484 73.2126 28.552 71.2406 28.552ZM72.6346 19.644H73.9266V27.685H72.6346V19.644ZM75.8306 19.644H77.1226V27.685H75.8306V19.644ZM98.0313 16.941H99.4423V32.343H98.0313V16.941ZM91.3333 18.131C93.6113 18.131 95.2433 20.222 95.2433 23.486C95.2433 26.767 93.6113 28.858 91.3333 28.858C89.0723 28.858 87.4403 26.767 87.4403 23.486C87.4403 20.222 89.0723 18.131 91.3333 18.131ZM91.3333 19.406C89.8373 19.406 88.7833 21.004 88.7833 23.486C88.7833 25.985 89.8373 27.617 91.3333 27.617C92.8463 27.617 93.8833 25.985 93.8833 23.486C93.8833 21.004 92.8463 19.406 91.3333 19.406ZM106.581 19.151H107.72V21.65C107.72 24.897 105.765 28.161 103.317 29.368L102.501 28.246C104.728 27.192 106.581 24.302 106.581 21.65V19.151ZM106.853 19.151H107.992V21.65C107.992 24.251 109.845 26.903 112.106 27.872L111.307 28.994C108.825 27.838 106.853 24.846 106.853 21.65V19.151ZM103.011 18.522H111.596V19.712H103.011V18.522ZM113.67 16.958H115.081V32.326H113.67V16.958Z"
                                fill="black"
                            />
                        </svg>
                    </button>
                </Link>
                <Link to="/inquiry">
                    <button
                        style={{
                            display: "inline-block",
                            verticalAlign: "top",
                            border: "none",
                            background: "transparent",
                        }}
                    >
                        <svg
                            width="196"
                            height="48"
                            viewBox="0 0 196 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="196"
                                height="48"
                                rx="10"
                                fill="#D6E0F3"
                            />
                            <path
                                d="M27.5474 18.488H37.4414V19.661H27.5474V18.488ZM26.0854 29.011H39.9744V30.184H26.0854V29.011ZM31.4744 23.52H32.8854V29.589H31.4744V23.52ZM36.9144 18.488H38.3084V20.018C38.3084 21.922 38.3084 24.03 37.7474 27.141L36.3364 26.954C36.9144 24.013 36.9144 21.854 36.9144 20.018V18.488ZM53.318 16.958H54.661V26.019H53.318V16.958ZM50.87 20.817H53.777V21.99H50.87V20.817ZM49.969 17.247H51.295V25.934H49.969V17.247ZM44.342 26.75H54.661V32.326H53.267V27.906H44.342V26.75ZM46.977 18.097H48.405C48.405 21.769 46.365 24.54 42.489 26.172L41.792 25.135C45.209 23.741 46.977 21.446 46.977 18.573V18.097ZM42.404 18.097H47.487V19.253H42.404V18.097ZM63.5677 20.834H66.4747V21.99H63.5677V20.834ZM68.9567 16.958H70.2997V28.484H68.9567V16.958ZM65.9477 17.264H67.2907V28.042H65.9477V17.264ZM60.2867 30.83H70.7757V31.986H60.2867V30.83ZM60.2867 27.073H61.6977V31.476H60.2867V27.073ZM60.5417 18.046H61.6637V20.307C61.6637 22.687 60.3887 25.203 58.1617 26.291L57.3797 25.203C59.3687 24.234 60.5417 22.126 60.5417 20.307V18.046ZM60.7967 18.046H61.9017V20.307C61.9017 22.109 62.9897 23.945 64.9107 24.812L64.1117 25.883C61.9697 24.914 60.7967 22.653 60.7967 20.307V18.046ZM84.2554 16.941H85.6494V32.343H84.2554V16.941ZM81.0594 22.738H84.4594V23.911H81.0594V22.738ZM73.6984 27.481H74.8714C77.7614 27.481 79.5804 27.43 81.7394 27.022L81.8754 28.178C79.6654 28.569 77.7954 28.654 74.8714 28.654H73.6984V27.481ZM73.6984 18.352H80.8044V19.525H75.0924V27.889H73.6984V18.352ZM74.7354 22.67H80.1414V23.809H74.7354V22.67ZM88.64 29.266H102.563V30.439H88.64V29.266ZM94.862 25.968H96.273V29.759H94.862V25.968ZM90.323 18.097H100.846V22.755H91.768V25.832H90.374V21.616H99.452V19.236H90.323V18.097ZM90.374 25.237H101.203V26.393H90.374V25.237ZM116.166 19.355H120.79V20.511H116.166V19.355ZM116.166 23.044H120.79V24.2H116.166V23.044ZM120.28 16.975H121.691V28.331H120.28V16.975ZM111.882 30.83H122.116V31.986H111.882V30.83ZM111.882 27.158H113.293V31.34H111.882V27.158ZM113.242 17.944C115.503 17.944 117.203 19.525 117.203 21.786C117.203 24.047 115.503 25.628 113.242 25.628C110.981 25.628 109.281 24.047 109.281 21.786C109.281 19.525 110.981 17.944 113.242 17.944ZM113.242 19.185C111.746 19.185 110.641 20.273 110.641 21.786C110.641 23.316 111.746 24.404 113.242 24.404C114.738 24.404 115.86 23.316 115.86 21.786C115.86 20.273 114.738 19.185 113.242 19.185ZM135.919 16.958H137.33V24.795H135.919V16.958ZM131.057 17.706H132.587C132.587 21.582 129.918 24.064 125.43 25.152L124.937 23.996C128.915 23.078 131.057 21.055 131.057 18.403V17.706ZM125.736 17.706H131.703V18.862H125.736V17.706ZM132.043 19.168H136.157V20.29H132.043V19.168ZM131.907 22.109H136.072V23.214H131.907V22.109ZM127.436 25.509H137.33V29.283H128.881V31.731H127.487V28.195H135.936V26.648H127.436V25.509ZM127.487 31.051H137.84V32.173H127.487V31.051ZM150.741 16.958H152.152V32.326H150.741V16.958ZM151.812 23.265H154.668V24.455H151.812V23.265ZM140.252 19.406H149.313V20.562H140.252V19.406ZM144.842 21.837C147.018 21.837 148.582 23.299 148.582 25.373C148.582 27.447 147.018 28.909 144.842 28.909C142.683 28.909 141.102 27.447 141.102 25.373C141.102 23.299 142.683 21.837 144.842 21.837ZM144.842 23.01C143.448 23.01 142.445 23.979 142.445 25.373C142.445 26.75 143.448 27.736 144.842 27.736C146.236 27.736 147.239 26.75 147.239 25.373C147.239 23.979 146.236 23.01 144.842 23.01ZM144.111 17.145H145.522V19.933H144.111V17.145ZM167.162 16.958H168.573V32.326H167.162V16.958ZM162.657 18.607H164.051C164.051 23.061 162.045 26.954 156.911 29.47L156.163 28.331C160.6 26.189 162.657 22.925 162.657 18.845V18.607ZM156.86 18.607H163.269V19.763H156.86V18.607Z"
                                fill="black"
                            />
                        </svg>
                    </button>
                </Link>
            </div>
            {/* <button onClick={() => refresh()}>Refresh</button>
            <button onClick={() => testGet()}>test</button> */}
        </div>
    );
};

export default MyPage;
