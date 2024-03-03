import React, { useState, useEffect, useContext } from 'react'

import { useNavigate } from "react-router-dom";

import axios from '../../../api/axios.js';

import MarketList from "../../../components/ProductList.js";

import { MarketStateContext } from '../../../App.js';

import { useFetch } from '../../../hooks/useFetch.js';

import NavBar from '../../../components/Sub/NavBar'
import DropdownInstrument from '../../../components/Sub/Dropdown/DropdownInstrument'
import DropdownInAll from '../../../components/Sub/Dropdown/DropdownInAll'


function InstrumentList() {
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
        <div>
          <NavBar />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <DropdownInstrument />
            <div style={{ marginLeft: 'auto' }}>
              <DropdownInAll />
            </div>
          </div>
          <MarketList list={marketList} />
          <MarketList list={data} />
        </div>
      )
    //style={{ display: 'flex', justifyContent: 'flex-end' }}
}

export default InstrumentList;