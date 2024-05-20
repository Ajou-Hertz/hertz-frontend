import React, { useState, useEffect } from "react";
import axios, { axiosPrivate } from "../../../api/axios";

import NavBar from "../../../components/Sub/NavBar";
import DropdownMenu from "../../../components/Sub/Dropdown/DropdownMenu";
import UploadPhoto from "../../../components/Sub/UploadPhoto";
import ElectricGuitar from "../../../components/Sub/InstrumentSelection.js/ElectricGuitar";
import Effector from "../../../components/Sub/InstrumentSelection.js/Effector";
import Amp from "../../../components/Sub/InstrumentSelection.js/Amp";
import Bass from "../../../components/Sub/InstrumentSelection.js/Bass";
import AcousticClassic from "../../../components/Sub/InstrumentSelection.js/AcousticClassic";
import Equipment from "../../../components/Sub/InstrumentSelection.js/Equipment";
import EnsembleRoom from "../../../components/Sub/InstrumentSelection.js/EnsembleRoom";

import useAuth from "../../../hooks/useAuth";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil";
import { useParams } from "react-router-dom";

const InstrumentModify = () => {
    // 매물 정보 상태를 관리. 실제로는 API 호출을 통해 초기값을 설정할 수 있습니다.
    const [selectedProductName, setSelectedProductName] =
        useState("기존 매물 이름");
    const [description, setDescription] = useState("기존 매물 설명");

    const [selectedOption, setSelectedOption] = useState("일렉기타"); // 드롭다운 선택 상태

    const [selectedImage, setSelectedImage] = useState([]); // 선택한 이미지 상태
    const [selectProgressStatus, setSelectProgressStatus] = useState("SELLING"); // 판매중 버튼 상태

    const [deletedImageIds, setDeletedImageIds] = useState([]); // 삭제한 이미지의 id 리스트
    const [newImages, setNewImages] = useState(""); // 새로 추가된 악기 이미지 리스트
    const [deletedHashtagIds, setDeletedHashtagIds] = useState(""); // 삭제한 해시태그의 id 리스트
    const [newdHashtags, setNewdHashtags] = useState(""); // 새로 추가된 해시태그 리스트

    const [electricGuitarData, setElectricGuitarData] = useState(""); // 일렉기타 컴포넌트에서 받아온 정보 상태
    const [effectorData, setEffectorData] = useState(""); // 이펙터 컴포넌트에서 받아온 정보 상태
    const [ampData, setAmpData] = useState(""); // 앰프 컴포넌트에서 받아온 정보 상태
    const [bassData, setBassData] = useState(""); // 베이스 컴포넌트에서 받아온 정보 상태
    const [aCData, setAcousticClassicData] = useState(""); // 어쿠스틱클래식 컴포넌트에서 받아온 정보 상태
    const [equipmentData, setEquipmentData] = useState(""); // 음향장비 컴포넌트에서 받아온 정보 상태
    // const [ensembleRoomData, setEnsembleRoomData] = useState(""); // 합주실 컴포넌트에서 받아온 정보 상태

    const { id } = useParams();
    const [user, setUser] = useRecoilState(userState);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        console.log(id);
        axios
            .get(`/instruments/${id}`, {
                headers: {
                    "Hertz-API-Version": 1,
                },
                params: {
                    instrumentId: id,
                },
            })
            .then((res) => {
                // setData(res.data);
                console.log(res);
                const images = res.data.images;
                const urls = images.map((image) => image.url);
                setImageUrls(urls);
                setSelectedProductName(res.data.title);
                setDescription(res.data.description);
                setSelectProgressStatus(res.data.progressStatus);
                setElectricGuitarData(res.data);
            })
            .catch(function (error) {
                console.log(error);
                alert("존재하지 않는 페이지 입니다.");
            });
    }, [id]);

    console.log("추출 상세설명: ", imageUrls);
    console.log("추출 상태 : ", electricGuitarData);
    // useEffect(() => {
    //   // 매물 정보를 불러오는 API 호출
    //   axios.get('/instruments/electric-guirars/{electricGuitarId}')
    //     .then(response => {
    //       // 응답으로 받은 매물 정보로 상태 업데이트
    //       setSelectedProductName(response.data.name);
    //       setDescription(response.data.description);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }, []);

    // 입력 필드의 값이 변경될 때마다 상태를 업데이트하는 함수입니다.
    const handleNameChange = (e) => {
        setSelectedProductName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        const inputValue = e.target.value;
        if (!containsLink(inputValue)) {
            setDescription(inputValue);
        } else {
            alert("링크를 포함한 텍스트는 입력할 수 없습니다.");
        }
    };

    // 드롭다운 선택을 처리하는 함수
    const handleDropdownSelect = (option) => {
        setSelectedOption(option); // 드롭다운 선택 값을 업데이트하지만, selectedProductName은 변경하지 않음
    };

    // 드롭다운 메뉴 옵션과 컴포넌트 매핑
    const componentMapping = {
        일렉기타: ElectricGuitar,
        이펙터: Effector,
        앰프: Amp,
        베이스: Bass,
        "어쿠스틱&클래식": AcousticClassic,
        음향장비: Equipment,
        합주실: EnsembleRoom,
    };

    // 선택된 옵션에 따라 렌더링할 컴포넌트 결정
    const SelectedComponent = componentMapping[selectedOption];

    // 이미지 변경 시 호출될 함수
    const handleImageChange = (image) => {
        setSelectedImage(image);
        console.log("선택한 이미지:", image);
    };

    // 이미지 삭제 시 호출될 함수
    const handleImageDelete = (deletedId) => {
        setDeletedImageIds((prevIds) => [...prevIds, deletedId]);
    };

    // 링크를 포함하는지 여부를 확인하는 함수
    const containsLink = (text) => {
        const linkPattern =
            /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/;
        return linkPattern.test(text);
    };

    // 폼 제출 함수입니다. 실제로는 여기서 수정된 정보를 서버로 보내는 로직이 필요합니다.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !selectedProductName ||
            !selectProgressStatus ||
            // !electricGuitarData ||
            !description ||
            !selectedImage.length
        ) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        try {
            const Data = new FormData();

            // 공통적으로 필요한 데이터 추가
            Data.append("title", selectedProductName);
            Data.append("progressStatus", selectProgressStatus);
            Data.append("description", description);

            // 선택된 옵션에 따라 필요한 데이터 추가
            switch (selectedOption) {
                case "일렉기타":
                    // 추가적으로 필요한 데이터 추가
                    Data.append("brand", electricGuitarData.brand);
                    Data.append("model", electricGuitarData.model);
                    Data.append("productionYear", electricGuitarData.productionYear);
                    Data.append("color", electricGuitarData.color);
                    Data.append("tradeAddress.sido", electricGuitarData.tradeAddress.sido);
                    Data.append("tradeAddress.sgg", electricGuitarData.tradeAddress.sgg);
                    Data.append("tradeAddress.emd", electricGuitarData.tradeAddress.emd);
                    Data.append("qualityStatus", electricGuitarData.selectedState);
                    Data.append("price", electricGuitarData.price);
                    Data.append("hasAnomaly", electricGuitarData.selectedFeature);

                    // 해시태그 추가
                    for (const hashtag of electricGuitarData.hashtags) {
                        Data.append("newHashtags[]", hashtag);
                    }

                    // 엔드포인트 설정
                    //var endpoint = `/instruments/electric-guitars/${id}`
                    break;
                case "이펙터":
                    // 이펙터 데이터 추가
                    Data.append("feature", effectorData.selectedFunction);
                    Data.append("type", effectorData.selectedType);
                    Data.append("tradeAddress.sido", effectorData.tradeAddress.sido);
                    Data.append("tradeAddress.sgg", effectorData.tradeAddress.sgg);
                    Data.append("tradeAddress.emd", effectorData.tradeAddress.emd);
                    Data.append("qualityStatus", effectorData.selectedState);
                    Data.append("price", effectorData.price);
                    Data.append("hasAnomaly", effectorData.selectedFeature);
  
                    // 해시태그 추가
                    for (const hashtag of effectorData.hashtags) {
                        Data.append("hashtags[]", hashtag);
                    }
  
                    // 엔드포인트 설정
                    var endpoint = "/instruments/effectors";
                    break;
                case "앰프":
                    // 앰프 데이터 추가
                    Data.append("brand", ampData.brand);
                    Data.append("type", ampData.type);
                    Data.append("usage", ampData.usage);
                    Data.append("tradeAddress.sido", ampData.tradeAddress.sido);
                    Data.append("tradeAddress.sgg", ampData.tradeAddress.sgg);
                    Data.append("tradeAddress.emd", ampData.tradeAddress.emd);
                    Data.append("qualityStatus", ampData.selectedState);
                    Data.append("price", ampData.price);
                    Data.append("hasAnomaly", ampData.selectedFeature);

                    // 해시태그 추가
                    for (const hashtag of ampData.hashtags) {
                        Data.append("hashtags[]", hashtag);
                    }

                    // 엔드포인트 설정
                    var endpoint = "/instruments/amplifiers";
                    break;
                case "베이스":
                    Data.append("brand", bassData.brand);
                    Data.append("pickUp", bassData.pickUp);
                    Data.append("preAmplifier", bassData.preAmplifier);
                    Data.append("color", bassData.color);
                    Data.append("tradeAddress.sido",bassData.tradeAddress.sido);
                    Data.append("tradeAddress.sgg", bassData.tradeAddress.sgg);
                    Data.append("tradeAddress.emd", bassData.tradeAddress.emd);
                    Data.append("qualityStatus", bassData.selectedState);
                    Data.append("price", bassData.price);
                    Data.append("hasAnomaly", bassData.selectedFeature);

                    // 해시태그 추가
                    for (const hashtag of bassData.hashtags) {
                        Data.append("hashtags[]", hashtag);
                    }

                    // 엔드포인트 설정
                    var endpoint = "/instruments/bass-guitars";
                    break;
                case "어쿠스틱&클래식":
                    Data.append("brand", aCData.brand);
                    Data.append("model", aCData.model);
                    Data.append("wood", aCData.wood);
                    Data.append("pickUp", aCData.pickup);
                    Data.append("tradeAddress.sido", aCData.tradeAddress.sido);
                    Data.append("tradeAddress.sgg", aCData.tradeAddress.sgg);
                    Data.append("tradeAddress.emd", aCData.tradeAddress.emd);
                    Data.append("qualityStatus", aCData.selectedState);
                    Data.append("price", aCData.price);
                    Data.append("hasAnomaly", aCData.selectedFeature);

                    // 해시태그 추가
                    for (const hashtag of aCData.hashtags) {
                        Data.append("hashtags[]", hashtag);
                    }

                    // 엔드포인트 설정
                    var endpoint = "/instruments/acoustic-and-classic-guitars";
                    break;
                case "음향장비":
                    // 음향장비 데이터 추가
                    Data.append("type", equipmentData.selectedType);
                    Data.append("tradeAddress.sido", equipmentData.tradeAddress.sido);
                    Data.append("tradeAddress.sgg", equipmentData.tradeAddress.sgg);
                    Data.append("tradeAddress.emd", equipmentData.tradeAddress.emd);
                    Data.append("qualityStatus", equipmentData.selectedState);
                    Data.append("price", equipmentData.price);
                    Data.append("hasAnomaly", equipmentData.selectedFeature);

                    // 해시태그 추가
                    for (const hashtag of equipmentData.hashtags) {
                        Data.append("hashtags[]", hashtag);
                    }

                    // 엔드포인트 설정
                    var endpoint = "/instruments/audio-equipments";
                    break;
                default:
                    break;
            }
            // 이미지 추가
            for (const image of selectedImage) {
                Data.append("newImages", image);
            }
            // 삭제한 이미지 ID들을 FormData에 추가
            deletedImageIds.forEach((id) => {
                Data.append("deletedImageIds[]", id);
            });

            // API 호출
            const response = await axiosPrivate.patch(
                `/instruments/electric-guitars/${id}`,
                Data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Hertz-API-Version": 1,
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );
            if (response.status === 201) {
                alert("악기가 성공적으로 수정되었습니다.");
            } else {
                alert("악기 수정에 실패했습니다.");
            }
        } catch (err) {
            console.error(err);
            alert("악기 수정에 실패했습니다.");
        }
        // console.log('Updated Name:', selectedProductName);
        // console.log('Updated Description:', description);
        // // 여기서 수정 API를 호출할 수 있습니다.
    };

    const handleElectricGuitarData = (data) => {
        setElectricGuitarData(data);
    };
    
    const handleEffectorData = (data) => {
        setEffectorData(data);
    };

    const handleAmpData = (data) => {
        setAmpData(data);
    };

    const handleBassData = (data) => {
        setBassData(data);
    };

    const handleAcousticClassicData = (data) => {
        setAcousticClassicData(data);
    };

    const handleEquipmentData = (data) => {
        setEquipmentData(data);
    };

    return (
        <div>
            <NavBar />
            <div>
                <form onSubmit={handleSubmit}>
                    {/* 판매할 악기 이름 수정하는 칸 */}
                    <div
                        style={{
                            textAlign: "left",
                            marginLeft: "70px",
                            marginTop: "30px",
                        }}
                    >
                        <input
                            type="text"
                            id="name"
                            value={selectedProductName}
                            onChange={handleNameChange}
                            style={{
                                borderRadius: "5px",
                                minWidth: "1000px",
                                padding: "10px",
                                marginRight: "40px",
                                border: "1px solid black",
                            }}
                        />
                        {/* 드롭다운 */}
                        <DropdownMenu
                            options={[
                                "이펙터",
                                "앰프",
                                "베이스",
                                "어쿠스틱&클래식",
                                "음향장비",
                                // '합주실',
                                // '공연장'
                            ]} // 드롭다운에 보여줄 옵션들
                            onSelect={handleDropdownSelect} // 선택된 옵션을 별도의 상태로 업데이트
                            defaultOptionText="일렉기타" // 드롭다운의 기본 텍스트를 선택된 옵션으로 설정
                        />
                    </div>
                    {/* 필수사항 */}
                    <div style={{ margin: "15px" }}>
                        <p style={{ textAlign: "left", marginLeft: "55px" }}>
                            {selectedOption === "합주실" ? (
                                <>
                                    필수사항 : 문(입구)에서 찍은 정면샷 /
                                    측면에서 찍은 샷 / 음향장비나 악기의 인증샷
                                    / 특이사항이나 구비된 특별한 것들의 인증샷
                                </>
                            ) : (
                                <>
                                    필수사항 : 전면샷 / 후면전체 샷 / 픽업 &
                                    브릿지 / 덴트(흠집있는 부분들) / 특이사항
                                    부분들 (넥 문제 , 배선 문제, 녹이 슮 등)
                                </>
                            )}
                        </p>
                    </div>
                    {/* 이미지 업로드 수정 */}
                    <div
                        style={{
                            textAlign: "left",
                            marginLeft: "70px",
                            marginTop: "30px",
                        }}
                    >
                        <UploadPhoto
                            onImagesChange={handleImageChange}
                            onImagesDelete={handleImageDelete}
                            imageUrls={imageUrls}
                        />
                    </div>
                    <div></div>
                    {/* 필수 입력 사항 수정 */}
                    <div style={{ textAlign: "left", marginLeft: "60px" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    margin: "10px",
                                    marginTop: "40px",
                                }}
                            >
                                필수 입력 사항
                            </p>
                            <div
                                style={{
                                    marginTop: "40px",
                                    marginRight: "70px",
                                }}
                            >
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor:
                                            selectProgressStatus === "SELLING"
                                                ? "#D6E0F3"
                                                : "white",
                                        border: "1px solid black",
                                        borderRadius: "3px",
                                    }}
                                    onClick={() =>
                                        setSelectProgressStatus("SELLING")
                                    }
                                >
                                    판매중
                                </button>
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor:
                                            selectProgressStatus === "RESERVED"
                                                ? "#FFD94D"
                                                : "white",
                                        border: "1px solid black",
                                        borderRadius: "3px",
                                    }}
                                    onClick={() =>
                                        setSelectProgressStatus("RESERVED")
                                    }
                                >
                                    예약중
                                </button>
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor:
                                            selectProgressStatus === "SOLD_OUT"
                                                ? "lightgray"
                                                : "white",
                                        border: "1px solid black",
                                        borderRadius: "3px",
                                    }}
                                    onClick={() =>
                                        setSelectProgressStatus("SOLD_OUT")
                                    }
                                >
                                    판매완료
                                </button>
                            </div>
                        </div>
                        <p style={{ marginLeft: "10px" }}>
                            매물의 정보를 정확하게 사실만 입력해주세요.
                        </p>
                        <div style={{ marginLeft: "20px" }}>
                            {SelectedComponent && (
                                <SelectedComponent
                                    updateGuitarData={handleElectricGuitarData}
                                    updateEffectorData={handleEffectorData}
                                    updateAmpData={handleAmpData}
                                    updateBassData={handleBassData}
                                    updateAcousticClassicData={handleAcousticClassicData}
                                    updateEquipmentData={handleEquipmentData}
                                    // updateEnsembleRoomData={handleEnsembleRoomData}
                                />
                            )}
                        </div>
                    </div>
                    {/* 상세 정보 입력(수정)하는 칸 */}
                    <div style={{ textAlign: "left", marginLeft: "70px" }}>
                        <p
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginTop: "40px",
                            }}
                        >
                            특이사항 및 상세 설명
                        </p>
                        <p>
                            추가적으로 기입해야 할 정보, 참고사항, 유의할 점 등
                            구매자가 알아야할 정보들을 기입해주세요.
                        </p>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{
                                borderRadius: "5px",
                                minWidth: "1380px",
                                minHeight: "450px",
                                padding: "10px",
                                marginRight: "40px",
                            }}
                        />
                    </div>
                    {/* 올리기 버튼 */}
                    <div
                        style={{
                            textAlign: "right",
                            margin: "30px 70px 30px 30px",
                        }}
                    >
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: "#D6E0F3",
                                borderRadius: "5px",
                                border: "none",
                                paddingRight: "15px",
                                paddingLeft: "15px",
                            }}
                        >
                            올리기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstrumentModify;
