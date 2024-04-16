import React, { useState, useEffect } from 'react'
import NavBar from '../../../components/Sub/NavBar'

const WriteTextReview = () => {
    const [userID, setUserID] = useState(""); // 사용자 아이디
    const [textReview, setTextReview] = useState(""); // 텍스트 리뷰 입력

    const [currentDate, setCurrentDate] = useState(""); // 현재 날짜
    const [bytes, setBytes] = useState(0); // 현재 입력된 텍스트의 바이트 수
    const maxBytes = 200; // 최대 바이트 수
  
    // 현재 날짜를 설정하는 함수
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        });
        setCurrentDate(formattedDate);
    }, []);


    // 바이트 수를 계산하는 함수
    const calculateBytes = (string) => {
      return new Blob([string]).size;
    }

    // 입력 필드의 값이 변경될 때마다 상태를 업데이트하는 함수
    const handleTextReviewChange = (e) => {
        const inputText = e.target.value;
        const inputBytes = calculateBytes(inputText);
    
        if (inputBytes <= maxBytes) {
          setTextReview(inputText);
          setBytes(inputBytes);
        }
      };
    
    // 폼 제출 함수입니다. 여기서 새로운 악기 정보를 서버로 보내는 로직이 들어가야함
    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    
  return (
    <div>
      <NavBar />
      <p style={{ textAlign: 'left', fontSize: '20px', margin: '40px 50px 20px 50px' }}>합주실 / 리뷰페이지 / 리뷰작성</p>
      {/* 리뷰 키워드 선택 */}
      <div style={{ border: '1px solid black', margin: '0 50px 50px 50px' }}>
        <p style={{ margin: '30px', fontWeight: 'bold', fontSize: '22px' }}>TEXT REVIEW</p>
        <div style={{ textAlign: 'right' }}>
            <p style={{ display: 'inline', marginRight: '40px' }}>{currentDate}</p>
            <p value={userID} style={{ display: 'inline', marginRight: '70px' }}>qwe****</p>
        </div>
        {/* 텍스트 리뷰 */}
        <div style={{ position: 'relative', margin: '5px 50px 20px' }}>
          <textarea
            id="textReview"
            value={textReview}
            onChange={handleTextReviewChange}
            placeholder="상세 내용을 입력해주세요. 리뷰는 최소 10자 이상 작성해주세요."
            style={{
              borderRadius: "5px",
              width: "100%",
              minHeight: "350px",
              padding: "10px",
              position: 'relative'
            }}
          />
          <div style={{ 
              position: 'absolute', 
              bottom: '10px', 
              right: '20px', 
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '2px 5px',
              borderRadius: '5px'
            }}>
            {bytes}/{maxBytes} bytes
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <button style={{ backgroundColor: '#637DBE', border: 'none', borderRadius: '10px 0 0 0', 
                padding: '10px 30px', color: 'white' }}
                type="submit"
                onClick={handleSubmit}>
                제출하기
            </button>
        </div>
      </div>
    </div>
  )
}

export default WriteTextReview