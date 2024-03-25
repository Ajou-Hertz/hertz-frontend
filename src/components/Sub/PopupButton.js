import React from 'react';

const PopupButton = ({ onClick, isPopupOpen, closePopup, popupData }) => {
  return (
    <div>
      <button onClick={onClick} style={{ backgroundColor: '#D6E0F3', border: 'none', borderRadius: '3px' }}>단계설명 확인하기</button>
      {isPopupOpen && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 999 }}>
          <button style={{ float: 'right', background: 'none', border: 'none' }} onClick={closePopup}>X</button>
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <p style={{ border: '3px solid black', padding: '10px', fontSize: '20px' }}>헤르츠 악기 상태 기준표</p>
          </div>
          <table style={{ border: '3px solid black', padding: '10px' }}>
            <tbody>
              {popupData.map(item => (
                <tr key={item.label} style={{ border: '3px solid black', padding: '10px' }}>
                  <td style={{ border: '3px solid black', padding: '10px', background: '#D6E0F3' }}>{item.label}</td>
                  <td style={{ border: '3px solid black', padding: '10px', textAlign: 'left' }}>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PopupButton;
