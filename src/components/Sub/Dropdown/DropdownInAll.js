import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

const DropdownInAll = () => {
    // options 배열
    const options = ['판매중', '판매완료', '예약중'];
  
    // 선택된 옵션을 추적하는 상태 및 처리 함수
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleSelect = (selectedValue) => {
      setSelectedOption(selectedValue);
      // 선택한 옵션에 대한 추가 로직 수행 가능
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* DropdownMenu 컴포넌트 렌더링 */}
        <DropdownMenu
          options={options} onSelect={handleSelect} defaultOptionText="전체" />
      </div>
    );
  };
  
  export default DropdownInAll;