// import React, { useState, useEffect } from "react";
// import axios, { axiosPrivate } from "../../../api/axios";
// import PopupButton from "../PopupButton";

// const Button = ({ label, isSelected, onClick }) => {
//     return (
//         <button
//             style={{
//                 backgroundColor: isSelected ? "#D6E0F3" : "white",
//                 borderRadius: "3px",
//                 width: "100px",
//                 height: "40px",
//                 border: "1px solid black",
//             }}
//             // 새로고침 방지
//             onClick={(event) => {
//                 event.preventDefault();
//                 onClick();
//             }}
//         >
//             {label}
//         </button>
//     );
// };

// const EnsembleRoom = ({  }) => {
//     // const [Sido, setSido] = useState([]); // 거래지역 상태
//     // const [Sgg, setSgg] = useState([]); // 시군구 상태 추가
//     // const [Emd, setEmd] = useState([]); // 읍면동 상태 추가
//     // const [selectedSido, setSelectedSido] = useState(""); // 선택된 거래지역 상태 추가
//     // const [selectedSgg, setSelectedSgg] = useState(""); // 선택된 시군구 상태 추가
//     // const [selectedEmd, setSelectedEmd] = useState(""); // 선택된 읍면동 상태 추가
//     const [selectedEquipment, setSelectedEquipment] = useState(null); // 음향장비 유무를 위한 상태
//     const [selectedInstrument, setSelectedInstrument] = useState(null); // 악기 유무를 위한 상태
//     const [productionYear, setProductionYear] = useState(""); // 생산연도 상태
//     const [selectedCapacity, setSelectedCapacity] = useState(""); // 수용인원 상태
//     const [selectedSize, setSelectedSize] = useState(""); // 사이즈 상태
//     const [price, setPrice] = useState(""); // 가격을 위한 상태
//     const [selectedFeature, setSelectedFeature] = useState(null); // 주차 가능 여부를 위한 상태
//     const [hashtags, setHashtags] = useState([""]); // 해시태그 상태 추가

//     // 시도 get api
//     useEffect(() => {
//         try {
//             axios
//                 .get("/administrative-areas/sido", {
//                     headers: {
//                         "Hertz-API-Version": 1,
//                     },
//                 })
//                 .then((response) => {
//                     if (response.status === 200) {
//                         const sidoArray = response.data.content.map(
//                             (item) => item.name
//                         );
//                         setSido(sidoArray);
//                     } else {
//                         console.error("시도 목록을 불러오는데 실패했습니다.");
//                     }
//                 })
//                 .catch((error) => {
//                     console.error(
//                         "시도 목록 요청 중 오류가 발생했습니다:",
//                         error
//                     );
//                 });
//         } catch (error) {
//             console.error("시도 목록 요청 중 오류가 발생했습니다:", error);
//         }
//     }, []);

//     // 시도 선택 핸들러
//     const handleSidoChange = (event) => {
//         const selectedSidoName = event.target.value; // 선택된 시도의 이름
//         const selectedIndex = Sido.findIndex(
//             (item) => item === selectedSidoName
//         ); // 선택된 시도의 인덱스
//         if (selectedIndex !== -1) {
//             const selectedSidoId = selectedIndex + 1; // 선택된 시도의 인덱스 + 1을 ID로 사용
//             setSelectedSido(selectedSidoName);
//             // 선택된 시도에 해당하는 시군구 목록을 불러오기 위해 api 호출
//             axios
//                 .get(`/administrative-areas/sgg?sidoId=${selectedSidoId}`, {
//                     headers: {
//                         "Hertz-API-Version": 1,
//                     },
//                 })
//                 .then((response) => {
//                     if (response.status === 200) {
//                         const sggArray = response.data.content.map((item) => ({
//                             id: item.id,
//                             name: item.name,
//                         }));
//                         setSgg(sggArray);
//                     } else {
//                         console.error("시군구 목록을 불러오는데 실패했습니다.");
//                     }
//                 })
//                 .catch((error) => {
//                     console.error(
//                         "시군구 목록 요청 중 오류가 발생했습니다:",
//                         error
//                     );
//                 });
//         } else {
//             console.error("선택된 시도를 찾을 수 없습니다.");
//         }
//     };

