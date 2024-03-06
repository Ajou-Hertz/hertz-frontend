import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import NavBar from '../../../components/Sub/NavBar';
import MainImageShow from '../../../components/Sub/MainImageShow';

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

  const [selectedState, setSelectedState] = useState(''); // 매물상태
  const [selectedBrand, setSelectedBrand] = useState(''); // 브랜드
  const [selectedModel, setSelectedModel] = useState(''); // 모델
  const [selectedYear, setSelectedYear] = useState(''); // 생산연도
  const [selectedColor, setSelectedColor] = useState(''); // 색상

  const [selectedProductName, setSelectedProductName] = useState(''); // 제품이름
  const [selectedPrice, setSelectedPrice] = useState(''); // 제품가격
  const [selectedLocation, setSelectedLocation] = useState(''); // 거래 위치

  const [isPopupOpen, setIsPopupOpen] = useState(false); // 단계설명 표 열고 닫는 상태

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

  return (
    <div>
      <NavBar />
      <div>
        <p style={{ paddingLeft: '40px', textAlign: 'left', fontSize: '18px' }}>중고악기</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <MainImageShow imageUrls={imageUrls} />
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px', height: '410px', marginLeft: '50px', marginRight: '50px', flexGrow: 1 }}>
          <p style={{ textAlign: 'left', paddingTop: '20px', paddingLeft: '20px', fontSize: '25px' }}>펜더 로드원 텔레케스터 {selectedProductName}</p>
          <div style={{ textAlign: 'left', paddingLeft: '20px', paddingBottom: '30px' }}>
            <span style={{ marginRight: '50px', color: '#002074', fontSize: '20px' }}>1,300,000원 {selectedPrice}</span> 
            <span style={{ textAlign: 'right' }}> 
            <i className="bi bi-geo-alt-fill"></i> 경기도 수원시 영통구 {selectedLocation}</span>
          </div>
          {/* 매물상태 표 */}
          <div style={{ display: 'flex', paddingLeft: '20px' }}>
            <p style={{ border: '1px solid black', padding: '20px', width: '150px', height: '100px' }}>
              <div>매물상태</div>
              <div><p>5단계</p>{selectedState}</div>
            </p>
            <p style={{ border: '1px solid black', padding: '20px', width: '150px', height: '100px' }}>
              <div>브랜드</div>
              <div><p>펜더</p>{selectedBrand}</div>
            </p>
            <p style={{ border: '1px solid black', padding: '20px', width: '150px', height: '100px' }}>
              <div>모델</div>
              <div><p>텔레케스터</p>{selectedModel}</div>
            </p>
            <p style={{ border: '1px solid black', padding: '20px', width: '150px', height: '100px' }}>
              <div>생산연도</div>
              <div><p>1958</p>{selectedYear}</div>
            </p>
            <p style={{ border: '1px solid black', padding: '20px', width: '150px', height: '100px' }}>
              <div>색상</div>
              <div><p>RED</p>{selectedColor}</div>
            </p>
            {/* 버튼 */}
            <div style={{ marginTop: '70px', marginLeft: '20px' }}>
              <button onClick={openPopup} style={{ backgroundColor: '#D6E0F3', border: 'none' }}>단계설명 확인하기</button>
              {isPopupOpen && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 999 }}>
                  <button style={{ float: 'right', background: 'none', border: 'none' }} onClick={closePopup}>X</button>
                  <div style={{ textAlign: 'center', margin: '20px' }}>
                    <p style={{ border: '3px solid black', padding: '10px', fontSize: '20px' }}>헤르츠 악기 상태 기준표</p>
                  </div>
                  <table style={{ border: '3px solid black', padding: '10px' }}>
                    <tbody>
                      {popupData.map(item => (
                        <tr key={item.label} style={{ border: '3px solid black', padding: '10px' }}>
                          <td style={{ border: '3px solid black', padding: '10px', background: '#D6E0F3' }}>{item.label}</td>
                          <td style={{ border: '3px solid black', padding: '10px', textAlign: 'left' }}>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 글 작성 부분 */}
      <div style={{ border: '1px solid black', margin: '50px', height: '600px' }}>
        <p style={{ padding: '40px', textAlign: 'left' }}>Hello</p>
      </div>
    </div>
  )
}

export default InstrumentDetail;
