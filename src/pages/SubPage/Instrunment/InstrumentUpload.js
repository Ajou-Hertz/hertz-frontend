import React, { useState } from 'react';
import axios from 'axios';

import NavBar from '../../../components/Sub/NavBar';
import DropdownMenu from '../../../components/Sub/Dropdown/DropdownMenu';
import UploadPhoto from '../../../components/Sub/UploadPhoto';
import ElectricGuitar from '../../../components/Sub/InstrumentSelection.js/ElectricGuitar';
import Amp from '../../../components/Sub/InstrumentSelection.js/Amp';

const InstrumentUpload = () => {
  // 매물 정보 상태를 관리합니다. 여기서는 초기값이 비어있거나 기본값을 가질 수 있습니다.
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');

  const [selectedOption, setSelectedOption] = useState('일렉기타'); // 드롭다운 초기 선택값

  const [selectedImage, setSelectedImage] = useState([]); // 선택한 이미지 상태 추가

  // 입력 필드의 값이 변경될 때마다 상태를 업데이트하는 함수들입니다.
  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // 드롭다운 선택을 처리하는 함수
  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  {/*드롭다운 메뉴 선택에 따른 필수 입력사항 
  const inputRequirements = {
    "일렉기타": [
      //{ label: "거래지역", type: "dropdown", options: [["시/도", "서울", "경기도"], ["시/군/구", "강남구", "서초구"], ["읍/면/동", "역삼동"]], dropdownCounts: 3 },
      { label: "거래지역", type: "dropdown", options: [["시/도"]], dropdownCounts: 1 },
      { label: "악기 상태", type: "button", options: ["1단계", "2단계", "3단계", "4단계", "5단계"], buttonCounts: 5 },
      { label: "브랜드", type: "dropdown", options: ["브랜드1", "브랜드2"], dropdownCounts: 1 },
      { label: "모델", type: "button" },
      { label: "생산연도", type: "button" },
      { label: "색상", type: "dropdown", options: ["Red", "Orange", "Yellow", "Green", "Blue", "Navy", "Violet", "White", "Black", "그 외"], dropdownCounts: 1 },
      { label: "가격", type: "" },
      { label: "특이사항 유무", type: "button", options: ["O", "X"], buttonCounts: 2 }
    ],
    "이펙터": [
      {}
    ],
    "앰프": [
      {}
    ],
    "베이스": [
      {}
    ],
    "어쿠스틱&클래식": [
      {}
    ],
    "음향장비": [],
    "합주실": [],
    "공연장": []
  }*/}

  // 이미지 변경 시 호출될 함수
  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  // 폼 제출 함수입니다. 여기서 새로운 악기 정보를 서버로 보내는 로직이 들어갑니다.
  const handleSubmit = (e) => {
    e.preventDefault();
    // 서버로 보낼 데이터 객체를 구성합니다.
    const instrumentData = {
      name: productName,
      description: description,
      category: selectedOption,
      image: selectedImage
    };

    // 여기서 생성 API를 호출합니다.
    axios.post('/api/instruments', instrumentData)
      .then(response => {
        console.log('Instrument Registered:', response.data);
        // 등록 성공 후 작업, 예: 사용자를 악기 목록 페이지로 리다이렉트
      })
      .catch(error => {
        console.error('Error registering instrument:', error);
      });
  };

  return (
    <div>
      <NavBar />
      <div>
        <form onSubmit={handleSubmit}>
          {/* 악기 이름 입력 칸 */}
          <div style={{ textAlign: 'left', marginLeft: '70px', marginTop: '30px' }}>
            <input type="text" id="name" value={productName} onChange={handleNameChange}
              placeholder="악기 이름" // 사용자가 입력을 시작할 때 가이드를 제공
              style={{ borderRadius: '5px', minWidth: '1000px', padding: '10px', marginRight: '40px' }} />
            {/* 드롭다운 */}
            <DropdownMenu
              options={['이펙터', '앰프', '베이스', '어쿠스틱&클래식', '음향장비', '합주실', '공연장']}
              onSelect={handleDropdownSelect}
              defaultOptionText="일렉기타"
            />
          </div>
          {/* 필수사항 */}
          <div style={{ margin: '15px' }}>
            <p style={{ textAlign: 'left', marginLeft: '55px' }}>필수사항 : 전면샷 / 후면전체 샷 / 픽업 & 브릿지 / 덴트(흠집있는 부분들) / 특이사항 부분들 (넥 문제 , 배선 문제, 녹이 슮 등)</p>
          </div>
          {/* 이미지 업로드 */}
          <div style={{ textAlign: 'left', marginLeft: '70px', marginTop: '30px' }}>
            <UploadPhoto onImagesChange={handleImageChange} />
          </div>
          <div style={{ textAlign: 'left', marginLeft: '50px' }}>
            <p style={{ margin: '20px' }}>사진 용량은 최대 10MB까지만 가능합니다.</p>
          </div>
          {/* 필수 입력 사항 */}
          <div style={{ textAlign: 'left', marginLeft: '60px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px', marginTop: '40px' }}>필수 입력 사항</p>
            <p style={{ marginLeft: '20px' }}>매물의 정보를 정확하게 사실만 입력해주세요.</p>
            <div style={{ marginLeft: '20px' }}>
             {/* {
                inputRequirements[selectedOption].map((requirement, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <p style={{ fontSize: '20px', marginTop: '15px', marginRight: '10px' }}>{requirement.label}</p>
                    {requirement.type === "button" && Array.from({ length: requirement.buttonCounts }, (_, i) => (
                      <button key={i}>{requirement.options[i]}</button>
                    ))}
                    {requirement.type === "dropdown" && Array.from({ length: requirement.dropdownCounts }, (_, i) => (
                        <select key={i}>
                            {requirement.options.map((option, optionIndex) => (
                                <option key={optionIndex}>{option}</option>
                            ))}
                        </select>
                    ))}

                  </div>  
                ))
              } */}
              <ElectricGuitar/>
              <Amp/>
            </div>
          </div>
          {/* 상세 정보 입력 칸 */}
          <div style={{ textAlign: 'left', marginLeft: '70px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '30px' }}>특이사항 및 상세 설명</p>
            <p>추가적으로 기입해야 할 정보, 참고사항, 유의할 점 등 구매자가 알아야할 정보들을 기입해주세요.</p>
            <textarea id="description" value={description} onChange={handleDescriptionChange}
              placeholder="악기에 대한 상세 설명을 입력하세요."
              style={{ borderRadius: '5px', minWidth: '1380px', minHeight: '450px', padding: '10px', marginRight: '40px' }} />
          </div>
          {/* 등록 버튼 */}
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

export default InstrumentUpload
