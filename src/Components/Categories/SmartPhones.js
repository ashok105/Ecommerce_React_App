import { Fragment, useState } from "react";
import { GrMail, GrLocation, GrFacebookOption } from "react-icons/gr";
import { GiSmartphone } from "react-icons/gi";
import { TiLocation } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineSearch,
  AiOutlineWhatsApp,
  AiFillCamera,
  AiFillHome,
} from "react-icons/ai";
import {
  BsFillTelephoneFill,
  BsHeart,
  BsFillCartCheckFill,
  BsLaptop,
  BsCart,
  BsCartCheck,
} from "react-icons/bs";
import axios from "axios";
import { FaHotTub, FaShopify } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
function SmartPhone() {
  //const [totalCartItems, setTotalCartItems] = useState(0);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.setItem("AuthToken", "");
    localStorage.setItem("cartId", "");
    localStorage.setItem("username", "");
    navigate("/LogIn");
  };
  return (
    <Fragment>
      <header>
        <div className="first-header">
          <div className="container contact-header">
            <p className="contact-details">
              <span style={{ color: "red" }}>
                <BsFillTelephoneFill />{" "}
              </span>{" "}
              +919989966207
            </p>
            <p className="contact-details">
              <span style={{ color: "red" }}>
                {" "}
                <GrMail />
              </span>{" "}
              Nagendra@gmail.com
            </p>
            <p className="contact-details">
              <span style={{ color: "red" }}>
                <TiLocation />
              </span>{" "}
              Bangalore
            </p>
          </div>
        </div>
        <div className="second-header">
          <div className="row">
            <div className="col-md-4 mt-3">
              <h1 style={{ fontSize: 70 }}>
                <span style={{ color: "red" }}>.</span>VENOM
              </h1>
            </div>
            <div className="col-md-4 mt-3 search">
              <select className="form-select" id="category-dropdown">
                <option>All Categories</option>
                <option>HotDeals</option>
                <option>Laptops</option>
                <option>SmartPhones</option>
                <option>Fashion</option>
                <option>Cameras</option>
              </select>
              <input
                className="form-control"
                type="text"
                placeholder="Search Here"
              />
              <button className="search-btn">
                <AiOutlineSearch />
                Search
              </button>
            </div>
            <div className="col-md-4 mt-5 cart">
              <div className="cart">
                <p className="userName">
                  Hello! <span style={{color:'orange'}}>{localStorage.getItem("username")}</span>
                </p>

                {/* <p className="log-out" onClick={handleLogOut} >
                  <AiOutlineLogout /> Log out
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </header>
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
                  <Nav.Link href="/Products/Feed"><AiFillHome /> Home</Nav.Link>
                  <Nav.Link href="/Products/Feed/hotDeals"><FaHotTub /> Hot Deals</Nav.Link>
                  <Nav.Link href="/Products/Feed/Fashion"><FaShopify /> Fashion</Nav.Link>
                  <Nav.Link href="/Products/Feed/Laptops"><BsLaptop /> Laptops</Nav.Link>
                  <Nav.Link href="/Products/Feed/SmartPhones" style={{ borderBottom: "3px solid red", color: "red" }}><GiSmartphone /> Smartphones</Nav.Link>
                  <Nav.Link href="/Products/Feed/Cameras"><AiFillCamera /> Cameras</Nav.Link>
                  <Nav.Link href="/Products/Feed/Cart"><BsCartCheck /> Go To Cart</Nav.Link>
                </Nav>
                <Nav.Link onClick={handleLogOut}><AiOutlineLogout /> Logout</Nav.Link>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      <section className="deals-body">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h3>Welcome To SmartPhones Page</h3>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <h4>ABOUT US</h4>
              <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut.
              </p>
              <p>
                <span style={{ color: "red" }}>
                  <BsFillTelephoneFill />
                </span>{" "}
                +919989966207
              </p>
              <p>
                <span style={{ color: "red" }}>
                  <GrMail />
                </span>{" "}
                Nagendra@gmail.com
              </p>
              <p>
                <span style={{ color: "red" }}>
                  <TiLocation />
                </span>{" "}
                Bangalore
              </p>
            </div>
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <h4>CATEGORIES</h4>
              <a href="/Products/Feed/hotDeals" className="links">
                Hot deals
              </a>
              <a href="/Products/Feed/Laptops" className="links">
                Laptops
              </a>
              <a href="/Products/Feed/SmartPhones" className="links">
                Smartphones
              </a>
              <a href="/Products/Feed/Cameras" className="links">
                Cameras
              </a>
              <a href="/Products/Feed/Fashion" className="links">
                Fashion
              </a>
            </div>
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <h4>INFORMATION</h4>
              <a href="#" className="links">
                About Us
              </a>
              <a href="#" className="links">
                Contact Us
              </a>
              <a href="#" className="links">
                Privacy Policy
              </a>
              <a href="#" className="links">
                Orders and Returns
              </a>
              <a href="#" className="links">
                Terms & Conditions
              </a>
            </div>
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <h4>SERVICE</h4>
              <a href="#" className="links">
                My Account
              </a>
              <a href="/Products/Feed/cart" className="links">
                View Cart
              </a>
              <a href="#" className="links">
                Wishlist
              </a>
              <a href="#" className="links">
                Track My Order
              </a>
              <a href="#" className="links">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="second-footer">
        <p>
          Copyright ©2022 All rights reserved | This template is made by Rock
          Nagendra
        </p>
      </div>
    </Fragment>
  );
}

export default SmartPhone;
