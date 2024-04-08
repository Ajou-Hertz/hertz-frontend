import React, { useState } from "react";
import {HeartOutlined, HeartFilled} from '@ant-design/icons';

function MainImageShow({ imageUrls }) {
    const [mainImage, setMainImage] = useState(imageUrls[0]); // 메인 이미지 상태 관리
    const [isFavorite, setIsFavorite] = useState(false); // 관심 상품 여부 상태 관리

    const handleClickImage = (imageUrl) => {
        setMainImage(imageUrl); // 클릭된 이미지로 메인 이미지 변경
    };

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite); // 관심 상품 여부 토글
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
                    {/* 텍스트와 하트 버튼을 묶음 */}
                    <span style={{ display: "flex", alignItems: "center" }}>
                        관심상품 등록하기{" "}
                        {/* 하트 모양의 버튼 */}
                        {isFavorite ? (
                            <HeartFilled
                                style={{ color: "red", fontSize: "24px" }}
                                onClick={handleFavoriteClick}
                            />
                        ) : (
                            <HeartOutlined
                                style={{ color: "black", fontSize: "24px" }}
                                onClick={handleFavoriteClick}
                            />
                        )}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default MainImageShow;
