import React, { useState, useEffect } from "react";

function AgreementMarketing2({ setShowTerm }) {
    const [showTerms, setShowTerms] = useState(false);
    useEffect(() => {
        // setShowTerm가 true이면 setShowTerms를 호출하여 모달을 염
        if (setShowTerm) {
            setShowTerms(true);
        }
    }, [setShowTerm]); // setShowTerm이 변경될 때마다 useEffect가 실행

    // 모달 스타일
    const modalStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
        overflow: "auto", // 스크롤 가능하도록 설정
        maxHeight: "80%", // 모달의 최대 높이를 화면의 80%로 설정
        width: "50%", // 모달의 너비를 화면의 50%로 설정 (필요에 따라 조정)
    };

    // 배경 스타일 (모달 뒤의 어두운 배경)
    const backdropStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
    };

    return (
        <div>
            {/* 모달 팝업 */}
            {showTerms && (
                <div>
                    <div
                        style={backdropStyle}
                        onClick={() => setShowTerms(false)}
                    ></div>
                    <div style={modalStyle}>
                        {/* 개인정보 동의서 내용 */}
                        <div style={{ textAlign: "left" }}>
                            <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                                마케팅 수신 동의 약관
                            </p>
                            <p>
                                개인정보보호법 제22조 제4항에 의해 선택정보
                                사항에 대해서는 기재하지 않으셔도 서비스를
                                이용하실 수 있습니다.
                            </p>
                            <p>
                                ① 마케팅 및 광고에의 활용
                                <br />- 신규 기능 개발 및 맞춤 서비스 제공
                                <br />- 뉴스레터 발송, 새로운 기능(제품)의 안내
                                <br />- 할인 및 쿠폰 등 이벤트 등 광고성 정보
                                제공
                            </p>
                            <p>
                                ② 헤르츠 서비스를 운용함에 있어 각종 정보를
                                서비스 화면, SMS, 이메일 등의 방법으로 회원에게
                                제공할 수 있으며, 결제안내 등 의무적으로
                                안내되어야 하는 정보성 내용 및 일부 혜택성
                                정보는 수신동의 여부와 무관하게 제공합니다.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowTerms(false)}
                            style={{
                                borderRadius: "5px",
                                border: "none",
                                paddingRight: "15px",
                                paddingLeft: "15px",
                            }}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AgreementMarketing2;
