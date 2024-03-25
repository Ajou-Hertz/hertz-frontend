import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import NavBar from '../../../components/Sub/NavBar';
import MainImageShow from '../../../components/Sub/MainImageShow';
import PopupButton from '../../../components/Sub/PopupButton';

const InstrumentDetail = () => {
  const [imageUrls, setImageUrls] = useState([
    'https://m.guitarnara.co.kr/web/product/big/202109/bab81e5b9044ddc5abce16bf4d2a564d.jpg',
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

  const [selectedState, setSelectedState] = useState(''); // 매물상태
  const [selectedBrand, setSelectedBrand] = useState(''); // 브랜드
  const [selectedModel, setSelectedModel] = useState(''); // 모델
  const [selectedYear, setSelectedYear] = useState(''); // 생산연도
  const [selectedColor, setSelectedColor] = useState(''); // 색상

  const [selectedProductName, setSelectedProductName] = useState(''); // 제품이름
  const [selectedPrice, setSelectedPrice] = useState(''); // 제품가격
  const [selectedLocation, setSelectedLocation] = useState(''); // 거래 위치

  const [isPopupOpen, setIsPopupOpen] = useState(false); // 단계설명 표 열고 닫는 상태

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const sellerContact = isLoggedIn ? 'https://open.kakao.com/qwer' : '로그인 후 열람 가능합니다'; //

  // 팝업 내용
  const popupData = [
    { label: '5단계', value: '외관/사용 모두 완벽, 신동품' },
    { label: '4단계', value: '외관/사용 모두 문제 없음' },
    { label: '3단계', value: '사용에 문제 없으나 외관에 덴트, 녹 등 존재' },
    { label: '2단계', value: '사용에 문제 있음. 셋업/수리 필요' },
    { label: '1단계', value: '부품용/상태 안좋음' }
  ];

  // 팝업 열기
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // 확인하기 
  function clickSeller() {
    navigate("/Seller");
  }

  {/*// 확인하기 
  function clickSeller() {
    // TODO: 로그인 여부 확인
    if (isLoggedIn) {
      navigate("/Seller");
    } else {
      // 팝업 표시 후 로그인 페이지로 이동
      openPopup();
      // 로그인 페이지로 이동
      navigate("/login");
    }
  }*/}

  // 수정하기 페이지
  function clickModify() {
    navigate("/InstrumentModify")
  }

  return (
    <div>
      <NavBar />
      <div>
        <p style={{ paddingLeft: '40px', textAlign: 'left', fontSize: '20px' }}>중고악기</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '70px' }}>
        <p onClick={ clickModify } style={{ cursor: 'pointer', textDecoration: 'underline' }}>수정하기</p>
        <p onClick={ clickModify } style={{ marginLeft: '30px', cursor: 'pointer', textDecoration: 'underline' }}>삭제하기</p>
      </div>
      {/* 제품 이미지 및 제품 정보 */}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <MainImageShow imageUrls={imageUrls} />
        <div style={{ border: '1px solid black', padding: '10px', marginLeft: '10px', marginRight: '10px', height: '420px', marginLeft: '50px', marginRight: '50px', flexGrow: 1 }}>
          <p style={{ textAlign: 'left', paddingTop: '20px', paddingLeft: '20px', fontSize: '25px' }}>펜더 로드원 텔레케스터 {selectedProductName}</p>
          <div style={{ textAlign: 'left', paddingLeft: '20px', paddingBottom: '30px' }}>
            <span style={{ marginRight: '50px', color: '#002074', fontSize: '20px' }}>1,300,000원 {selectedPrice}</span> 
            <span style={{ textAlign: 'right' }}>
            <i className="bi bi-geo-alt-fill"></i> 경기도 수원시 영통구 {selectedLocation}</span>
          </div>
          {/* 매물상태 표 */}
          <div style={{ display: 'flex', paddingLeft: '20px' }}>
            <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
              <div>매물상태</div>
              <div><p style={{ marginTop: '10px' }}>5단계</p>{selectedState}</div>
            </p>
            <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
              <div>브랜드</div>
              <div><p style={{ marginTop: '10px' }}>펜더</p>{selectedBrand}</div>
            </p>
            <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
              <div>모델</div>
              <div><p style={{ marginTop: '10px' }}>텔레케스터</p>{selectedModel}</div>
            </p>
            <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
              <div>생산연도</div>
              <div><p style={{ marginTop: '10px' }}>1958</p>{selectedYear}</div>
            </p>
            <p style={{ border: '1px solid black', padding: '20px', width: '135px', height: '100px' }}>
              <div>색상</div>
              <div><p style={{ marginTop: '10px' }}>RED</p>{selectedColor}</div>
            </p>
            {/* 단계설명 확인하기 버튼 */}
            <div style={{ marginTop: '70px', marginLeft: '20px' }}>
              <PopupButton onClick={openPopup} isPopupOpen={isPopupOpen} closePopup={closePopup} popupData={popupData} />
            </div>
          </div>
          {/* 해시태그 */}
          <div>
            <p style={{ color: '#637DBE', margin: '15px', marginLeft: '20px', textAlign: 'left' }}>#50년대_텔레케스터 #매이플지판 #래릭처리</p>
          </div>
          {/* 판매자 정보 확인 */}
          <div style={{ display: 'flex', margin: '10px', marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* 판매자 연락처가 보여지는 */}
            <div style={{ display: 'flex', flexGrow: 1, border: '1px solid #637DBE', 
              padding: '15px', borderRadius: '3px', justifyContent: 'space-evenly', 
              alignItems: 'center', marginLeft: '10px' }}>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>연락하기</p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>https://open.kakao.com/qwer</p>
            </div>
            {/* 판매자 페이지로 넘어가는 버튼 */}
            <div style={{ display: 'flex', flexGrow: 1, border: '1px solid #637DBE', 
              padding: '10px', borderRadius: '3px', justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '10px' }}>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>판매자 정보</p>
              <button style={{ backgroundColor: '#D6E0F3', border: 'none', borderRadius: '3px',
                padding: '5px', paddingLeft: '10px', paddingRight: '10px' }} 
                onClick={clickSeller}>확인하기</button>
            </div>
          </div>
        </div>
      </div>
      {/* 특이사항 및 상세 설명 글 부분 */}
      <div style={{ border: '1px solid black', margin: '50px', minHeight: '600px' }}>
        <p style={{ padding: '40px', textAlign: 'left', lineHeight: '3.0' }}>14년 시리얼 펜더 로드원 50 텔러입니다.<br/>
        기존 픽업을 던컨 STK-T1n 프론트와 Little59 리어 셋트로 교체했습니다.</p>
      </div>
      {/* 로그인 팝업
      {isPopupOpen && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          backgroundColor: 'white', padding: '20px', borderRadius: '10px', zIndex: '9999' }}>
          <p>로그인 후에 <br>
          이용 가능합니다.</p>
          <button onClick={closePopup}>확인</button>
        </div>
      )}*/}
    </div>
  )
}

export default InstrumentDetail;
