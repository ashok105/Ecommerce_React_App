import { Fragment, useState } from "react";
import "../App.css";
import sigUpFormValidation from "./FormValidation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function SignUp() {
  let navigate = useNavigate();

  //User provided details state
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //Terms and conditions checkbox state
  const [isChecked, setIsChecked] = useState(false);
  //User Input details
  const onchangeHandler = (value, key) => {
    setDetails({ ...details, [key]: value });
  };
  //Terms and conditions checkbox handle
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = () => {
    //Form Validation
    sigUpFormValidation
      .validate(details, { abortEarly: false })
      .then((res) => {
        //API Call
        axios({
          url: "https://api.backendless.com/5297FB31-631D-42CA-FFA5-0DB47479DB00/D254504B-C041-4C9F-BAE9-958367DEA67A/users/register",
          method: "POST",
          data: {
            name: details.name,
            email: details.email,
            password: details.password,
          },
        })
          .then((res) => {
            if (res.status == "200") {
              navigate("/LogIn");
            }
          })
          .catch((err) => {
            toast.error(err.response.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      })
      .catch((err) => {
        err.inner.map((errMsg) => {
          toast.error(errMsg.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      });
  };

  return (
    <Fragment>
      <div className="Signup-card">
        <div className="container-fluid">
          <h2> Signup Here </h2>
          <p className="hint-text">
            Create your account. It's free and only takes a minute.
          </p>
          <div className="container">
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              value={details.name}
              onChange={(event) => {
                onchangeHandler(event.target.value, "name");
              }}
            />
            <input
              className="form-control mt-3"
              type="email"
              placeholder="Email"
              value={details.email}
              onChange={(event) => {
                onchangeHandler(event.target.value, "email");
              }}
            />
            <input
              className="form-control mt-3"
              type="password"
              placeholder="Password"
              value={details.password}
              onChange={(event) => {
                onchangeHandler(event.target.value, "password");
              }}
            />
            <input
              className="form-control mt-3"
              type="password"
              placeholder="Confirm Password"
              value={details.confirmPassword}
              onChange={(event) => {
                onchangeHandler(event.target.value, "confirmPassword");
              }}
            />
            <label className="form-check-label mt-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleOnChange}
              />{" "}
              I accept the
              <a href="#" required="">
                Terms of Use
              </a>{" "}
              &amp; <a href="#">Privacy Policy</a>
            </label>
            <div>
              <button
                className="btn btn-success SignUp-btn font-weight-bold"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Register Now
              </button>
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
            &nbsp;
            <p className="account-text mt-5">
              Already you have an account?
              <a href="/logIn"> Log In</a>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;
