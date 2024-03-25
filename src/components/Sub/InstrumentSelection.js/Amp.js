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

const Amp = () => {  
  const [Sido,setSido] = useState();
  const [selectedState, setSelectedState] = useState(null); // 악기 상태 선택을 위한 상태
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
    const newHashtags = [...hashtags];
    newHashtags[index] = event.target.value.slice(0, 10); // 글자 10자 제한
    setHashtags(newHashtags);
  };

  // 해시태그 추가 핸들러
  const handleAddHashtag = () => {
    if (hashtags.length < 5) { // 해시태그 최대 5개 제한
      setHashtags([...hashtags, '']);
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
        {/* 종류 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>종류</p>
        </div>
        {/* 브랜드 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>브랜드</p>
        </div>
        {/* 용도 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
          <p style={{ fontSize: '20px' }}>용도</p>
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
        {/* 종류 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <select style={{ height: '40px', borderRadius: '3px' }}>
            <option>기타</option>
            <option>베이스</option>
          </select>
        </div>
        {/* 브랜드 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <select style={{ height: '40px', borderRadius: '3px' }}>
            <option>Fender</option>
            <option>Marshall</option>
            <option>Vox</option>
            <option>Orange</option>
            <option>Mesa Boogie</option>
            <option>Peavey</option>
            <option>EVH</option>
            <option>Bogner</option>
            <option>Blackstar</option>
            <option>Yamaha</option>
            <option>그 외</option>
          </select>
        </div>
        {/* 용도 드롭다운 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px' }}>
          <select style={{ height: '40px', borderRadius: '3px' }}>
            <option>가정용</option>
            <option>공연용</option>
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

export default Amp;
