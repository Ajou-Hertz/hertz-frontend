import React, { useState } from "react";

function MainImageShow({ imageUrls }) {
    const [mainImage, setMainImage] = useState(imageUrls[0]); // 메인 이미지 상태 관리

    const handleClickImage = (imageUrl) => {
        setMainImage(imageUrl); // 클릭된 이미지로 메인 이미지 변경
    };

    return (
        <div style={{ textAlign: "left" }}>
            {mainImage && (
                <img
                    src={mainImage}
                    alt="The first selected"
                    style={{
                        border: "1px solid black",
                        width: "355px",
                        height: "355px",
                        marginLeft: "50px",
                    }}
                />
            )}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    marginLeft: "50px",
                }}
            >
                {imageUrls.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`User selected ${index + 1}`}
                        style={{
                            border: "1px solid #D6E0F3",
                            width: "40px",
                            height: "45px",
                            marginRight: "12.5px",
                        }}
                        onClick={() => handleClickImage(imageUrl)}
                    />
                ))}
            </div>
            <div>
                <p
                    style={{
                        paddingLeft: "140px",
                        paddingTop: "30px",
                        fontSize: "18px",
                    }}
                >
                    관심상품 등록하기
                </p>
            </div>
        </div>
    );
}

export default MainImageShow;