//     // 시군구 선택 핸들러
//     const handleSggChange = (event) => {
//         const selectedIndex = event.target.value; // 선택된 시도의 index
//         if (selectedIndex !== -1) {
//             // 선택된 시도에 해당하는 시군구 목록을 불러오기 위해 api 호출
//             axios
//                 .get(`/administrative-areas/emd?sggId=${selectedIndex}`, {
//                     headers: {
//                         "Hertz-API-Version": 1,
//                     },
//                 })
//                 .then((response) => {
//                     if (response.status === 200) {
//                         const emdArray = response.data.content.map((item) => ({
//                             id: item.id,
//                             name: item.name,
//                         }));
//                         setEmd(emdArray);
//                         const selectedSggName = Sgg.find(
//                             (item) => item.id === parseInt(selectedIndex)
//                         )?.name; // 선택된 시군구의 name 값
//                         setSelectedSgg(selectedSggName); // 선택된 시군구 이름 설정
//                     } else {
//                         console.error("읍면동 목록을 불러오는데 실패했습니다.");
//                     }
//                 })
//                 .catch((error) => {
//                     console.error(
//                         "읍면동 목록 요청 중 오류가 발생했습니다:",
//                         error
//                     );
//                 });
//         } else {
//             console.error("선택된 읍면동을 찾을 수 없습니다.");
//         }
//     };

//     //음향장비 유무를 위한 핸들러
//     const handleEquipmentButtonClick = (state) => {
//         setSelectedEquipment(state);
//     };

//     //악기 유무를 위한 핸들러
//     const handleInstrumentButtonClick = (state) => {
//         setSelectedInstrument(state);
//     };

//     // 수용인원 입력 핸들러
//     const handleProductionYear = (event) => {
//         // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
//         const inputProductionYear = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
//         setProductionYear(inputProductionYear);
//     };

//     // 가격 입력 핸들러
//     const handlePrice = (event) => {
//         // 사용자가 입력한 값에서 숫자가 아닌 문자를 모두 제거
//         const inputPrice = event.target.value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자를 제거합니다.
//         setPrice(inputPrice /*+ '원'*/);
//     };

//     // 특이사항 유무를 위한 핸들러
//     const handleFeatureButtonClick = (feature) => {
//         setSelectedFeature(feature);
//     };

//     // 해시태그 입력 핸들러
//     const handleHashtagChange = (event, index) => {
//         const value = event.target.value.startsWith("#")
//             ? event.target.value
//             : `#${event.target.value}`;
//         const newHashtags = [...hashtags];
//         newHashtags[index] = value.slice(0, 11); // '#' 포함 최대 11자
//         setHashtags(newHashtags);
//     };

//     // 해시태그 추가 핸들러
//     const handleAddHashtag = () => {
//         if (hashtags.length < 5) {
//             // 해시태그 최대 5개 제한
//             setHashtags([...hashtags, "#"]); // 새 해시태그 기본값으로 '#' 설정
//         }
//     };

//     // 해시태그 삭제 핸들러
//     const handleRemoveHashtag = (index) => {
//         const newHashtags = hashtags.filter((_, i) => i !== index);
//         setHashtags(newHashtags);
//     };

//     const updateData = () => {
//         const guitarData = {
//             brand: selectedBrand,
//             model: selectedModel,
//             productionYear: productionYear,
//             color: selectedColor,
//             selectedState: selectedState,
//             price: price,
//             selectedFeature: selectedFeature,
//             hashtags: hashtags,
//         };
//         // 선택한 시도, 시군구, 읍면동 값을 guitarData 객체에 추가
//         guitarData.tradeAddress = {
//             sido: selectedSido,
//             sgg: selectedSgg,
//             emd: selectedEmd,
//         };
//         updateGuitarData(guitarData);
//     };

