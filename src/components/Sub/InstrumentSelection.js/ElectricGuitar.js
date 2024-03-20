import React, { useState, useEffect }  from 'react'
import axios from '../../../api/axios';


const ElectricGuitar = () => {  
    const [Sido,setSido] = useState();

    // 시도 get api
    useEffect(() => {
      // 매물 정보를 불러오는 API 호출
      axios.get('/api/administrative-areas/sido') // 가정한 URL, 실제 URL로 변경 필요
        .then(response => {
            // 응답으로 받은 매물 정보로 상태 업데이트
            setSido(response.data);
            console.log("시도:",response.data );
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

  return (
    <div>
      <div>
        <p>거래 지역</p>
      </div>
      <div>
        <p style={{ fontSize: '10px' }}>악기상태</p>
      </div>
      <div>
        <p>브랜드</p>
      </div>
      <div>
        <p>모델</p>
      </div>
      <div>
        <p>생산연도</p>
      </div>
      <div>
        <p>색상</p>
      </div>
      <div>
        <p>가격</p>
      </div>
      <div>
        <p>특이사항 유무</p>
      </div>
      <div>
        <p>해시태그(선택)</p>
      </div>
    </div>
  )
}

export default ElectricGuitar;