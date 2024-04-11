import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/Sub/NavBar'

const WriteReview = () => {
  const [textReview, setTextReview] = useState(""); // 텍스트 리뷰 입력

  const navigate = useNavigate();

  // 텍스트리뷰 작성하기 페이지
  function clickWriteTextReview() {
    navigate("/WriteTextReview")
  }
  return (
    <div>
      <NavBar />
      <p style={{ textAlign: 'left', fontSize: '20px', margin: '40px 50px 20px 50px' }}>합주실 / 리뷰페이지 / 리뷰작성</p>
      {/* 리뷰 키워드 선택 */}
      <div style={{ border: '1px solid black', margin: '0 50px 50px 50px' }}>
        <p style={{ margin: '30px', fontWeight: 'bold', fontSize: '22px' }}>KEYWORD REVIEW</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', flex: '0 0 30%',
            flexDirection: 'row', margin: '15px 45px' }}>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>응대가 빨라요</p>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>방음이 잘돼요</p>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>다음에 또 이용하고 싶어요</p>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>글의 내용과 일치해요</p>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>주차장이 편리해요</p>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>시설이 좋아요</p>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>질문에 친절하게 답해줘요</p>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>장비 관리가 잘되어 있어요</p>
            <p style={{ margin: '15px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>공간이 청결해요</p>
            <p style={{ margin: '15px 30px 20px 20px', padding: '10px', width: '400px',
                backgroundColor: '#D6E0F3', fontSize: '18px', borderRadius: '5px' }}>공간이 넓어요</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <button style={{ backgroundColor: '#637DBE', border: 'none', borderRadius: '10px 0 0 0', 
                padding: '10px 30px', color: 'white' }}
                onClick={clickWriteTextReview}>
                텍스트리뷰 작성하기</button>
        </div>
      </div>
    </div>
  )
}

export default WriteReview