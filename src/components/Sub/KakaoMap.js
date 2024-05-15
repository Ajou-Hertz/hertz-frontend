/*global kakao*/ 
import React, {useEffect} from 'react'

const KakaoMap = ({ latitude, longitude }) => {
  useEffect(() => {
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(latitude, longitude), // (지도의 중심좌표) 받아온 위도와 경도 값을 중심좌표로 설정
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
  
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  
    // 마커 위치를 지정합니다
    var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
  
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  
    // 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null); 
  }, [latitude, longitude]);
  
  return (
    <div>
      <div id="map" style={{ marginLeft: '15px', width: '200px', height: '150px' }}></div>
    </div>
  )
}

export default KakaoMap