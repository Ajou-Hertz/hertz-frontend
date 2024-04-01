import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from '../../../components/Sub/NavBar';
import DropdownMenu from '../../../components/Sub/Dropdown/DropdownMenu';
import UploadPhoto from '../../../components/Sub/UploadPhoto';
import ElectricGuitar from '../../../components/Sub/InstrumentSelection.js/ElectricGuitar';
import Effector from '../../../components/Sub/InstrumentSelection.js/Effector';
import Amp from '../../../components/Sub/InstrumentSelection.js/Amp';
import Bass from '../../../components/Sub/InstrumentSelection.js/Bass';
import AcousticClassic from '../../../components/Sub/InstrumentSelection.js/AcousticClassic';
import Equipement from '../../../components/Sub/InstrumentSelection.js/Equipement';

const InstrumentUpload = () => {
  // 매물 정보 상태를 관리합니다. 여기서는 초기값이 비어있거나 기본값을 가질 수 있습니다.
  const [productName, setProductName] = useState(''); // 매물 이름
  const [description, setDescription] = useState(''); // 상세 정보 입력

  const [selectedOption, setSelectedOption] = useState('일렉기타'); // 드롭다운 초기 선택값

  const [selectedImage, setSelectedImage] = useState([]); // 선택한 이미지 상태

  const [electricGuitarData, setElectricGuitarData] = useState(null); // 일렉기타 컴포넌트에서 받아온 정보 상태
  // const [effectorData, setEffectorData] = useState(null); // 이펙터 컴포넌트에서 받아온 정보 상태
  // const [ampData, setAmprData] = useState(null); // 앰프 컴포넌트에서 받아온 정보 상태
  // const [bassData, setBassData] = useState(null); // 베이스 컴포넌트에서 받아온 정보 상태
  // const [aCData, setACData] = useState(null); // 어쿠스틱클래식 컴포넌트에서 받아온 정보 상태
  // const [equipementData, setEquipementData] = useState(null); // 음향장비 컴포넌트에서 받아온 정보 상태
  

  // 입력 필드의 값이 변경될 때마다 상태를 업데이트하는 함수
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

  // 드롭다운 메뉴 옵션과 컴포넌트 매핑
  const componentMapping = {
    '일렉기타': ElectricGuitar,
    '이펙터': Effector,
    '앰프': Amp,
    '베이스': Bass,
    '어쿠스틱&클래식': AcousticClassic,
    '음향장비': Equipement,
  };

  // 선택된 옵션에 따라 렌더링할 컴포넌트 결정
  const SelectedComponent = componentMapping[selectedOption];

  // 이미지 변경 시 호출될 함수
  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  // ElectricGuitar 컴포넌트로부터 받은 데이터를 처리하는 함수
  const handleElectricGuitarData = (data) => {
    setElectricGuitarData(data);
    console.log("일렉기타 정보 받기 성공!");
  };

  // 폼 제출 함수입니다. 여기서 새로운 악기 정보를 서버로 보내는 로직이 들어가야함
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 서버로 보낼 데이터 객체
    const instrumentData = {
      brand: electricGuitarData.brand,
      model: electricGuitarData.model, 
      productionYear: electricGuitarData.productionYear,
      color: electricGuitarData.color,
      title: productName,
      progressStatus: 'Selling', // Use the selected progress status
      tradeAddress: {
        sido: '서울특별시',
        sgg: '강남구',
        emd: '청담동'
      },
      qualityStatus: electricGuitarData.selectedState,
      price: electricGuitarData.price,
      hasAnomaly: electricGuitarData.selectedFeature,
      description: description,
      images: selectedImage,
      hashtags: electricGuitarData.hashtags
    };

    try {
      const response = await axios.post('/instruments/electric-guitars', instrumentData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Hertz-API-Version': 1
        }
      });
      console.log("매물 등록 성공",response.data); // Assuming you want to log the response data
      // Reset form fields or do any additional logic after successful submission
    } catch (error) {
      console.error('Error submitting instrument data:', error);
      // Handle error state or display error message to the user
    }
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
              style={{ borderRadius: '5px', minWidth: '1000px', padding: '10px', marginRight: '40px', border: '1px solid black' }} />
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
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px', marginTop: '40px' }}>필수 입력 사항</p>
              <div style={{ marginTop: '40px', marginRight: '70px' }}>
                <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '3px' }}>판매중</button>
                <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '3px' }}>예약중</button>
                <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '3px' }}>판매완료</button>
              </div>
            </div>
            <p style={{ marginLeft: '10px' }}>매물의 정보를 정확하게 사실만 입력해주세요.</p>
            <div style={{ marginLeft: '20px' }}>
              {/* {SelectedComponent && <SelectedComponent />}
              <ElectricGuitar updateGuitarData={handleElectricGuitarData} /> */}
              {SelectedComponent && <SelectedComponent updateGuitarData={handleElectricGuitarData} />}
            </div>
          </div>
          {/* 상세 정보 입력 칸 */}
          <div style={{ textAlign: 'left', marginLeft: '70px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '40px' }}>특이사항 및 상세 설명</p>
            <p>추가적으로 기입해야 할 정보, 참고사항, 유의할 점 등 구매자가 알아야할 정보들을 기입해주세요.</p>
            <textarea id="description" value={description} onChange={handleDescriptionChange}
              placeholder="악기에 대한 상세 설명을 입력하세요."
              style={{ borderRadius: '5px', minWidth: '1380px', minHeight: '450px', padding: '10px', marginRight: '40px' }} />
          </div>
          {/* 등록 버튼 */}
          <div style={{ textAlign: 'right', margin: '30px 70px 30px 30px' }}>
            <button type="submit" onClick={handleSubmit}
              style={{ backgroundColor: '#D6E0F3', borderRadius: '5px', border: 'none',
                paddingRight: '15px', paddingLeft: '15px' }}>올리기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstrumentUpload
