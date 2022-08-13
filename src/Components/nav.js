<nav className="navbar bg-dark navbar-dark navbar-expand-lg">
<div className="container">
  <button
    className="navbar-toggler"
    data-toggle="collapse"
    data-target="#links"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="links">
    <ul className="navbar-nav ml">
      <li className="nav-item">
        <a
          href="#"
          className="nav-link"
          style={{ borderBottom: "3px solid red", color: "red" }}
        >
          <AiFillHome /> Home
        </a>
      </li>
      <li className="nav-item">
        <a href="/Products/Feed/hotDeals" className="nav-link">
          <FaHotTub /> Hot Deals
        </a>
      </li>
      <li className="nav-item">
        <a href="/Products/Feed/Fashion" className="nav-link">
          <FaShopify /> Fashion
        </a>
      </li>
      <li className="nav-item">
        <a href="/Products/Feed/Laptops" className="nav-link">
          <BsLaptop /> Laptops
        </a>
      </li>
      <li className="nav-item">
        <a href="/Products/Feed/SmartPhones" className="nav-link">
          <GiSmartphone /> Smartphones
        </a>
      </li>
      <li className="nav-item">
        <a href="/Products/Feed/Cameras" className="nav-link">
          <AiFillCamera /> Cameras
        </a>
      </li>
      <li className="nav-item" id="log-out" style={{ float: "right" }}>
        <a href="#" className="nav-link" onClick={handleLogOut}>
          <AiOutlineLogout /> Logout
        </a>
      </li>
    </ul>
  </div>
</div>
</nav>