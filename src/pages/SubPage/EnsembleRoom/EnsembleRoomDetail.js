import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil";

import NavBar from '../../../components/Sub/NavBar';
import MainImageShow from '../../../components/Sub/MainImageShow';
import KakaoMap from '../../../components/Sub/KakaoMap';

const EnsembleRoomDetail = () => {
  const [imageUrls, setImageUrls] = useState([
    'https://cdn.imweb.me/upload/S201811205bf3e85780d0b/5c8cc0df110e7.png',
    'https://m.guitark.com/web/product/big/201705/387_shop1_550856.jpg',
    'https://m.pertriomusic.com/web/product/big/202303/be112e60dc62fd137e029d2215dd7554.jpg',
    'https://www.freebud.co.kr/shop/data/goods/1575448106133m0.jpg',
    'https://m.guitark.com/web/product/big/201705/387_shop1_550856.jpg',
    'https://m.guitarnara.co.kr/web/product/big/202109/bab81e5b9044ddc5abce16bf4d2a564d.jpg',
    'https://m.pertriomusic.com/web/product/big/202303/be112e60dc62fd137e029d2215dd7554.jpg'
    //api에서 이미지 받아오기
  ]);

  useEffect(() => {
    axios.get('/api/images')
      .then(response => {
        setImageUrls(response.data);
      })
      .catch(error => {
        console.error('Failed to load images', error);
      });
  }, []);

  const navigate = useNavigate();

  const [selectedEquipment, setSelectedEquipment] = useState(''); // 음향장비
  const [selectedInstrument, setSelectedInstrument] = useState(''); // 악기
  const [selectedSize, setSelectedSize] = useState(''); // 사이즈
  const [selectedCapacity, setSelectedCapacity] = useState(''); // 수용인원
  const [selectedParking, setSelectedParking] = useState(''); // 주차장

  const [selectedProductName, setSelectedProductName] = useState(''); // 합주실 이름
  const [selectedPriceTime, setSelectedPriceTime] = useState(''); // 시간당 대여가격
  const [selectedPriceDay, setSelectedPriceDay] = useState(''); // 일당 대여 가격
  const [selectedLocation, setSelectedLocation] = useState(''); // 합주실 위치

  const [inputHashtag, setInputHashtag] = useState(''); // 판매자가 입력한 해시태그
  const [inputDescription, setInputDescription] = useState(""); // 상세 정보 입력

  const [user, setUser] = useRecoilState(userState);

  // 토큰 가져오기
  const token = localStorage.getItem("token");
  console.log("토큰 확인", token);
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // 로그인 상태
  // const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false); // 로그인 팝업 열고 닫는 상태
  const sellerContact = isLoggedIn ? 'https://open.kakao.com/qwer' : '로그인 후 열람 가능합니다';


  const clickSeller = () => {
    if (isLoggedIn) {
      // 로그인 상태일 때, 판매자 페이지로 이동
      console.log("로그인 완료로"); // 로그인 상태 확인
      navigate('/Seller'); // 예시 URL, 실제 판매자 페이지 URL로 변경 필요
    } else {
      // 로그인 상태가 아닐 때, 팝업 메시지를 보여주고 로그인 페이지로 이동
      alert('로그인 후에 사용해주세요.');
      navigate('/Login'); // 실제 로그인 페이지 URL로 변경 필요
    }
  };
  
  // 수정하기 페이지
  function clickModify() {
    navigate("/InstrumentModify")
  }

  // 예약 현황 페이지
  function clickReserve() {
    navigate("/Reserve")
  }

  // 리뷰 더보기 페이지
  function clickMoreReview() {
    navigate("/Review")
  }

  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px 50px 0 50px' }}>
        <p style={{ textAlign: 'left', fontSize: '20px' }}>합주실</p>
        <div style={{ marginRight: '40px' }}>
          <p onClick={ clickModify } style={{ cursor: 'pointer', textDecoration: 'underline', display: 'inline', marginRight: '30px' }}>수정하기</p>
          <p onClick={ clickModify } style={{ cursor: 'pointer', textDecoration: 'underline', display: 'inline' }}>삭제하기</p>
        </div>
      </div>
      {/* 제품 이미지 및 제품 정보 */}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <MainImageShow imageUrls={imageUrls} />
        <div style={{ border: '1px solid black', padding: '10px',  
                height: '420px', marginLeft: '40px', marginRight: '50px', flexGrow: 1 }}>
          <p style={{ textAlign: 'left', paddingTop: '20px', paddingLeft: '20px', fontSize: '25px' }}>수원역 헤르츠 합주실 {selectedProductName}</p>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', paddingLeft: '20px' }}>
              <span style={{ marginRight: '50px', color: '#002074', fontSize: '20px' }}>3,000원 / 시간 {selectedPriceTime}</span> 
              <span style={{ marginRight: '50px', color: '#002074', fontSize: '20px' }}>30,000원 / 일 {selectedPriceDay}</span> 
              {/* 매물상태 표 */}
              <div style={{ display: 'flex', marginTop: '15px', textAlign: 'center' }}>
                <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
                  <div>음향장비</div>
                  <div><p style={{ marginTop: '10px' }}>보유</p>{selectedEquipment}</div>
                </p>
                <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
                  <div>악기</div>
                  <div><p style={{ marginTop: '10px' }}>보유</p>{selectedInstrument}</div>
                </p>
                <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
                  <div>사이즈</div>
                  <div><p style={{ marginTop: '10px' }}>12평</p>{selectedSize}</div>
                </p>
                <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
                  <div>수용인원</div>
                  <div><p style={{ marginTop: '10px' }}>최대 7명</p>{selectedCapacity}</div>
                </p>
                <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
                  <div>주차장</div>
                  <div style={{ marginTop: '10px' }}><p>보유</p>{selectedParking}</div>
                </p>
              </div>
            </div>
            <div>
              <span>
                <i className="bi bi-geo-alt-fill"></i> 경기도 수원시 영통구 {selectedLocation}
              </span>
              <div style={{ marginTop: '10px' }}>
                <KakaoMap />
              </div>
            </div>
          </div>
          {/* 해시태그 */}
          <div>
            <div>
              <p style={{ color: '#637DBE', margin: '15px', marginLeft: '20px', textAlign: 'left' }}>
                #50년대_텔레케스터 #매이플지판 #래릭처리</p> {inputHashtag}
            </div>
          </div>
          {/* 판매자 정보 확인 */}
          <div style={{ display: 'flex', margin: '10px', marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* 판매자 연락처가 보여지는 */}
            <div style={{ display: 'flex', flexGrow: 1, border: '1px solid #637DBE', 
              padding: '10px', borderRadius: '7px', justifyContent: 'space-evenly', 
              alignItems: 'center', marginLeft: '10px' }}>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>연락하기</p>
              {/* 로그 아웃 상태 시 확인 불가 */}
              {user ? (
                <p style={{ margin: 0, display: 'flex', alignItems: 'center', padding: '5px' }}>https://open.kakao.com/qwer</p>
              ) : (
                <button style={{ backgroundColor: "#D6E0F3", border: "none", borderRadius: "10px", padding: '5px 20px' }}
                  onClick={clickSeller}>로그인 후 열람 가능합니다.
                </button>
              )}
            </div>
            {/* 판매자 페이지로 넘어가는 버튼 */}
            <div style={{ display: 'flex', flexGrow: 1, border: '1px solid #637DBE', 
              padding: '10px', borderRadius: '7px', justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '10px' }}>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>판매자 정보</p>
              <button style={{ backgroundColor: '#D6E0F3', border: 'none', borderRadius: '10px', padding: '5px 20px' }} 
                onClick={clickSeller}>확인하기</button>
            </div>
          </div>
        </div>
      </div>
      {/* 예약 현황 및 상세 설명 부분 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', alignItems: 'stretch' }}>
        <div style={{ width: '30%', paddingRight: '20px', display: 'flex', flexDirection: 'column' }}>
          {/* 예약 현황 확인하기 */}
          <div style={{ border: '1px solid black', marginLeft: '50px', flexGrow: 1 }}>
            <p style={{ margin: '20px 0', padding: '10px', 
              backgroundColor: '#D6E0F3', fontWeight: 'bold', fontSize: '20px' }}>예약 현황</p>
            <button style={{ backgroundColor: '#637DBE', border: 'none', borderRadius: '10px', 
              padding: '8px 30px', marginBottom: '20px', marginTop: '10px', color: 'white' }}
              onClick={clickReserve}>
              확인하기</button>
          </div>
          {/* 리뷰 확인하기 */}
          <div style={{ border: '1px solid black', marginLeft: '50px', marginTop: '30px', marginBottom: '50px', 
            flexGrow: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ margin: '10px 20px', textAlign: 'left', 
              fontWeight: 'bold', fontSize: '22px' }}>Review</p>
            {/* 리뷰 내용 */}
            <p style={{ margin: '15px 20px', padding: '10px', borderRadius: '7px',
              backgroundColor: '#D6E0F3', fontSize: '18px' }}>시설이 청결해요</p>
            <p style={{ margin: '15px 20px', padding: '10px', borderRadius: '7px',
              backgroundColor: '#D6E0F3', fontSize: '18px' }}>응대가 빨라요</p>
            <p style={{ margin: '15px 20px', padding: '10px', borderRadius: '7px',
              backgroundColor: '#D6E0F3', fontSize: '18px' }}>방음이 잘돼요</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
              <button style={{ backgroundColor: '#637DBE', border: 'none', borderRadius: '10px 0 0 0', 
                padding: '8px 30px', color: 'white' }}
                onClick={clickMoreReview}>
                리뷰 더보기</button>
            </div>
          </div>
        </div>
        <div style={{ width: '71%', paddingLeft: '20px', marginRight: '50px' }}>
          {/* 특이사항 및 상세 설명 글 부분 */}
          <div style={{ border: '1px solid black', minHeight: '550px', display: 'flex', flexDirection: 'column', marginBottom: '50px' }}>
            <div>
              <p style={{ padding: '40px', textAlign: 'left', lineHeight: '3.0' }}>본문</p> {inputDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnsembleRoomDetail;
