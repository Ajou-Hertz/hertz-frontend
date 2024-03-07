import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

import MarketList from "../components/ProductList.js";
import Button from "@mui/material/Button";

import { MarketStateContext } from "../App";

import { useFetch } from "./../hooks/useFetch";

import NavBar from "../components/Sub/NavBar";

function Home() {
    const marketList = useContext(MarketStateContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]); // get으로 가져온 데이터
    // useEffect(() => {
    //     axios
    //         .get(`/markets?sort=LATEST&date=CURRENT&page=0`)
    //         .then((res) => {
    //             // setData(res.data.markets);
    //             // console.log(res.data.markets);

    //             const getData = res.data.markets.map((it) => {
    //                 const startDate = new Date(it.startDate);
    //                 const endDate = new Date(it.endDate);

    //                 let period = `${startDate.getFullYear()}.${
    //                     startDate.getMonth() + 1
    //                 }.${startDate.getDate()}`;
    //                 period += ` ~ ${endDate.getFullYear()}.${
    //                     endDate.getMonth() + 1
    //                 }.${endDate.getDate()}`;

    //                 return {
    //                     id: it.marketIdx,
    //                     img: it.thumbnailImage,
    //                     url: "https://www.instagram.com/p/CgoeXAELGQl/",
    //                     name: it.name,
    //                     location: `${it.address.sido} ${it.address.sigungu}`,
    //                     detail: it.address.detailAddress,
    //                     time: `${it.openTime.slice(
    //                         0,
    //                         5
    //                     )} ~ ${it.closeTime.slice(0, 5)}`,
    //                     period: period,
    //                     like: it.interestCount,
    //                     view: it.viewCount,
    //                 };
    //             });
    //             setData(getData);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, []);

    // const getClick = () => {
    //     axios
    //         .get("/users")
    //         .then((res) => {
    //             setData(res.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };
    // const postClick = () => {
    //     axios
    //         .post("users/email", {
    //             email: "temp000@naver.com",
    //         })
    //         // .post("http://52.79.146.185:8080/api/users/email", {
    //         //     email: "temp000@naver.com",
    //         // })
    //         .then((res) => console.log(res.data))
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    function handleClick() {
        navigate("/search");
    }

    return (
        <div className="area">
            <NavBar></NavBar>
            <h1
                className="title"
                style={{ textAlign: "left", marginLeft: "24px" }}
            >
                Hot
            </h1>
            {/* <svg
                width="41"
                height="16"
                viewBox="0 0 41 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3.28999 15H0.354908V0.856353H3.28999V6.71271H9.41568V0.856353H12.3577V15H9.41568V9.13674H3.28999V15ZM27.6914 7.92818C27.6914 9.4291 27.4037 10.7274 26.8282 11.8232C26.2573 12.919 25.4723 13.7546 24.4732 14.3301C23.4741 14.9056 22.3438 15.1934 21.0823 15.1934C19.8208 15.1934 18.6905 14.9056 17.6914 14.3301C16.6923 13.75 15.9074 12.9121 15.3365 11.8163C14.7656 10.7205 14.4801 9.42449 14.4801 7.92818C14.4801 6.42726 14.7656 5.12891 15.3365 4.03315C15.9074 2.93738 16.6923 2.10175 17.6914 1.52624C18.6905 0.950736 19.8208 0.662982 21.0823 0.662982C22.3438 0.662982 23.4741 0.950736 24.4732 1.52624C25.4723 2.10175 26.2573 2.93738 26.8282 4.03315C27.4037 5.12891 27.6914 6.42726 27.6914 7.92818ZM24.7149 7.92818C24.7149 6.93831 24.5653 6.09346 24.266 5.39365C23.9668 4.69383 23.5432 4.16436 22.9953 3.80525C22.452 3.44613 21.8144 3.26657 21.0823 3.26657C20.3503 3.26657 19.7126 3.44843 19.1693 3.81215C18.6261 4.17127 18.2048 4.70074 17.9055 5.40055C17.6063 6.09576 17.4566 6.93831 17.4566 7.92818C17.4566 8.91805 17.6063 9.76289 17.9055 10.4627C18.2048 11.1579 18.6261 11.6874 19.1693 12.0511C19.7126 12.4102 20.3503 12.5898 21.0823 12.5898C21.8144 12.5898 22.452 12.4102 22.9953 12.0511C23.5432 11.692 23.9668 11.1625 24.266 10.4627C24.5653 9.76289 24.7149 8.91805 24.7149 7.92818ZM32.9676 3.28729H28.6236V0.856353H40.2051V3.28729H35.875V15H32.9676V3.28729Z"
                    fill="black"
                />
            </svg> */}

            <MarketList list={marketList} />
            <MarketList list={data} />
            {/* <Button
                className="button"
                variant="outlined"
                onClick={handleClick}
                sx={{ mt: 2, mb: 2 }} // margin-top과 margin-bottom을 추가합니다.
            >
                더보기
            </Button> */}

            {/* <button onClick={getClick}>get</button>
            <button onClick={postClick}>post</button> */}
        </div>
    );
}

export default Home;
