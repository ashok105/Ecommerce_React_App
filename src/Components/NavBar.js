import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffcanvasExample() {
  return (
    <>

        <Navbar bg="light" expand="sm" className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>


        <Navbar bg="dark" expand="sm" className="react-bootstrap-navBar" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`} >
                  Venom.
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  <Nav.Link href="/Products/Feed" style={{ borderBottom: "3px solid red", color: "red" }}><AiFillHome /> Home</Nav.Link>
                  <Nav.Link href="/Products/Feed/hotDeals"><FaHotTub /> Hot Deals</Nav.Link>
                  <Nav.Link href="/Products/Feed/Fashion"><FaShopify /> Fashion</Nav.Link>
                  <Nav.Link href="/Products/Feed/Laptops"><BsLaptop /> Laptops</Nav.Link>
                  <Nav.Link href="/Products/Feed/SmartPhones"><GiSmartphone /> Smartphones</Nav.Link>
                  <Nav.Link href="/Products/Feed/Cameras"><AiFillCamera /> Cameras</Nav.Link>
                </Nav>
                <Nav.Link onClick={handleLogOut}><AiOutlineLogout /> Logout</Nav.Link>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default OffcanvasExample;