import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import ProductsFeed from "./Components/ProductsFeed";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {ToastContainer } from "react-toastify";
import Cart from "./Components/Cart";
import HotDeals from "./Components/Categories/HotDeals";
import Cameras from "./Components/Categories/Cameras";
import Fashion from "./Components/Categories/Fashion";
import Laptops from "./Components/Categories/Laptops";
import SmartPhone from "./Components/Categories/SmartPhones";
import { useEffect } from "react";

const ProtectedRoute = (props) => {
  const token = localStorage.getItem("AuthToken");
  const hasLoggedIn = token ? true : false ;
  if (hasLoggedIn) return props.children;
  return <Navigate to="/LogIn" />;
  
};

const UnProtectedRoute = (props) => {
  const token = localStorage.getItem("AuthToken");
  const hasLoggedIn = token ? true : false ;
  if (hasLoggedIn) return <Navigate to="/Products/Feed" />;
  return props.children;
};


function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <ToastContainer/>
        <Routes>
          <Route
            path="/"
            element={
              <UnProtectedRoute>
                <Login />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/logIn"
            element={
              <UnProtectedRoute>
                <Login />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/SignUp"
            element={
              <UnProtectedRoute>
                <SignUp />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/Products/Feed"
            element={
              <ProtectedRoute>
                <ProductsFeed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products/Feed/cart"
            element={
              <ProtectedRoute>
                <Cart/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products/Feed/hotDeals"
            element={
              <ProtectedRoute>
                <HotDeals/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products/Feed/Cameras"
            element={
              <ProtectedRoute>
                <Cameras/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products/Feed/Fashion"
            element={
              <ProtectedRoute>
                <Fashion/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products/Feed/Laptops"
            element={
              <ProtectedRoute>
                <Laptops/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products/Feed/SmartPhones"
            element={
              <ProtectedRoute>
                <SmartPhone/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