//     useEffect(() => {
//         updateData();
//     }, [
//         selectedBrand,
//         selectedModel,
//         productionYear,
//         selectedColor,
//         selectedState,
//         price,
//         selectedFeature,
//         hashtags,
//     ]);

//     return (
//         <div style={{ display: "flex", flexDirection: "row" }}>
//             <div>
//                 {/* 거래지역 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "20px",
//                     }}
//                 >
//                     <p style={{ fontSize: "20px" }}>거래 지역</p>
//                 </div>
//                 {/* 음향장비 유무 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "20px",
//                     }}
//                 >
//                     <p style={{ fontSize: "20px" }}>음향장비 여부</p>
//                 </div>
//                 {/* 악기 여부 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "20px",
//                     }}
//                 >
//                     <p style={{ fontSize: "20px" }}>악기 여부</p>
//                 </div>
//                 {/* 생산연도 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "20px",
//                     }}
//                 >
//                     <p style={{ fontSize: "20px" }}>생산 연도</p>
//                 </div>
//                 {/* 가격 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "20px",
//                     }}
//                 >
//                     <p style={{ fontSize: "20px" }}>가격</p>
//                 </div>
//                 {/* 특이사항 유무 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "20px",
//                     }}
//                 >
//                     <p style={{ fontSize: "20px" }}>특이사항 유무</p>
//                 </div>
//                 {/* 해시태그 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "20px",
//                     }}
//                 >
//                     <p style={{ fontSize: "20px" }}>해시태그(선택)</p>
//                 </div>
//             </div>

