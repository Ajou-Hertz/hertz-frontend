import React, { useState } from 'react';
import axios from 'axios';

import NavBar from '../../../components/Sub/NavBar';
import DropdownMenu from '../../../components/Sub/Dropdown/DropdownMenu';

const InstrumentModify = () => {
  // 매물 정보 상태를 관리. 실제로는 API 호출을 통해 초기값을 설정할 수 있습니다.
  const [selectedProductName, setName] = useState('기존 매물 이름');
  const [description, setDescription] = useState('기존 매물 설명');

  const [selectedOption, setSelectedOption] = useState('일렉기타'); // 드롭다운 선택 상태


  /*useEffect(() => {
    // 매물 정보를 불러오는 API 호출
    axios.get('/api/instruments/{instrumentId}') // 가정한 URL, 실제 URL로 변경 필요
      .then(response => {
        // 응답으로 받은 매물 정보로 상태 업데이트
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);*/


  // 입력 필드의 값이 변경될 때마다 상태를 업데이트하는 함수입니다.
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // 드롭다운 선택을 처리하는 함수
  const handleDropdownSelect = (option) => {
    setSelectedOption(option); // 드롭다운 선택 값을 업데이트하지만, selectedProductName은 변경하지 않음
  };

  // 폼 제출 함수입니다. 실제로는 여기서 수정된 정보를 서버로 보내는 로직이 필요합니다.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Name:', selectedProductName);
    console.log('Updated Description:', description);
    // 여기서 수정 API를 호출할 수 있습니다.
  };

  return (
    <div>
      <NavBar />
      <div>
        <form onSubmit={handleSubmit}>
          {/* 판매할 악기 이름 수정하는 칸 */}
          <div style={{ textAlign: 'left', marginLeft: '70px' }}>
            <input type="text" id="name" value={selectedProductName} onChange={handleNameChange}
              style={{ borderRadius: '5px', minWidth: '1000px', padding: '10px', marginRight: '40px' }} />
            {/* 드롭다운 */}
            <DropdownMenu
              options={['이펙터', '앰프', '베이스', '어쿠스틱&클래식', '음향장비', '합주실', '공연장']} // 드롭다운에 보여줄 옵션들
              onSelect={handleDropdownSelect} // 선택된 옵션을 별도의 상태로 업데이트
              defaultOptionText="일렉기타" // 드롭다운의 기본 텍스트를 선택된 옵션으로 설정
            />
          </div>
          {/* 필수사항 */}
          <div style={{ margin: '15px' }}>
            <p>필수사항 : 전면샷 / 후면전체 샷 / 픽업 & 브릿지 / 덴트(흠집있는 부분들) / 특이사항 부분들 (넥 문제 , 배선 문제, 녹이 슮 등)</p>
          </div>
          {/* 상세 정보 입력하는 칸 */}
          <div style={{ textAlign: 'left', marginLeft: '70px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>특이사항 및 상세 설명</p>
            <p>추가적으로 기입해야 할 정보, 참고사항, 유의할 점 등 구매자가 알아야할 정보들을 기입해주세요.</p>
            <textarea id="description" value={description} onChange={handleDescriptionChange}
              style={{ borderRadius: '5px', minWidth: '1380px', padding: '10px', marginRight: '40px' }} />
          </div>
          <div style={{ textAlign: 'right', margin: '30px 70px 30px 30px' }}>
            <button type="submit"
              style={{ backgroundColor: '#D6E0F3', borderRadius: '5px', border: 'none',
                paddingRight: '15px', paddingLeft: '15px' }}>올리기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstrumentModify;
