import React from 'react'
import NavBar from '../../../components/Sub/NavBar'

const Review = () => {
  return (
    <div>
      <NavBar />
      <p style={{ textAlign: 'left', fontSize: '20px', margin: '40px 50px 20px 50px' }}>합주실 / 리뷰페이지</p>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '30%' }}>
            {/* Keyword */}
            <div style={{ border: '1px solid black', minHeight: '600px',
                marginLeft: '50px', marginBottom: '50px' }}>
                <p style={{ margin: '10px 20px', textAlign: 'left', fontWeight: 'bold', fontSize: '22px' }}
                >KEYWORD</p>
                {/* 리뷰 키워드들 */}
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
        <div style={{ width: '70%' }}>
            {/* text */}
            <div style={{ border: '1px solid black', minHeight: '600px', 
                marginRight: '50px', marginLeft: '40px', marginBottom: '50px' }}>
                <p style={{ margin: '10px 20px', textAlign: 'left', fontWeight: 'bold', fontSize: '22px' }}
                >Text</p>
                {/* 텍스트 리뷰들 */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Review