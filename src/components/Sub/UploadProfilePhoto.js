import React, { useState, useRef, useEffect } from "react";

const UploadProfilePhoto = ({ onImagesChange, imageUrls }) => {
    const [images, setImages] = useState([]);
    const [imageUrlsState, setImageUrlsState] = useState(imageUrls || ""); // imageUrls가 전달되지 않으면 빈 문자열로 초기화
    const inputRef = useRef(null); // input 요소의 참조를 생성

    const MAX_IMAGES = 1;

    useEffect(() => {
        // 부모 컴포넌트로부터 받은 imageUrls로 초기 이미지 URL 상태를 설정
        setImageUrlsState(imageUrls || "");
    }, [imageUrls]);

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        const totalImages = [...images, ...selectedImages];
        if (totalImages.length <= MAX_IMAGES) {
            setImages(totalImages);
            const newImageUrls = [
                ...imageUrlsState,
                ...selectedImages.map((file) => URL.createObjectURL(file)),
            ];
            setImageUrlsState(newImageUrls.join(",")); // 이미지 URL 문자열 상태 업데이트
            onImagesChange(totalImages);
        } else {
            alert(
                `당신은 최대 ${MAX_IMAGES} 개의 이미지만 업로드할 수 있습니다.`
            );
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);

        // 이미지 URL 문자열 상태 업데이트
        const updatedImageUrls = imageUrlsState
            .split(",")
            .filter((_, i) => i !== index)
            .join(",");
        setImageUrlsState(updatedImageUrls);

        onImagesChange(updatedImages); // 변경된 이미지 목록을 상위 컴포넌트로 전달
    };

    const handleClick = () => {
        inputRef.current.click(); // input 요소 클릭 이벤트 호출
    };

    return (
        <div
            style={{
                // overflowX: "auto",
                maxHeight: "380px",
                marginLeft: "425px",
                marginBottom: "30px",
            }}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                style={{ display: "none" }} // input 요소를 화면에서 숨김
                ref={inputRef} // input 요소에 참조 연결
            />
            <div style={{ display: "flex" }}>
                {[...Array(MAX_IMAGES)].map((_, index) => (
                    <div
                        key={index}
                        onClick={handleClick}
                        style={{
                            cursor: "pointer",
                            marginRight: "100px",
                            position: "relative",
                        }}
                    >
                        {imageUrlsState && (
                            <img
                                src={imageUrlsState}
                                alt={`Image`}
                                style={{ width: "150px", height: "150px" }}
                            />
                        )}
                        {!imageUrlsState && (
                            <div
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    border: "1px solid black",
                                }}
                            ></div>
                        )}
                        {imageUrlsState && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // 이미지 추가 버튼 클릭 시, 이미지 선택이 트리거되지 않도록 이벤트 전파를 막음
                                    handleRemoveImage(index);
                                }}
                                style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "5px",
                                    backgroundColor: "transparent",
                                    color: "black",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "0",
                                    fontSize: "20px",
                                }}
                            >
                                x
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadProfilePhoto;
