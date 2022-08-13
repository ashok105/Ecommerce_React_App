import { Fragment, useState } from "react";
import "../App.css";
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
} from "react-icons/bs";
import axios from "axios";
import { SpinnerCircularFixed,SpinnerRoundOutlined	} from "spinners-react";
import { FaHotTub, FaShopify } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function ProductsFeed() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [totalCartItems, setTotalCartItems] = useState(0);

  const [addCartLoading, setAddCartLoading] = useState(false)

  const [selectedTab,setSelectedTab] = useState(undefined);

  const loadProducts = () => {
    setLoading(true);

    axios({
      url: "https://api.chec.io/v1/products",
      method: "GET",
      params: {
        limit: "15",
        page: "1",
      },
      headers: {
        "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
      },
    })
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const createOrLoadCart = () => {
    const cartID = localStorage.getItem("cartId");

    if (cartID) {
      axios({
        url: `https://api.chec.io/v1/carts/${cartID}`,
        method: "GET",
        headers: {
          "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
        },
      })
        .then((res) => {
          console.log(res);
          setTotalCartItems(res.data.total_items);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        url: "https://api.chec.io/v1/carts",
        method: "GET",
        headers: {
          "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
        },
      })
        .then((res) => {
          localStorage.setItem("cartId", res.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addToCart = (productId,index) => {
    const cartId = localStorage.getItem("cartId");

    setSelectedTab(index);

    setAddCartLoading(true);

    axios({
      url: `https://api.chec.io/v1/carts/${cartId}`,
      method: "POST",
      headers: {
        "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
      },
      data: {
        id: productId,
        quantity: 1,
      },
    })
      .then((res) => {
        setTotalCartItems(res.data.cart.total_items);
        toast.success("Successfully Added To The cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAddCartLoading(false);
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAddCartLoading(false);
      });
  };

  //First time load all products
  useEffect(() => {
    loadProducts();
    createOrLoadCart();
  }, []);

  //Handle Logout
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
                <BsFillTelephoneFill />
              </span>
              +919989966207
            </p>
            <p className="contact-details">
              <span style={{ color: "red" }}>
               
                <GrMail />
              </span>
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
              <h1 style={{ fontSize: 70 }} href="/">
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
                  Hello!{" "}
                  <span style={{ color: "orange" }}>
                    {localStorage.getItem("username")}{" "}
                  </span>
                </p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  className="position-relative cart-btn cart-link"
                  href="/Products/Feed/cart"
                >
                  <BsFillCartCheckFill />
                  &nbsp;
                  <p>Your Cart</p>
                  <span className="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-danger notification">
                    {totalCartItems}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </a>
                {/* <p className="log-out" onClick={handleLogOut}>
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
      <section className="body">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          className="cart-visible"
        >
          {loading ? <SpinnerCircularFixed /> : false}
          {products.map((product, index) => {
            const id = product.id;

            return (
              <div
                className="card card-img-style"
                style={{ width: 300, margin: 20 }}
                key={index}
              >
                <img
                  src={product.image.url}
                  style={{ width: "100%", height: 300 }}
                  className="card-img-top img-thumbnail"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6 className="text-success">
                    Price - {product.price.formatted}
                  </h6>
                  <p className="card-text">{product.description}</p>
                </div>
                <ul className="social mb-0 list-inline mt-0">
                  <li className="list-inline-item m-0">
                    <a href="#" className="social-link fb-icon">
                      <GrFacebookOption />
                    </a>
                  </li>
                  <li className="list-inline-item m-0">
                    <a href="#" className="social-link twitter-icon">
                      <AiOutlineTwitter />
                    </a>
                  </li>
                  <li className="list-inline-item m-0">
                    <a href="#" className="social-link insta-icon">
                      <AiOutlineInstagram />
                    </a>
                  </li>
                  <li className="list-inline-item m-0 whatsapp-icon">
                    <a href="#" className="social-link">
                      <AiOutlineWhatsApp />
                    </a>
                  </li>
                </ul>
                <div className="card-footer" id="card-footer">
                  <p
                    className="text-white add-to-cart"
                    onClick={() => addToCart(product.id, index)}
                  >
                    { selectedTab == index ? addCartLoading ? (
                      <SpinnerCircularFixed size={50} thickness={100} speed={100} color="rgba(57, 172, 140, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                    ) : (
                      <b>Add To Cart</b>
                    ) : <b>Add To Cart</b>}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="News-letter">
        <h4 className="mt-5 ">
          Sign Up for the <span style={{ fontWeight: "bold" }}>NEWSLETTER</span>
        </h4>
        <div className="form">
          <div className="news-letter-body">
            <FiMail />
          </div>
          <input
            type="text"
            placeholder="Search Here"
            className="form-control search-box"
            name="search"
          />
          <button className="subscribe-btn">
            <FiMail /> Subscribe
          </button>
        </div>
        <div className="social-media">
          <ul className="social mb-0 list-inline mt-3">
            <li className="list-inline-item m-0">
              <a href="#" className="social-link fb-icon">
                <GrFacebookOption />
              </a>
            </li>
            <li className="list-inline-item m-0">
              <a href="#" className="social-link twitter-icon">
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="list-inline-item m-0">
              <a href="#" className="social-link insta-icon">
                <AiOutlineInstagram />
              </a>
            </li>
            <li className="list-inline-item m-0 whatsapp-icon">
              <a href="#" className="social-link">
                <AiOutlineWhatsApp />
              </a>
            </li>
          </ul>
        </div>
      </div>
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

export default ProductsFeed;
