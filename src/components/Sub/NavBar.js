import React from 'react';
import { Form, Navbar, Container, Nav, Button, NavDropdown, Offcanvas } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <>
    {['xxl'].map((expand) => (
      <Navbar key={expand} expand={expand} className="bg-white mb-3">
        <Container fluid>  
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px', paddingLeft: '20px' }} navbarScroll>
              <Nav.Link style={{color: (location.pathname === '/InstrumentList' || location.pathname.startsWith('/InstrumentDetail')) ? '#637DBE' : 'black',
                fontWeight: (location.pathname === '/InstrumentList' || location.pathname.startsWith('/InstrumentDetail')) ? 'bold' : 'normal'}} href="/InstrumentList">중고악기
              </Nav.Link>
              <Nav.Link style={{color: location.pathname === '/EnsembleRoom' ? '#637DBE' : 'black', fontWeight: location.pathname === '/EnsembleRoom' ? 'bold' : 'normal'}} href="/EnsembleRoom">합주실</Nav.Link>
              <Nav.Link style={{color: location.pathname === '/ConcertHall' ? '#637DBE' : 'black', fontWeight: location.pathname === '/ConcertHall' ? 'bold' : 'normal'}} href="/ConcertHall">공연장</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <div className="position-relative">
                <FaSearch className="position-absolute top-50 translate-middle-y ms-3" style={{ left: 0, color: '#637DBE' }} />
                <Form.Control
                  type="search"
                  placeholder="원하시는 모델명, 장소를 검색해보세요"
                  className="me-2 ps-5"
                  style={{ width: "500px" }}
                  aria-label="Search"/>
              </div>
            </Form>
        </Container>
      </Navbar>
    ))}
  </>
  )
}

export default NavBar;
