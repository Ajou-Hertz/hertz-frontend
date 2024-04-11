import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/Sub/NavBar'

const Review = () => {
  const [selectedKeywords, setSelectedKeywords] = useState(null); // 사용자가 선택한 키워드

// 토큰 가져오기
  const token = localStorage.getItem("token");
  console.log("토큰 확인", token);
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // 로그인 상태

  const navigate = useNavigate();

  // 
  const clickWriteKeywordReview = () => {
    if (isLoggedIn) {
      // 로그인 상태일 때, 키워드 리뷰 선택하는 페이지로 이동
      console.log("로그인 완료로"); // 로그인 상태 확인
      navigate('/WriteKeywordReview');
    } else {
      // 로그인 상태가 아닐 때, 팝업 메시지를 보여주고 로그인 페이지로 이동
      alert('로그인 후에 사용해주세요.');
      navigate('/Login');
    }
  };


  return (
    <div>
      <NavBar />
      <p style={{ textAlign: 'left', fontSize: '20px', margin: '40px 50px 20px 50px' }}>합주실 / 리뷰페이지</p>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '30%', marginLeft: '50px', marginBottom: '50px' }}>
            {/* Keyword */}
            <div style={{ border: '1px solid black', height: '600px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 20px' }}>
                    <p style={{ marginTop: '10px', textAlign: 'left', fontWeight: 'bold', fontSize: '22px' }}
                    >KEYWORD</p>
                    <button style={{ backgroundColor: '#637DBE', border: 'none', color: 'white',
                        borderRadius: '3px', padding: '5px 20px', marginTop: '5px', height: '45px' }}
                        onClick={clickWriteKeywordReview}>작성하기
                    </button>
                </div>
                {/* 리뷰 키워드들 */}
                <div>
                    <p style={{ margin: '15px 20px', padding: '10px', 
                        backgroundColor: '#D6E0F3', fontSize: '18px' }}>시설이 청결해요</p>
                    <p style={{ margin: '15px 20px', padding: '10px',
                        backgroundColor: '#D6E0F3', fontSize: '18px' }}>응대가 빨라요</p>
                    <p style={{ margin: '15px 20px', padding: '10px',
                        backgroundColor: '#D6E0F3', fontSize: '18px' }}>방음이 잘돼요</p>
                    <p style={{ margin: '15px 20px', padding: '10px', 
                        backgroundColor: '#D6E0F3', fontSize: '18px' }}>시설이 청결해요</p>
                    <p style={{ margin: '15px 20px', padding: '10px',
                        backgroundColor: '#D6E0F3', fontSize: '18px' }}>응대가 빨라요</p>
                    <p style={{ margin: '15px 20px', padding: '10px',
                        backgroundColor: '#D6E0F3', fontSize: '18px' }}>방음이 잘돼요</p>
                </div>
            </div>
        </div>
        <div style={{ width: '70%', marginRight: '50px', marginLeft: '40px', marginBottom: '50px' }}>
            {/* text */}
            <div style={{ border: '1px solid black', height: '600px' }}>
                <p style={{ margin: '10px 20px', textAlign: 'left', fontWeight: 'bold', fontSize: '22px' }}
                >Text</p>
                {/* 텍스트 리뷰들 */}
                <div>
                    <p></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Review