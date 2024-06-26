import React, { useState } from "react";
import {
    Form,
    Navbar,
    Container,
    Nav,
    Button,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = ({ onSearch }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState(""); // 검색어 상태 추가

    const handleConcertHallClick = (event) => {
        event.preventDefault();
        alert("준비중");
        navigate("/");
    };

    const handleSearchChange = (event) => {
        // 검색어 입력 핸들러 추가
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        // 검색어 제출 핸들러 추가
        event.preventDefault();
        onSearch(searchValue);
    };

    return (
        <>
            {["xxl"].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-white mb-3">
                    <Container fluid>
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px", paddingLeft: "20px" }}
                            navbarScroll
                        >
                            <Nav.Link
                                style={{
                                    color:
                                        location.pathname ===
                                            "/InstrumentList" ||
                                        location.pathname.startsWith(
                                            "/InstrumentDetail"
                                        )
                                            ? "#637DBE"
                                            : "black",
                                    fontSize: "18px",
                                    fontWeight:
                                        location.pathname ===
                                            "/InstrumentList" ||
                                        location.pathname.startsWith(
                                            "/InstrumentDetail"
                                        )
                                            ? "bold"
                                            : "normal",
                                }}
                                href="/InstrumentList"
                            >
                                중고악기
                            </Nav.Link>
                            <Nav.Link
                                style={{
                                    color:
                                        location.pathname ===
                                            "/EnsembleRoomList" ||
                                        location.pathname.startsWith(
                                            "/EnsembleRoomDetail"
                                        ) ||
                                        location.pathname.startsWith(
                                            "/Review"
                                        ) ||
                                        location.pathname.startsWith(
                                            "/WriteReview"
                                        ) ||
                                        location.pathname.startsWith(
                                            "/WriteKeywordReview"
                                        ) ||
                                        location.pathname.startsWith(
                                            "/WriteTextReview"
                                        ) ||
                                        location.pathname.startsWith("/Reserve")
                                            ? "#637DBE"
                                            : "black",
                                    fontSize: "18px",
                                    fontWeight:
                                        location.pathname ===
                                            "/EnsembleRoomList" ||
                                        location.pathname.startsWith(
                                            "/EnsembleRoomDetail"
                                        ) ||
                                        location.pathname.startsWith(
                                            "/Review"
                                        ) ||
                                        location.pathname.startsWith(
                                            "/WriteReview"
                                        ) ||
                                        location.pathname.startsWith(
                                            "/WriteKeywordReview"
                                        ) ||
                                        location.pathname.startsWith(
                                            "/WriteTextReview"
                                        ) ||
                                        location.pathname.startsWith("/Reserve")
                                            ? "bold"
                                            : "normal",
                                }}
                                href="/EnsembleRoomList"
                                onClick={handleConcertHallClick}
                            >
                                합주실
                            </Nav.Link>
                            <Nav.Link
                                style={{
                                    color:
                                        location.pathname === "/ConcertHall"
                                            ? "#637DBE"
                                            : "black",
                                    fontSize: "18px",
                                    fontWeight:
                                        location.pathname === "/ConcertHall"
                                            ? "bold"
                                            : "normal",
                                }}
                                // href="/ConcertHall"
                                href="#"
                                onClick={handleConcertHallClick}
                            >
                                공연장
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <div className="position-relative">
                                <FaSearch
                                    className="position-absolute top-50 translate-middle-y ms-3"
                                    style={{ left: 0, color: "#637DBE" }}
                                />
                                <Form.Control
                                    type="search"
                                    placeholder="원하시는 모델명, 장소를 검색해보세요"
                                    className="me-2 ps-5"
                                    style={{ width: "500px" }}
                                    aria-label="Search"
                                    value={searchValue} // 검색어 상태 값 추가
                                    onChange={handleSearchChange} // 검색어 입력 변경 핸들러 추가
                                />
                            </div>
                        </Form>
                    </Container>
                </Navbar>
            ))}
        </>
    );
};

export default NavBar;