//             {/* 옵션들 */}
//             <div
//                 style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     marginLeft: "200px",
//                 }}
//             >
//                 {/* 거래지역 드롭다운 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "20px",
//                     }}
//                 >
//                     <select
//                         style={{
//                             width: "100px",
//                             height: "40px",
//                             borderRadius: "3px",
//                         }}
//                         onChange={(event) => handleSidoChange(event)}
//                     >
//                         <option value="">시도 선택</option>
//                         {Sido &&
//                             Sido.map((item, index) => (
//                                 <option key={index}>{item}</option>
//                             ))}
//                     </select>
//                     {/* 시군구 드롭다운 */}
//                     <select
//                         style={{
//                             width: "100px",
//                             height: "40px",
//                             borderRadius: "3px",
//                         }}
//                         onChange={(event) => handleSggChange(event)}
//                     >
//                         <option value="">시군구 선택</option>
//                         {Sgg &&
//                             Sgg.map((item) => (
//                                 <option key={item.name} value={item.id}>
//                                     {item.name}
//                                 </option>
//                             ))}
//                     </select>
//                     {/* 읍면동 드롭다운 */}
//                     <select
//                         style={{
//                             width: "100px",
//                             height: "40px",
//                             borderRadius: "3px",
//                         }}
//                         onChange={(event) => setSelectedEmd(event.target.value)}
//                     >
//                         <option value="">읍면동 선택</option>
//                         {Emd &&
//                             Emd.map((item) => (
//                                 <option key={item.id} value={item.name}>
//                                     {item.name}
//                                 </option>
//                             ))}
//                     </select>
//                 </div>
//                 {/* 음향 장비 유무 버튼 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "25px",
//                     }}
//                 >
//                     <Button
//                         label="O"
//                         isSelected={selectedEquipment === true}
//                         onClick={() => handleEquipmentButtonClick(true)}
//                     />
//                     <Button
//                         label="X"
//                         isSelected={selectedEquipment === false}
//                         onClick={() => handleEquipmentButtonClick(false)}
//                     />
//                 </div>
//                 {/* 악기 유무 버튼 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "25px",
//                     }}
//                 >
//                     <Button
//                         label="O"
//                         isSelected={selectedInstrument === true}
//                         onClick={() => handleInstrumentButtonClick(true)}
//                     />
//                     <Button
//                         label="X"
//                         isSelected={selectedInstrument === false}
//                         onClick={() => handleInstrumentButtonClick(false)}
//                     />
//                 </div>
//                 {/* 생산연도 입력칸 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "25px",
//                     }}
//                 >
//                     <input
//                         type="text"
//                         value={productionYear}
//                         onChange={handleProductionYear}
//                         placeholder="숫자만 기입해주세요"
//                         style={{
//                             width: "500px",
//                             height: "40px",
//                             padding: "10px",
//                             borderRadius: "3px",
//                             border: "1px solid black",
//                         }}
//                     />
//                 </div>
//                 {/* 색상 드롭다운 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "25px",
//                     }}
//                 >
//                     <select
//                         style={{ height: "40px", borderRadius: "3px" }}
//                         onChange={(event) =>
//                             setSelectedColor(event.target.value)
//                         }
//                     >
//                         <option value="RED">Red</option>
//                         <option value="ORANGE">Orange</option>
//                         <option value="YELLOW">Yellow</option>
//                         <option value="GREEN">Green</option>
//                         <option value="BLUE">Blue</option>
//                         <option value="NAVY">Navy</option>
//                         <option value="VIOLET">Violet</option>
//                         <option value="WHITE">White</option>
//                         <option value="BLACK">Black</option>
//                         <option value="ETC">그 외</option>
//                     </select>
//                 </div>
//                 {/* 가격입력칸 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "25px",
//                     }}
//                 >
//                     <input
//                         type="text"
//                         value={price}
//                         onChange={handlePrice}
//                         placeholder="숫자만 기입해주세요"
//                         style={{
//                             width: "200px",
//                             height: "40px",
//                             borderRadius: "3px",
//                             border: "1px solid black",
//                             padding: "10px",
//                         }}
//                     />
//                     <span style={{ margin: "10px" }}>원</span>
//                 </div>
//                 {/* 특이사항 유무 버튼 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "25px",
//                     }}
//                 >
//                     <Button
//                         label="O"
//                         isSelected={selectedFeature === true}
//                         onClick={() => handleFeatureButtonClick(true)}
//                     />
//                     <Button
//                         label="X"
//                         isSelected={selectedFeature === false}
//                         onClick={() => handleFeatureButtonClick(false)}
//                     />
//                     <p style={{ margin: "5px", marginLeft: "10px" }}>
//                         특이사항에 대한 상세 내용은 본문에 기입해주세요
//                     </p>
//                 </div>
//                 {/* 해시태그 입력칸 */}
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         marginTop: "25px",
//                     }}
//                 >
//                     {hashtags.map((hashtag, index) => (
//                         <div
//                             key={index}
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 marginRight: "5px",
//                             }}
//                         >
//                             <input
//                                 type="text"
//                                 value={hashtag}
//                                 onChange={(event) =>
//                                     handleHashtagChange(event, index)
//                                 }
//                                 placeholder="해시태그 입력"
//                                 style={{
//                                     width: "170px",
//                                     height: "40px",
//                                     borderRadius: "3px",
//                                     border: "1px solid black",
//                                 }}
//                             />
//                             <button
//                                 onClick={() => handleRemoveHashtag(index)}
//                                 style={{
//                                     height: "40px",
//                                     width: "25px",
//                                     marginLeft: "5px",
//                                 }}
//                             >
//                                 -
//                             </button>
//                         </div>
//                     ))}
//                     {hashtags.length < 5 && (
//                         <button
//                             type="button" // 새로고침 방지
//                             onClick={handleAddHashtag}
//                             style={{ height: "40px" }}
//                         >
//                             +
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EnsembleRoom;
