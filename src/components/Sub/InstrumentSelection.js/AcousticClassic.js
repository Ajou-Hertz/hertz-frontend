import React, { useState, useEffect }  from 'react'
import axios from '../../../api/axios';
import PopupButton from '../PopupButton';

const Button = ({ label, isSelected, onClick }) => {
  return (
    <button style={{ backgroundColor: isSelected ? '#D6E0F3' : 'white', borderRadius: '3px', 
      width: '100px', height: '40px', border: '1px solid black' }} onClick={onClick}>
      {label}
    </button>
  );
};

const AcousticClassic = () => {  
  const [Sido,setSido] = useState();
  const [selectedState, setSelectedState] = useState(null); // 악기 상태 선택을 위한 상태
  const [selectedBrandType, setSelectedBrandType] = useState('국내'); // '국내' 또는 '국외'를 저장할 상태 (국내가 디폴트)
  const [selectedBrand, setSelectedBrand] = useState(''); // 브랜드 국내,국외 선택을 위한 상태
  const [price, setPrice] = useState(''); // 가격을 위한 상태
  const [selectedFeature, setSelectedFeature] = useState(null); // 특이사항 유무를 위한 상태
  const [hashtags, setHashtags] = useState(['']); // 해시태그 상태 추가

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


  // 악기 상태를 위한 핸들러
  const handleButtonClick = (state) => {
      setSelectedState(state);
  };

  // 국내 및 국외 브랜드
  const brands = {
    국내: ["프레이튼", "크래프터", "고퍼우드", "헥스", "벤티볼리오", "파크우드", "오렌지우드", "콜트", "그 외"],
    국외: ["Martin", "Taylor", "Gibson", "Seagull", "Eastman", "Sigma", "Yamaha", "Lava", "그 외"]
  };
  // 브랜드 타입(국내/국외) 변경 핸들러
  const handleBrandTypeChange = (event) => {
    setSelectedBrandType(event.target.value);
    setSelectedBrand(''); // 브랜드 타입이 변경될 때 모델 선택을 초기화
  };
  // 국내/국외 선택에 따른 브랜드 변경 핸들러
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  // 가격 입력 핸들러
  const handlePrice = (event) => {
    // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
    const inputPrice = event.target.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자를 제거합니다.
    setPrice(inputPrice/*+ '원'*/);
  };

  // 특이사항 유무를 위한 핸들러
  const handleFeatureButtonClick = (feature) => {
    setSelectedFeature(feature);
  };

  // 해시태그 입력 핸들러
  const handleHashtagChange = (event, index) => {
    const value = event.target.value.startsWith('#') ? event.target.value : `#${event.target.value}`;
    const newHashtags = [...hashtags];
    newHashtags[index] = value.slice(0, 11); // '#' 포함 최대 11자
    setHashtags(newHashtags);
  };  

  // 해시태그 추가 핸들러
  const handleAddHashtag = () => {
    if (hashtags.length < 5) { // 해시태그 최대 5개 제한
      setHashtags([...hashtags, '#']); // 새 해시태그 기본값으로 '#' 설정
    }
  };  

    // 해시태그 삭제 핸들러
  const handleRemoveHashtag = (index) => {
    const newHashtags = hashtags.filter((_, i) => i !== index);
    setHashtags(newHashtags);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        {/* 거래지역 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>거래 지역</p>
        </div>
        {/* 악기상태 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>악기 상태</p>
        </div>
        {/* 브랜드 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>브랜드</p>
        </div>
        {/* 모델 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>모델</p>
        </div>
        {/* 목재 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>목재</p>
        </div>
        {/* 픽업 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>픽업</p>
        </div>
        {/* 가격 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>가격</p>
        </div>
        {/* 특이사항 유무 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>특이사항 유무</p>
        </div>
        {/* 해시태그 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>해시태그(선택)</p>
        </div>
      </div>


      {/* 옵션들 */}
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '200px' }}>
        {/* 거래지역 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <select style={{ width: '100px', height: '40px', borderRadius: '3px' }}>
            {Sido && Sido.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select style={{ width: '100px', height: '40px', borderRadius: '3px' }}>
            {Sido && Sido.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select style={{ width: '100px', height: '40px', borderRadius: '3px' }}>
            {Sido && Sido.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
        {/* 악기상태 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <Button
            label="1단계"
            isSelected={selectedState === '1단계'}
            onClick={() => handleButtonClick('1단계')}
          />
          <Button
            label="2단계"
            isSelected={selectedState === '2단계'}
            onClick={() => handleButtonClick('2단계')}
          />
          <Button
            label="3단계"
            isSelected={selectedState === '3단계'}
            onClick={() => handleButtonClick('3단계')}
          />
          <Button
            label="4단계"
            isSelected={selectedState === '4단계'}
            onClick={() => handleButtonClick('4단계')}
          />
          <Button
            label="5단계"
            isSelected={selectedState === '5단계'}
            onClick={() => handleButtonClick('5단계')}
          />
          <div style={{ marginTop: '10px', marginLeft: '20px' }}>
            <PopupButton onClick={openPopup} isPopupOpen={isPopupOpen} closePopup={closePopup} popupData={popupData} />
          </div>
        </div>
        {/* 브랜드 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          {/* 브랜드 드롭다운 */}
          <select value={selectedBrandType} onChange={handleBrandTypeChange} style={{ height: '40px', borderRadius: '3px' }}>
            <option value="국내">국내</option>
            <option value="국외">국외</option>
          </select>
          {/* 국내/국외 선택에 따른 드롭다운 */}
          <select value={selectedBrand} onChange={handleBrandChange} style={{ height: '40px', borderRadius: '3px', marginLeft: '10px' }}>
            <option value="">브랜드 선택</option>
            {brands[selectedBrandType].map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        {/* 모델 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <select style={{ height: '40px', borderRadius: '3px' }}>
            <option>드래드넛</option>
            <option>컷어웨이</option>
            <option>점보바디</option>
            <option>슬림바디</option>
            <option>팔러바디</option>
            <option>OM바디</option>
          </select>
        </div>
        {/* 목재 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <select style={{ height: '40px', borderRadius: '3px' }}>
            <option>합판</option>
            <option>원목</option>
            <option>합판 & 원목</option>
          </select>
        </div>
        {/* 픽업 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <select style={{ height: '40px', borderRadius: '3px' }}>
            <option>진동감지형</option>
            <option>마그네틱</option>
            <option>마이크</option>
          </select>
        </div>
        {/* 가격입력칸 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <input
            type="text" value={price} onChange={handlePrice} 
            placeholder="숫자만 기입해주세요"
            style={{ width: '200px', height: '40px', borderRadius: '3px',
              border: '1px solid black', padding: '10px' }}
          />
          <span style={{ margin: '10px' }}>원</span>
        </div>
        {/* 특이사항 유무 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <Button
            label="O"
            isSelected={selectedFeature  === 'O'}
            onClick={() => handleFeatureButtonClick('O')}
          />
          <Button
            label="X"
            isSelected={selectedFeature  === 'X'}
            onClick={() => handleFeatureButtonClick('X')}
          />
          <p style={{ margin: '5px', marginLeft: '10px' }}>특이사항에 대한 상세 내용은 본문에 기입해주세요</p>
        </div>
        {/* 해시태그 입력칸 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          {hashtags.map((hashtag, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
              <input
                type="text"
                value={hashtag}
                onChange={(event) => handleHashtagChange(event, index)}
                placeholder="해시태그 입력"
                style={{width: '170px', height: '40px', borderRadius: '3px', border: '1px solid black' }}
              />
              <button onClick={() => handleRemoveHashtag(index)} style={{ height: '40px', width: '25px', marginLeft: '5px' }}>-</button>
            </div>
          ))}
          {hashtags.length < 5 && (
            <button onClick={handleAddHashtag} style={{ height: '40px' }}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AcousticClassic;
