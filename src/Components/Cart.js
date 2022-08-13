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
import { AiOutlineSearch, AiFillCamera, AiFillHome } from "react-icons/ai";
import {
  BsFillTelephoneFill,
  BsHeart,
  BsFillCartCheckFill,
  BsLaptop,
  BsCart,
} from "react-icons/bs";
import axios from "axios";
import {
  SpinnerCircularFixed,
  SpinnerCircular,
  FadeLoader,
} from "spinners-react";
import { FaHotTub, FaShopify } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [totalCartItems, setTotalCartItems] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);

  const [orderLink, setOrderLink] = useState("");

  const [loading, setLoading] = useState(false);

  const [removeCartLoading, setRemoveCartLoading] = useState(false);

  const [selectedTab, setSelectedTab] = useState(undefined);

  const handleLogOut = () => {
    localStorage.setItem("AuthToken", "");
    localStorage.setItem("cartId", "");
    localStorage.setItem("username", "");
    navigate("/LogIn");
  };

  const loadCart = () => {
    const cartID = localStorage.getItem("cartId");
    setLoading(true);
    axios({
      url: `https://api.chec.io/v1/carts/${cartID}`,
      method: "GET",
      headers: {
        "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
      },
    })
      .then((res) => {
        //console.log(res.data.line_items)
        setCartItems(res.data.line_items);
        setTotalCartItems(res.data.total_items);
        setTotalAmount(res.data.subtotal.formatted);
        setOrderLink(res.data.hosted_checkout_url);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeProduct = (itemId, index) => {
    const cartId = localStorage.getItem("cartId");

    setSelectedTab(index);

    setRemoveCartLoading(true);

    axios({
      url: `https://api.chec.io/v1/carts/${cartId}/items/${itemId}`,
      method: "DELETE",
      headers: {
        "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
      },
    })
      .then((res) => {
        loadCart();
        setRemoveCartLoading(false);
        toast.success("Product Successfully Removed From Cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setRemoveCartLoading(false);
        console.log(err);
      });
  };

  const placeAnOrder = () => {
    window.open(orderLink, "_blank");
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
              <h1 style={{ fontSize: 70 }} href="/Products/Feed">
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
                <p className="userName mb-4">
                  Hello!{" "}
                  <span style={{ color: "orange" }}>
                    {localStorage.getItem("username")}
                  </span>
                </p>
                {/* <p className="log-out" onClick={handleLogOut} >
                  <AiOutlineLogout /> Log out
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navbar
        bg="dark"
        expand="sm"
        className="react-bootstrap-navBar"
        variant="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Venom.
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link href="/Products/Feed">
                  <AiFillHome /> Home
                </Nav.Link>
                <Nav.Link href="/Products/Feed/hotDeals">
                  <FaHotTub /> Hot Deals
                </Nav.Link>
                <Nav.Link href="/Products/Feed/Fashion">
                  <FaShopify /> Fashion
                </Nav.Link>
                <Nav.Link href="/Products/Feed/Laptops">
                  <BsLaptop /> Laptops
                </Nav.Link>
                <Nav.Link href="/Products/Feed/SmartPhones">
                  <GiSmartphone /> Smartphones
                </Nav.Link>
                <Nav.Link href="/Products/Feed/Cameras">
                  <AiFillCamera /> Cameras
                </Nav.Link>
                <Nav.Link
                  href="/Products/Feed/Cart"
                  style={{ borderBottom: "3px solid red", color: "red" }}
                >
                  <BsCart /> Go To Cart
                </Nav.Link>
              </Nav>
              <Nav.Link onClick={handleLogOut}>
                <AiOutlineLogout /> Logout
              </Nav.Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <section className="cart-body">
        <div className="container table-data">
          {loading ? (
            <SpinnerCircular
              size={50}
              thickness={100}
              speed={100}
              color="#36ad47"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          ) : (
            false
          )}
          <TableContainer component={Paper} className="mt-3">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>S.No</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product Image</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{index + 1}.</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <img
                          src={item.media.source}
                          className="cart-img"
                          height={160}
                          width={170}
                        />
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        &#8377; {item.price.formatted * item.quantity}
                      </TableCell>
                      <TableCell>
                        <button
                          className="btn btn-danger"
                          id="cart-remove-btn"
                          onClick={() => {
                            removeProduct(item.id, index);
                          }}
                        >
                          {selectedTab == index ? (
                            removeCartLoading ? (
                              <SpinnerCircularFixed
                                size={50}
                                thickness={100}
                                speed={100}
                                color="rgba(57, 172, 140, 1)"
                                secondaryColor="rgba(0, 0, 0, 0.44)"
                              />
                            ) : (
                              <b>Remove</b>
                            )
                          ) : (
                            <b>Remove</b>
                          )}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell
                    colSpan={7}
                    style={{ fontSize: 40, textAlign: "center" }}
                  >
                    Cart is Empty
                  </TableCell>
                )}
                {cartItems.length > 0 ? 
                <TableRow>
                  <TableCell colSpan={4}></TableCell>
                  <TableCell style={{ fontSize: 30 }}>
                    <b>&#8377; {totalAmount}</b>
                  </TableCell>
                  <TableCell id="place-order-btn" colSpan={7}>
                    <button
                      id="place-order-btn"
                      className="btn btn-success"
                      onClick={placeAnOrder}
                    >
                      Place Order
                    </button>
                  </TableCell>
                </TableRow> : null }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default Cart;
